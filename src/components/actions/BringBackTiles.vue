<script setup lang="ts">
import { state } from '../../main'

const bringBackTiles = () => {
  const { boardTiles, rackTiles, totalTilesPlayed } = state.value

  // Count the board tiles we're taking back so we can subtract it from totalTilesPlayed
  let numBoardTiles = 0

  // Loop through the rack tiles taking back any that are on the board
  const returnedTiles = rackTiles.map((tile) => {
    const { boardIndex } = tile
    
    // Move tile back to rack if it's on the board
    if(boardIndex) {
      const letter = boardTiles[boardIndex].letter

      // Update the board to remove the tile we're taking back
      boardTiles[boardIndex] = { ...boardTiles[boardIndex], letter: '', rackIndex: null }

      // Increment count so we know how many to subtract from totalTilesPlayed and update
      numBoardTiles++
      return { ...tile, boardIndex: null, letter  }
    }

    // Do nothing if the current looped tile is still in the rack
    return tile
  })

  state.value = {
    ...state.value,
    rackTiles: returnedTiles,
    selectedTile: null,
    totalTilesPlayed: totalTilesPlayed - numBoardTiles
  }
}
</script>

<template>
<button @click="bringBackTiles" :disabled="state.totalTilesPlayed === 0">
  <font-awesome-icon icon="fa-solid fa-arrow-down" />
  &nbsp;Bring Back Tiles&nbsp;
  <font-awesome-icon icon="fa-solid fa-arrow-down" />
</button>
</template>