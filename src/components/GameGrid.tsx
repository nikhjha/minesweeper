import React, { Dispatch, SetStateAction } from "react";
import { Board, ControllerType, GameState } from "../types/gameboard";
import CellItem from "./CellItem";

type GameGridProps = {
  setGameBoard: Dispatch<SetStateAction<Board>>;
  gameboard: Board;
  controller: ControllerType;
  boom: () => void;
  gameState: GameState;
};

function GameGrid({
  gameboard,
  controller,
  setGameBoard,
  boom,
  gameState,
}: GameGridProps) {
  return (
    <div className="p-4 relative">
      {gameboard.map((row, index) => (
        <div className="mb-2 flex" key={`row_no_${index}`}>
          {row.map((cell, ind) => (
            <CellItem
              key={`column_no_${ind}_of_${index}`}
              x={ind}
              y={index}
              content={cell}
              controller={controller}
              setGameBoard={setGameBoard}
              boom={boom}
            />
          ))}
        </div>
      ))}
      {gameState !== "PLAYING" && (
        <div className="absolute top-0 left-0 w-full h-full  flex items-end justify-center p-4 before:content-[''] before:blur-sm before:bg-zinc-300 before:opacity-70 before:absolute before:w-full before:h-full before:top-0 before:left-0">
          <div className=" bg-white px-8 py-4 rounded relative">
            <h1 className="font-extrabold text-gray-800">
              {gameState === "DEFEATED"
                ? "Sorry, you are defeated. Please try again"
                : "Congrates, you won."}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameGrid;
