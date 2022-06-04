import { Board, CellType, RowType } from "../types/gameboard";
import { getState } from "../../pkg/minesweeper";

export const draw_board = (): Board => {
  const gameState = getState();
  const board: RowType[] = gameState
    .trim()
    .split("\n")
    .map((row: string): RowType => {
      return row
        .trim()
        .split(/\s+/)
        .map((cell: string): CellType => {
          const content = cell.trim();
          if (content === "😉") {
            return "CLOSED";
          } else if (content === "💣") {
            return "MINE";
          } else if (content === "🏴") {
            return "FLAG";
          }
          const number = parseInt(content);
          if (number === 0) {
            return "EMPTY";
          }
          return number;
        });
    });
  return board;
};
