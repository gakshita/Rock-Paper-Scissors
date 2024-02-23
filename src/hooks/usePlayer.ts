import { useSelector } from "react-redux";
import { selectPlayer, selectPlayers } from "../app/playerSlice";
import { PlayerType } from "../types";

const usePlayer = () => {
    const allPlayers = useSelector(selectPlayers);
    const sessionId = sessionStorage.getItem("id") || "";
    const sessionPlayer = useSelector((state) =>
        selectPlayer(state, sessionId)
    );
    const getOpponent = (opponentId: string) => {
        return allPlayers.find(
            (player: PlayerType) => player.id === opponentId
        );
    };
    const activePlayers = () => {
        return allPlayers.filter(
            (player: PlayerType) => player.status === "online"
        );
    };
    return {
        activePlayers: activePlayers(),
        sessionPlayer,
        getOpponent,
        allPlayers
    };
};

export default usePlayer;
