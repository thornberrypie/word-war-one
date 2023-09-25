<script setup lang="ts">
import { state } from '@/main'
import { type TileInterface } from '../assets/interfaces'
import { followCursor } from '../assets/helpers'

const detachTileFromCursor = (rackIndex: number) => {
  console.log('rackIndex', rackIndex)
  document.removeEventListener('mousemove', followCursor, true)
  const tileElement: HTMLElement | null = document.querySelector(`#rack_${rackIndex}`)
  if(tileElement) {
    tileElement.style.transform = 'none'
  } 
}

const handleBoardTileClick = (boardTile: TileInterface) => {
  const { boardTiles, rackTiles, selectedTile } = state.value

  // When clicking on an empty tile
  if(boardTile.letter === '') {
    // Do nothing if no letter is selected
    if(!selectedTile) {
      return
    }
    // Place the tile if it's allowed to be put here
    const { boardIndex } = boardTile
    if(boardIndex) {
      // Add the selected tile to the board
      boardTiles[boardIndex] = {
        boardIndex,
        letter: selectedTile.letter,
        rackIndex: selectedTile.rackIndex,
      }
      // Hide the letter from the rack but keep the tile and add the 
      // boardIndex in case we want it back
      rackTiles[selectedTile.rackIndex].letter = '' 
      rackTiles[selectedTile.rackIndex].boardIndex = boardIndex

     detachTileFromCursor(selectedTile.rackIndex)

      // Place the tile
      state.value = {
        ...state.value,
        boardTiles, // Updates the board to place the new tile keeping rackIndex until word is played
        rackTiles, // Removes the placed tile from the rack
        selectedTile: null, // Reset the selected tile now that it's on the board
        totalTilesPlayed: state.value.totalTilesPlayed + 1 // Keep track of no. of played tiles
      }
    }
  } else {
    // Put the letter back in the rack if trying to place it on another one
    if(selectedTile) {
      rackTiles[selectedTile.rackIndex].boardIndex = null
      rackTiles[selectedTile.rackIndex].letter = selectedTile.letter
      detachTileFromCursor(selectedTile.rackIndex)

      // Place the tile
      state.value = {
        ...state.value,
        rackTiles, // Removes the placed tile from the rack
        selectedTile: null, // Reset the selected tile now that it's on the board
      }
    }
  }
  // Place the tile
  state.value = {
    ...state.value,
    boardTiles, // Updates the board to place the new tile keeping rackIndex until word is played
    rackTiles, // Removes the placed tile from the rack
    selectedTile: null, // Reset the selected tile now that it's on the board
    totalTilesPlayed: state.value.totalTilesPlayed + 1 // Keep track of no. of played tiles
  }

}
</script>

<template>
<p align="center">This game is still in development. Check back soon to see the progress.</p>
<div class="GameBoard">
  <div
    v-for="(tile, index) in state.boardTiles"
    class="GameBoardSquare"
    :class="{ empty: tile.letter === '' }"
    :id="`boardtile`"
    :key="index"
    @click="() => handleBoardTileClick(tile)"
  >
    {{ state.boardTiles[index].letter }}
  </div>
</div>
</template>