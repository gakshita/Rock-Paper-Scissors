import { PlayerType } from "../../types";

export type PlayerProps = {
    player: PlayerType;
    sessionPlayer: PlayerType;
    handleAction: () => void;
    btnStatus: string;
};
