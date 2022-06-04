mod minesweeper;
mod random;

use core::cell::RefCell;
use minesweeper::*;

use wasm_bindgen::prelude::*;

struct Game {
    ms: Minesweeper,
}

impl Game {
    pub fn new() -> Game {
        Game {
            ms: Minesweeper::new(0, 0, 0),
        }
    }
    pub fn create(&mut self, row: usize, col: usize, mines: usize) {
        self.ms = Minesweeper::new(row, col, mines);
    }
}

thread_local! {
  static GAME: RefCell<Game>
    = RefCell::new(Game::new());
}

#[wasm_bindgen]
pub fn start(row: usize, col: usize) -> bool {
    let no_of_mines = (row.min(col) as f64 * 1.5).floor() as usize;
    GAME.with(|game| game.borrow_mut().create(row, col, no_of_mines));
    true
}

#[wasm_bindgen(js_name = getState)]
pub fn get_state() -> String {
    GAME.with(|game| game.borrow().ms.to_string())
}

#[wasm_bindgen(js_name = openCrate)]
pub fn open(x: usize, y: usize) -> bool {
    let mut state = false;
    GAME.with(|game| {
        let result: OpenResult = game.borrow_mut().ms.open((x, y));
        if let OpenResult::Mine = result {
            state = true;
        }
    });
    state
}

#[wasm_bindgen(js_name = toggleFlag)]
pub fn toggle(x: usize, y: usize) {
    GAME.with(|game| game.borrow_mut().ms.toggle_flag((x, y)));
}

#[wasm_bindgen(js_name = isFinished)]
pub fn is_finished() -> bool {
    GAME.with(|game| game.borrow().ms.game_finished())
}
