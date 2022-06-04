import { Dispatch, SetStateAction, useState } from "react";
import { Board } from "../types/gameboard";
import { start as startMinesweeper } from "../../pkg/minesweeper";
import { draw_board } from "../lib/draw";

type CreatorProps = {
  setGameBoard: Dispatch<SetStateAction<Board>>;
  started: boolean;
  start: Dispatch<SetStateAction<boolean>>;
};

function Creator({ setGameBoard, started, start }: CreatorProps) {
  const [row, setRow] = useState("10");
  const [column, setColumn] = useState("10");
  const startGame = () => {
    startMinesweeper(parseInt(row), parseInt(column));
    setGameBoard(draw_board());
    start(true);
  };
  return (
    <div className="bg-white rounded p-4 flex justify-between">
      <input
        type="text"
        placeholder="Rows"
        className="p-2 border-2 rounded"
        disabled={started}
        value={row}
        onChange={(e) => {
          setRow(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Columns"
        className="p-2 border-2 rounded"
        disabled={started}
        value={column}
        onChange={(e) => {
          setColumn(e.target.value);
        }}
      />
      <button
        className="py-2 px-4 rounded bg-black text-white font-semibold disabled:bg-gray-700"
        onClick={startGame}
        disabled={started}
      >
        Play
      </button>
    </div>
  );
}

export default Creator;
