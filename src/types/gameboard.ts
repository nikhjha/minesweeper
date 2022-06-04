
export type CellType = "MINE" | "EMPTY" | "FLAG" | "CLOSED" | number;
export type RowType = CellType[];
export type Board = RowType[];
export type ControllerType = "DEFAULT" | "FLAG";
export type GameState = "PLAYING" | "DEFEATED" | "WON";