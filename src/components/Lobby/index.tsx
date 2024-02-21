import { useSelector } from "react-redux";
import { selectActivePlayers } from "../../app/playerSlice";

const Players = () => {
    const players = useSelector(selectActivePlayers);
    console.log(players);
    return (
        <>
            <h3>Players</h3>
            <ul>
                {players.map((player, index: number) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </>
    );
};
const Games = () => {
    return <div>Games</div>;
};

const Lobby = () => {
    return (
        <div>
            <Players />
            <Games />
        </div>
    );
};

export default Lobby;
