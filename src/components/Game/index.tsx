import { GameStyles } from "./styles";
import usePlayer from "../../hooks/usePlayer";
import { OPTIONS } from "../../constants";
import { useDispatch } from "react-redux";
import {
    chooseOption,
    endGame,
    resetGame,
    updateScore
} from "../../app/playerSlice";
import { SecondaryButton } from "../../styles";
import { getBorderColor, getResults, hasWon } from "../../utility";
import { useMemo } from "react";
import {
    ChoosingProps,
    EndGameBtnProps,
    OptionProps,
    ResultProps
} from "./types";

const Placeholder = () => {
    return (
        <div className=" ">
            Request/Join Players <br /> from right
        </div>
    );
};

const Waiting = () => {
    return <div className="circle pulse waiting">Waiting</div>;
};

const Option = ({ src, color, option, handleOnClick }: OptionProps) => {
    console.log({ option });

    return (
        <div
            className={`circle ${color}`}
            onClick={() => handleOnClick(option)}
        >
            <img className="" src={src} alt="" />{" "}
        </div>
    );
};

const EndGameBtn = ({ dispatch, sessionPlayer, opponent }: EndGameBtnProps) => {
    return (
        <SecondaryButton
            onClick={() =>
                dispatch(
                    endGame({
                        playerId: sessionPlayer.id,
                        opponentId: opponent.id
                    })
                )
            }
        >
            End Game
        </SecondaryButton>
    );
};

const Choosing = ({ sessionPlayer, opponent, dispatch }: ChoosingProps) => {
    const handleOnClick = (option: string) => {
        dispatch(chooseOption({ playerId: sessionPlayer.id, choice: option }));
        if (!opponent.choice) return;
        dispatch(
            updateScore({
                playerId: sessionPlayer.id,
                opponentId: opponent.id,
                hasWon: hasWon(option, opponent.choice)
            })
        );
    };
    return (
        <div>
            <div className="options center">
                <Option
                    src="/images/icon-paper.svg"
                    color="blue"
                    option={OPTIONS.paper}
                    handleOnClick={handleOnClick}
                />
                <Option
                    src="/images/icon-scissors.svg"
                    color="yellow"
                    option={OPTIONS.scissors}
                    handleOnClick={handleOnClick}
                />
                <Option
                    src="/images/icon-rock.svg"
                    color="red"
                    option={OPTIONS.rock}
                    handleOnClick={handleOnClick}
                />
            </div>
            <div className="desc">Pick one</div>
            <EndGameBtn
                dispatch={dispatch}
                sessionPlayer={sessionPlayer}
                opponent={opponent}
            />
        </div>
    );
};

const Result = ({ sessionPlayer, opponent, dispatch }: ResultProps) => {
    const result = useMemo(() => {
        if (!sessionPlayer || !opponent) return;
        if (!sessionPlayer.choice || !opponent.choice) return;
        return getResults(sessionPlayer.choice, opponent.choice);
    }, [sessionPlayer, opponent]);

    return (
        <div className="result">
            <div className="choices center">
                <div className="v-box">
                    <div className="label">Your Pick</div>
                    <Option
                        src={`/images/icon-${sessionPlayer.choice}.svg`}
                        color={getBorderColor(sessionPlayer.choice)}
                        option={sessionPlayer.choice}
                        handleOnClick={() => {}}
                    />
                </div>
                <div className="v-box">
                    <div className="label">Opponent's Pick</div>
                    {opponent && opponent.choice ? (
                        <Option
                            src={`/images/icon-${opponent.choice}.svg`}
                            color={getBorderColor(opponent.choice)}
                            option={opponent.choice}
                            handleOnClick={() => {}}
                        />
                    ) : (
                        <Waiting />
                    )}
                </div>
            </div>
            {result ? (
                <div className="center col">
                    <h2 className={`final-result ${result[1]}`}>
                        {result[0]}{" "}
                    </h2>
                    <div className="center">
                        <SecondaryButton
                            onClick={() =>
                                dispatch(
                                    resetGame({
                                        playerId: sessionPlayer.id,
                                        opponentId: opponent.id
                                    })
                                )
                            }
                        >
                            Play Again
                        </SecondaryButton>
                        <EndGameBtn
                            dispatch={dispatch}
                            sessionPlayer={sessionPlayer}
                            opponent={opponent}
                        />{" "}
                    </div>
                </div>
            ) : (
                <div className="center">
                    {" "}
                    <EndGameBtn
                        dispatch={dispatch}
                        sessionPlayer={sessionPlayer}
                        opponent={opponent}
                    />
                </div>
            )}
        </div>
    );
};

const Game = () => {
    const { sessionPlayer, getOpponent } = usePlayer();
    const dispatch = useDispatch();

    console.log({ sessionPlayer });

    const getGameState = () => {
        if (sessionPlayer.opponent) {
            return sessionPlayer.choice ? (
                <Result
                    sessionPlayer={sessionPlayer}
                    opponent={getOpponent(sessionPlayer.opponent)}
                    dispatch={dispatch}
                />
            ) : (
                <Choosing
                    sessionPlayer={sessionPlayer}
                    opponent={getOpponent(sessionPlayer.opponent)}
                    dispatch={dispatch}
                />
            );
        } else if (sessionPlayer.requestList.length > 0) {
            return <Waiting />;
        } else {
            return <Placeholder />;
        }
    };
    return (
        <GameStyles>
            <h2>Playground</h2>
            <div className="center"> {getGameState()}</div>
        </GameStyles>
    );
};
export default Game;
