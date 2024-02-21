import { createSlice } from "@reduxjs/toolkit";

type PlayerType = {
    id: string;
    name: string;
    status: string;
    matches: number;
    wins: number;
};

const initialState: PlayerType[] = [];

const playerSlice = createSlice({
    name: "players",
    initialState: {
        players: initialState
    },
    reducers: {
        addPlayer: (state, action) => {
            let player = {
                id: action.payload.id,
                name: action.payload.name,
                status: "online",
                matches: 0,
                wins: 0
            };
            state.players.push(player);
        },
        changeStatus: (state, action) => {
            console.log(action);
            let player = state.players.find(
                (player) => player.id === action.payload.id
            );
            let index = state.players.findIndex(
                (player) => player.id === action.payload.id
            );
            if (player) {
                player.status = action.payload.status;
                state.players[index] = {
                    ...player,
                    status: action.payload.status
                };
            }
            console.log(player, index, action.payload.status);
        },
        updateScore: (state, action) => {
            let player = state.players.find(
                (player) => player.id === action.payload.id
            );
            if (player) {
                player.matches++;
                if (action.payload.hasWon) {
                    player.wins++;
                }
            }
        }
    }
});

export const { addPlayer, changeStatus, updateScore } = playerSlice.actions;
export const selectPlayers = (state: any) => state.players.players;
export const selectActivePlayers = (state: any) => {
    return state.players.players.filter(
        (player: PlayerType) => player.status === "online"
    );
};
export const selectPlayer = (state: any, id: string) =>
    state.players.players.find((player: PlayerType) => player.id === id);

export const selectLeaderboard = (state: any) => {
    return state.players.players.sort((a: PlayerType, b: PlayerType) => {
        return b.wins - a.wins;
    });
};

export default playerSlice.reducer;
