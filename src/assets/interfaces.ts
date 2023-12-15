// Tile that can be in the rack or on the board
export interface TileInterface {
  boardIndex: number | null, // Tile has a null boardIndex when in the rack
  letter: string | null, // Rack space has null letter when its tile has been moved to the board
  rackIndex: number | null, // Tile has a null rackIndex when on the board
}

// Tile that is currently selected. Can be on the rack or the board
// export interface RackTileInterface {
//   boardIndex: number | null,
//   letter: string,
//   rackIndex: number,
// }

// State vars used throughout the app
export interface StateInterface {
  boardTiles: TileInterface[],
  rackTiles: TileInterface[],
  selectedTile: TileInterface | null,
  totalTilesPlayed: number,
}
// export interface StateInterface {
//   boardTiles: TileInterface[],
//   rackTiles: RackTileInterface[],
//   selectedTile: RackTileInterface | null,
//   totalTilesPlayed: number,
// }