import React, { Dispatch, SetStateAction } from "react";
import { ControllerType } from "../types/gameboard";

type ControllerProps = {
  setController: Dispatch<SetStateAction<ControllerType>>;
  controller: ControllerType;
  endGame : () => void;
};

function Controller({ setController, controller, endGame }: ControllerProps) {
  return (
    <div className="w-20 h-full rounded bg-white p-3 flex flex-col gap-3">
      <button
        className={`py-3 px-2 ${
          controller === "DEFAULT" ? "bg-zinc-900" : "bg-zinc-700"
        } rounded hover:scale-105`}
        onClick={()=>{
            setController("DEFAULT");
        }}
      >
        👆🏻
      </button>
      <button
        className={`py-3 px-2 ${
          controller === "FLAG" ? "bg-zinc-900" : "bg-zinc-700"
        } rounded hover:scale-105`}
        onClick={()=>{
            setController("FLAG");
        }}
      >
        🏳
      </button>
      <button
        className={`py-3 px-2 bg-zinc-700 rounded hover:scale-105`}
        onClick={()=>{
         endGame();
        }}
      >
        ⚔️
      </button>
    </div>
  );
}

export default Controller;
