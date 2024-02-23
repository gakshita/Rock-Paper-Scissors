import { createSlice, current } from "@reduxjs/toolkit";
import { PlayerType } from "../types";

const initialState: PlayerType[] = [];

const playerSlice = createSlice({
    name: "players",
    initialState: {
        players: initialState
    },
    reducers: {
        addPlayer: (state, action) => {
            let player: PlayerType = {
                id: action.payload.id,
                name: action.payload.name,
                status: "online",
                matches: 0,
                wins: 0,
                waitingList: [],
                requestList: [],
                choice: "",
                opponent: ""
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
            }
            console.log(player, index, action.payload.status);
        },
        updateScore: (state, action) => {
            console.log(
                "updateScore: ",
                action.payload,
                "state: ",
                state.players
            );
            let player = state.players.find(
                (player) => player.id === action.payload.playerId
            );
            let opponent = state.players.find(
                (player) => player.id === action.payload.opponentId
            );
            if (player && opponent) {
                player.matches++;
                opponent.matches++;

                // if hasWon is null, it means it's a draw so no need to update the score
                if (action.payload.hasWon === true) {
                    player.wins++;
                } else if (action.payload.hasWon === false) {
                    opponent.wins++;
                }
            }
        },
        requestGame: (state, action) => {
            console.log(
                "requestGame: ",
                action.payload,
                "state: ",
                state.players
            );
            let player = state.players.find(
                (player) => player.id === action.payload.playerId
            );
            let fromPlayer = state.players.find(
                (player) => player.id === action.payload.from
            );
            if (player && fromPlayer) {
                fromPlayer.requestList.push(action.payload.playerId);
                player.waitingList.push(action.payload.from);
                console.log(current(state.players));
            }
            console.log("updated state", current(state.players));
        },
        joinGame: (state, action) => {
            console.log("joinGame: ", action.payload, "state: ", state.players);
            let player = state.players.find(
                (player) => player.id === action.payload.playerId
            );
            let fromPlayer = state.players.find(
                (player) => player.id === action.payload.from
            );
            if (player && fromPlayer) {
                player.opponent = action.payload.from;
                fromPlayer.opponent = action.payload.playerId;
            }
            console.log("updated state", current(state.players));
        },
        joinWaitlist: (state, action) => {
            console.log(
                "joinWaitlist: ",
                action.payload,
                "state: ",
                state.players
            );
            let player = state.players.find(
                (player) => player.id === action.payload.playerId
            );
            let fromPlayer = state.players.find(
                (player) => player.id === action.payload.from
            );
            if (player && fromPlayer) {
                player.waitingList.push(action.payload.from);
                fromPlayer.requestList.push(action.payload.playerId);
                console.log(current(state.players));
            }
            console.log("updated state", current(state.players));
        },
        chooseOption: (state, action) => {
            console.log(
                "chooseOption: ",
                action.payload,
                "state: ",
                state.players
            );
            let player = state.players.find(
                (player) => player.id === action.payload.playerId
            );
            if (player) {
                player.choice = action.payload.choice;
                console.log(current(state.players));
            }
            console.log("updated state", current(state.players));
        },
        endGame: (state, action) => {
            console.log("endGame: ", action.payload, "state: ", state.players);
            let player = state.players.find(
                (player) => player.id === action.payload.playerId
            );
            let opponent = state.players.find(
                (player) => player.id === action.payload.opponentId
            );
            if (player && opponent) {
                player.opponent = "";
                player.choice = "";
                opponent.opponent = "";
                opponent.choice = "";
                player.requestList = player.requestList.filter(
                    (id) => id !== action.payload.opponentId
                );
                player.waitingList = player.waitingList.filter(
                    (id) => id !== action.payload.opponentId
                );
                opponent.requestList = opponent.requestList.filter(
                    (id) => id !== action.payload.playerId
                );
                opponent.waitingList = opponent.waitingList.filter(
                    (id) => id !== action.payload.playerId
                );
                console.log(current(state.players));
            }
            console.log("updated state", current(state.players));
        },
        resetGame: (state, action) => {
            console.log(
                "resetGame: ",
                action.payload,
                "state: ",
                state.players
            );
            let player = state.players.find(
                (player) => player.id === action.payload.playerId
            );
            let opponent = state.players.find(
                (player) => player.id === action.payload.opponentId
            );
            if (player && opponent) {
                player.choice = "";
                opponent.choice = "";
                console.log(current(state.players));
            }
        }
    }
});

export const {
    addPlayer,
    changeStatus,
    updateScore,
    requestGame,
    joinGame,
    joinWaitlist,
    chooseOption,
    endGame,
    resetGame
} = playerSlice.actions;

export const selectPlayers = (state: any) => state.players.players;

export const selectPlayer = (state: any, id: string) =>
    state.players.players.find((player: PlayerType) => player.id === id);

export const selectLeaderboard = (state: any) => {
    return state.players.players.sort((a: PlayerType, b: PlayerType) => {
        return b.wins - a.wins;
    });
};

export default playerSlice.reducer;
