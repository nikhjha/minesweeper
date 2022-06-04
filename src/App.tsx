import { useEffect, useState } from "react";
import init from "../pkg/minesweeper";
import { Board } from "./types/gameboard";
import Creator from "./components/Creator";
import GameBoard from "./components/GameBoard";

function App() {
  const [gameboard, setGameBoard] = useState<Board>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  useEffect(() => {
    const initialize = async () => {
      await init();
    };
    initialize();
  }, []);
  const endGame = () => {
    setGameBoard([]);
    setGameStarted(false);
  };
  return (
    <div className="bg-zinc-500 w-screen h-screen">
      <div className="w-full mx-auto sm:w-[40rem] p-2 bg-zinc-700 h-screen">
        <Creator
          setGameBoard={setGameBoard}
          start={setGameStarted}
          started={gameStarted}
        />
        <GameBoard
          gameboard={gameboard}
          started={gameStarted}
          endGame={endGame}
          setGameBoard={setGameBoard}
        />
      </div>
    </div>
  );
}

export default App;
