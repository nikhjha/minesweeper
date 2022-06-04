use crate::random::random_range;
use std::collections::HashSet;
use std::fmt::Display;
use std::fmt::Write;

pub type Position = (usize, usize);

pub enum OpenResult {
    Mine,
    NoMine(u8),
    None,
}

#[derive(Debug)]
pub struct Minesweeper {
    width: usize,
    height: usize,
    open_fields: HashSet<Position>,
    mines: HashSet<Position>,
    flaged_fields: HashSet<Position>,
}

impl Display for Minesweeper {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::result::Result<(), std::fmt::Error> {
        for y in 0..self.height {
            for x in 0..self.width {
                let pos = (x, y);
                if !self.open_fields.contains(&pos) {
                    if self.flaged_fields.contains(&pos) {
                        f.write_str(" 🏴 ")?;
                    } else {
                        f.write_str(" 😉 ")?;
                    }
                } else if self.mines.contains(&pos) {
                    f.write_str(" 💣 ")?;
                } else {
                    write!(f, "  {} ", self.neighbours(pos))?;
                };
            }

            f.write_char('\n')?;
        }
        Ok(())
    }
}

impl Minesweeper {
    pub fn new(width: usize, height: usize, mine_counts: usize) -> Minesweeper {
        Minesweeper {
            width,
            height,
            open_fields: HashSet::new(),
            mines: {
                let mut mines = HashSet::new();
                while mines.len() < mine_counts {
                    mines.insert((random_range(0, width), random_range(0, height)));
                }
                mines
            },
            flaged_fields: HashSet::new(),
        }
    }
    pub fn itr_neighbours(&self, (x, y): Position) -> impl Iterator<Item = Position> {
        let width = self.width;
        let height = self.height;
        (x.max(1) - 1..=(x + 1).min(width - 1))
            .flat_map(move |i| (y.max(1) - 1..=(y + 1).min(height - 1)).map(move |j| (i, j)))
            .filter(move |&pos| pos != (x, y))
    }
    pub fn neighbours(&self, pos: Position) -> u8 {
        self.itr_neighbours(pos)
            .filter(|pos| self.mines.contains(pos))
            .count() as u8
    }
    pub fn open(&mut self, position: Position) -> OpenResult {
        if self.flaged_fields.contains(&position) {
            return OpenResult::None;
        }
        self.open_fields.insert(position);
        let is_mine = self.mines.contains(&position);
        if is_mine {
            OpenResult::Mine
        } else {
            let neighbours = self.neighbours(position);
            let mut neighbours_list = HashSet::new();
            if neighbours == 0 {
                neighbours_list.insert(position);
            }
            let mut count = neighbours_list.len();
            while count != 0 {
                let mut temp_neighbour = HashSet::new();
                for neighbour_pos in neighbours_list.iter() {
                    let its_neighbour = self.itr_neighbours(*neighbour_pos).filter(|pos| {
                        !self.mines.contains(pos)
                            && !self.open_fields.contains(pos)
                            && self.neighbours(*pos) == 0
                    });
                    for new_neighbour in its_neighbour {
                        temp_neighbour.insert(new_neighbour);
                    }
                }
                count = temp_neighbour.len();
                neighbours_list = temp_neighbour.clone();
                self.open_fields.extend(temp_neighbour);
                continue;
            }
            OpenResult::NoMine(self.neighbours(position))
        }
    }

    pub fn toggle_flag(&mut self, pos: Position) {
        if self.open_fields.contains(&pos) {
            return;
        }
        if self.flaged_fields.contains(&pos) {
            self.flaged_fields.remove(&pos);
        } else {
            self.flaged_fields.insert(pos);
        }
    }

    pub fn game_finished(&self) -> bool {
        let mut count = 0;
        let mut open_count = 0;
        for x in 0..self.width {
            for y in 0..self.height {
                if !self.open_fields.contains(&(x, y)) {
                    if self.mines.contains(&(x, y)) {
                        count += 1;
                    }
                } else {
                    open_count += 1;
                }
            }
        }
        open_count + count == self.width * self.height
    }
}

#[cfg(test)]
mod test {
    use crate::Minesweeper;
    #[test]
    fn test() {
        let mut ms = Minesweeper::new(10, 10, 5);
        println!("{}", ms.game_finished());
        for x in 0..10 {
            for y in 0..10 {
                if !ms.mines.contains(&(x, y)) {
                    ms.open((x, y));
                }
            }
        }
        println!("{}", ms.game_finished());
        println!("{}", ms)
    }
}
