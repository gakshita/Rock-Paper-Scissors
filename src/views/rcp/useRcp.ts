import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus, endGame } from "../../app/playerSlice";
import usePlayer from "../../hooks/usePlayer";

const useRcp = () => {
    const [isLogin, setIsLogin] = useState(false);
    const { sessionPlayer } = usePlayer();
    const sessionId = sessionPlayer ? sessionPlayer.id : "";

    const sessionRef = useRef(sessionPlayer);
    const dispatch = useDispatch();

    useEffect(() => {
        window.onbeforeunload = function () {
            dispatch(
                changeStatus({ id: sessionRef.current.id, status: "offline" })
            );
            if (sessionRef.current.opponent) {
                dispatch(
                    endGame({
                        playerId: sessionRef.current.id,
                        opponentId: sessionRef.current.opponent
                    })
                );
            }
            console.log("beforeunload event triggeredd..");

            return undefined;
        };
    }, []);

    useEffect(() => {
        if (!sessionId) return;
        dispatch(changeStatus({ id: sessionId, status: "online" }));
    }, [sessionId]);

    useEffect(() => {
        if (!sessionPlayer) return;
        sessionRef.current = sessionPlayer;
    }, [sessionPlayer, sessionId]);

    return { setIsLogin, sessionId, session: sessionPlayer };
};

export default useRcp;
