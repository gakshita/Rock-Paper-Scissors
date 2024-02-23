import { OPTIONS } from "../constants";

export const hasWon = (playerChoice: string, opponentChoice: string) => {
    if (playerChoice === opponentChoice) return null;
    if (playerChoice === OPTIONS.rock && opponentChoice === OPTIONS.scissors) {
        return true;
    }
    if (playerChoice === OPTIONS.scissors && opponentChoice === OPTIONS.paper) {
        return true;
    }
    if (playerChoice === OPTIONS.paper && opponentChoice === OPTIONS.rock) {
        return true;
    }
    return false;
};

export const getResults = (
    playerChoice: string,
    opponentChoice: string
): string[] => {
    if (playerChoice === opponentChoice) {
        return ["It's a draw", ""];
    }
    if (hasWon(playerChoice, opponentChoice)) {
        return ["You Won", "won"];
    }
    return ["You Lost", "lost"];
};

export const getBorderColor = (choice: string): string => {
    if (choice === OPTIONS.rock) {
        return "red";
    }
    if (choice === OPTIONS.paper) {
        return "blue";
    }
    if (choice === OPTIONS.scissors) {
        return "yellow";
    }
    return "";
};
