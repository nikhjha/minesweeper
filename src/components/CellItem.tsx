import React, { Dispatch, SetStateAction } from "react";
import { Board, CellType, ControllerType } from "../types/gameboard";
import { openCrate, toggleFlag } from "../../pkg/minesweeper";
import { draw_board } from "../lib/draw";

type CellItemProps = {
  x: number;
  y: number;
  controller: ControllerType;
  content: CellType;
  setGameBoard: Dispatch<SetStateAction<Board>>;
  boom: () => void;
};

function CellItem({
  x,
  y,
  controller,
  content,
  setGameBoard,
  boom,
}: CellItemProps) {
  const handleOpen = () => {
    if (openCrate(x, y)) {
      setGameBoard(draw_board);
      boom();
      return;
    }
    setGameBoard(draw_board);
  };
  const handleToggle = () => {
    toggleFlag(x, y);
    setGameBoard(draw_board);
  };
  const handleClick = () => {
    if (controller === "DEFAULT") {
      if (content !== "CLOSED") {
        return;
      }
      handleOpen();
      return;
    }
    if (content === "CLOSED" || content === "FLAG") {
      handleToggle();
    }
  };
  return (
    <div className="mr-2 p-1">
      <div
        className={`bg-white w-8 h-8 rounded-sm cursor-pointer ${
          content === "EMPTY"
            ? "shadow-inner shadow-zinc-700"
            : content === "CLOSED"
            ? "bg-zinc-400"
            : ""
        }
        flex items-center justify-center
        `}
        onClick={handleClick}
      >
        {content === "FLAG"
          ? "🏴"
          : content === "MINE"
          ? "💣"
          : content === "CLOSED" || content === "EMPTY"
          ? ""
          : content}
      </div>
    </div>
  );
}

export default CellItem;
