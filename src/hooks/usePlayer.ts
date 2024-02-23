import { useSelector } from "react-redux";
import { selectPlayer, selectPlayers } from "../app/playerSlice";
import { PlayerType } from "../types";
import { STATUS } from "../constants";
import { useCallback, useMemo } from "react";

const usePlayer = () => {
    const allPlayers = useSelector(selectPlayers);
    const sessionId = sessionStorage.getItem("id") || "";
    const sessionPlayer = useSelector((state) =>
        selectPlayer(state, sessionId)
    );
    const getOpponent = useCallback(
        (opponentId: string) => {
            return allPlayers.find(
                (player: PlayerType) => player.id === opponentId
            );
        },
        [allPlayers]
    );

    const activePlayers = useMemo(() => {
        return allPlayers.filter(
            (player: PlayerType) => player.status === STATUS.online
        );
    }, [allPlayers]);

    return {
        activePlayers,
        sessionPlayer,
        getOpponent,
        allPlayers
    };
};

export default usePlayer;
