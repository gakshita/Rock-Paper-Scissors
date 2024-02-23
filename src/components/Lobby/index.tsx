import { useDispatch } from "react-redux";
import { joinGame, joinWaitlist, requestGame } from "../../app/playerSlice";
import { SecondaryButton } from "../../styles";
import { Container } from "./styles";
import usePlayer from "../../hooks/usePlayer";
import { PlayerType } from "../../types";
import { PlayerProps } from "./types";

const Player = ({ player, sessionPlayer }: PlayerProps) => {
    const dispatch = useDispatch();

    const handleAction = () => {
        const payload = { playerId: player.id, from: sessionPlayer.id };
        if (player.opponent) {
            dispatch(joinWaitlist(payload));
        } else if (sessionPlayer.waitingList.includes(player.id)) {
            dispatch(joinGame(payload));
        } else {
            console.log("requesting game", payload);
            dispatch(requestGame(payload));
        }
    };

    const getStatus = () => {
        if (player.opponent) {
            return player.opponent === sessionPlayer.id ? "Active" : "Join W/L";
        } else if (sessionPlayer.waitingList.includes(player.id)) {
            return "Join";
        } else if (sessionPlayer.requestList.includes(player.id)) {
            return "Waiting";
        }
        return "Request";
    };

    return (
        <div key={player.id} className="players">
            <div className="name">{player.name}</div>
            <SecondaryButton
                onClick={handleAction}
                disabled={
                    player.opponent === sessionPlayer.id ||
                    sessionPlayer.requestList.includes(player.id) ||
                    sessionPlayer.opponent !== ""
                }
                className="btn"
            >
                {getStatus()}
            </SecondaryButton>
        </div>
    );
};

const Lobby = () => {
    const { activePlayers, sessionPlayer } = usePlayer();
    console.log(activePlayers);
    const getActivePlayers = () => {
        return activePlayers.filter(
            (player: PlayerType) => player.id !== sessionPlayer.id
        );
    };
    return (
        <Container>
            <h2>Lobby</h2>
            {getActivePlayers().length > 0 ? (
                getActivePlayers().map((player: PlayerType) => {
                    return (
                        <Player
                            key={player.id}
                            player={player}
                            sessionPlayer={sessionPlayer}
                        />
                    );
                })
            ) : (
                <div className="placeholder">No Active players</div>
            )}
        </Container>
    );
};

export default Lobby;
