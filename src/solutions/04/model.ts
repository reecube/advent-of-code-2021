export interface BoardCell {
  nbr: number;
  gone: boolean;
}

export interface BingoBoard {
  won: boolean;
  instruction: number | false;
  rows: BoardCell[][];
}
