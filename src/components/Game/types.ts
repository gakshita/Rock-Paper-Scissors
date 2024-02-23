import { PlayerType } from "../../types";

export type OptionProps = {
    src: string;
    color: string;
    option: string;
    handleOnClick: (option: string) => void;
};
export type ChoosingProps = {
    sessionPlayer: PlayerType;
    opponent: PlayerType;
    dispatch: any;
};
export type ResultProps = {
    sessionPlayer: PlayerType;
    opponent: PlayerType;
    dispatch: any;
};

export type EndGameBtnProps = {
    dispatch: any;
    sessionPlayer: PlayerType;
    opponent: PlayerType;
};
