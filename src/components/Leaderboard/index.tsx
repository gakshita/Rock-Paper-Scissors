import { LeaderStyles } from "./styles";
import usePlayer from "../../hooks/usePlayer";
import { PlayerType } from "../../types";

const Leaderboard = () => {
    const { allPlayers } = usePlayer();

    const getLeaderboard = () => {
        let leaderboard = allPlayers.filter(
            (player: PlayerType) => player.matches > 0
        );
        leaderboard.sort(
            (a: PlayerType, b: PlayerType) =>
                b.wins / b.matches - a.wins / a.matches
        );
        return leaderboard;
    };

    return (
        <LeaderStyles>
            <table>
                <tbody>
                    <tr className="table-head">
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Total Matches</th>
                        <th>Wins</th>
                        <th>Score</th>
                    </tr>
                    {getLeaderboard().map(
                        (player: PlayerType, index: number) => {
                            return (
                                <tr key={player.id} className="table-data">
                                    <td>#{index + 1}</td>
                                    <td>{player.name}</td>
                                    <td>{player.matches}</td>
                                    <td>{player.wins}</td>
                                    <td>
                                        {(player.wins / player.matches).toFixed(
                                            2
                                        )}
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </LeaderStyles>
    );
};
export default Leaderboard;
