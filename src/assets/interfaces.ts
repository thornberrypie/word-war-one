// Tile that can be in the rack or on the board
export interface TileInterface {
  boardIndex: number | null,
  letter: string,
  rackIndex: number | null,
}

// Tile that is currently selected. Can be on the rack or the board
export interface RackTileInterface {
  boardIndex: number | null,
  letter: string,
  rackIndex: number, // A tile in the rack or a currently selected tile can't have a null rackIndex
}

// State vars used throughout the app
export interface StateInterface {
  boardTiles: TileInterface[],
  rackTiles: RackTileInterface[],
  selectedTile: RackTileInterface | null,
  totalTilesPlayed: number,
}