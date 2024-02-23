import { SecondaryButton } from "../../styles";
import { Container } from "./styles";
import { PlayerType } from "../../types";
import { PlayerProps } from "./types";
import useLobby from "./useLobby";

const Player = ({
    player,
    sessionPlayer,
    handleAction,
    btnStatus
}: PlayerProps) => {
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
                {btnStatus}
            </SecondaryButton>
        </div>
    );
};

const Lobby = () => {
    const { sessionPlayer, getActivePlayers, handleAction, getStatus } =
        useLobby();
    return (
        <Container>
            <h2>Lobby</h2>
            {getActivePlayers.length > 0 ? (
                getActivePlayers.map((player: PlayerType) => {
                    return (
                        <Player
                            key={player.id}
                            player={player}
                            sessionPlayer={sessionPlayer}
                            handleAction={() =>
                                handleAction(player, sessionPlayer)
                            }
                            btnStatus={getStatus(player)}
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
