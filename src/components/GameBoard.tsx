import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import Controller from "./Controller";
import GameGrid from "./GameGrid";
import { Board, ControllerType, GameState } from "../types/gameboard";
import { isFinished } from "../../pkg/minesweeper";

type GameBoardProps = {
  gameboard: Board;
  started: boolean;
  endGame: () => void;
  setGameBoard: Dispatch<SetStateAction<Board>>;
};

export default function GameBoard({
  gameboard,
  started,
  endGame,
  setGameBoard,
}: GameBoardProps) {
  const [selectedController, setController] =
    useState<ControllerType>("DEFAULT");
  const [gameState, setGameState] = useState<GameState>("PLAYING");
  const restart = () => {
    if (gameState !== "PLAYING") {
      endGame();
    }
  };
  const boom = () => {
    setGameState("DEFEATED");
    setTimeout(() => {
      restart();
    }, 5000);
  };
  useEffect(() => {
    if (started && isFinished()) {
      setGameState("WON");
      setTimeout(() => {
        restart();
      }, 5000);
      return;
    }
  }, [gameboard]);
  useEffect(() => {
    if (started) {
      setGameState("PLAYING");
    }
  }, [started]);
  return (
    <div className="mt-4 h-[30rem]">
      {started && (
        <div className="h-full flex gap-2">
          <Controller
            controller={selectedController}
            setController={setController}
            endGame={endGame}
          />
          <GameGrid
            gameboard={gameboard}
            boom={boom}
            controller={selectedController}
            setGameBoard={setGameBoard}
            gameState={gameState}
          />
        </div>
      )}
      {!started && (
        <div className="p-4 text-white">
          Please Provide Number of rows and columns. And Press the Play button
          to start the game !
        </div>
      )}
    </div>
  );
}
