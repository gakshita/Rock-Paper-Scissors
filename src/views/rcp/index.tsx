import { useEffect, useRef, useState } from "react";
import Login from "../../components/Login";

import Breadcrumbs from "../../components/Breadcrumbs";
import Lobby from "../../components/Lobby";
import Game from "../../components/Game";
import Leaderboard from "../../components/Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, selectPlayer } from "../../app/playerSlice";

const RPC = () => {
    const [isLogin, setIsLogin] = useState(false);
    const sessionId = sessionStorage.getItem("id");
    const session = useSelector((state) =>
        selectPlayer(state, sessionId || "")
    );

    const sessionRef = useRef(session);
    const dispatch = useDispatch();

    useEffect(() => {
        window.onbeforeunload = function () {
            dispatch(
                changeStatus({ id: sessionRef.current.id, status: "offline" })
            );
            sessionStorage.removeItem("id");
            console.log("beforeunload event triggeredd..");

            return undefined;
        };
    }, []);

    useEffect(() => {
        sessionRef.current = session;
    }, [session]);

    return (
        <>
            {sessionId ? (
                <div>
                    {session.name}
                    <Breadcrumbs />
                    <Lobby />
                    <Game />
                    <Leaderboard />
                </div>
            ) : (
                <Login setIsLogin={setIsLogin} />
            )}
        </>
    );
};

export default RPC;
