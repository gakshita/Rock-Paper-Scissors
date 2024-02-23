import Login from "../../components/Login";
import Lobby from "../../components/Lobby";
import Game from "../../components/Game";
import Leaderboard from "../../components/Leaderboard";
import { Container } from "./styles";
import useRcp from "./useRcp";

const RPC = () => {
    const { sessionId, session } = useRcp();
    return (
        <>
            {sessionId ? (
                <Container>
                    <h2> {session.name}'s Session</h2>
                    <div className="top-container">
                        <Game />
                        <Lobby />
                    </div>
                    <Leaderboard />
                </Container>
            ) : (
                // <Container>
                <Login />
                // </Container>
            )}
        </>
    );
};

export default RPC;
