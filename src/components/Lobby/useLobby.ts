import { PlayerType } from "../../types";
import { useDispatch } from "react-redux";
import { joinGame, joinWaitlist, requestGame } from "../../app/playerSlice";
import usePlayer from "../../hooks/usePlayer";
import { useMemo } from "react";

const useLobby = () => {
    const { activePlayers, sessionPlayer } = usePlayer();
    const dispatch = useDispatch();

    const getActivePlayers = useMemo(() => {
        return activePlayers.filter(
            (player: PlayerType) => player.id !== sessionPlayer.id
        );
    }, [activePlayers, sessionPlayer]);

    const handleAction = (player: PlayerType, sessionPlayer: PlayerType) => {
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

    const getStatus = (player: PlayerType) => {
        if (player.opponent) {
            return player.opponent === sessionPlayer.id ? "Active" : "Join W/L";
        } else if (sessionPlayer.waitingList.includes(player.id)) {
            return "Join";
        } else if (sessionPlayer.requestList.includes(player.id)) {
            return "Waiting";
        }
        return "Request";
    };

    return {
        sessionPlayer,
        getActivePlayers,
        handleAction,
        getStatus
    };
};
export default useLobby;
