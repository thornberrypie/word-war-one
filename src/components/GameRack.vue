<script setup lang="ts">
import { computed } from 'vue'
import { state } from '@/main'
import { type TileInterface } from '../assets/interfaces'
import { detachTileFromCursor, followCursor } from '../assets/helpers'

import BringBackTiles from './actions/BringBackTiles.vue'
import ShuffleTiles from './actions/ShuffleTiles.vue'
import StartNewGame from './actions/StartNewGame.vue'

const getRackTileId = (i: number) => `rack_${i}`

const playWord = () => {
  console.log(state.value)
}

const handleRackSpaceClick = (tile: TileInterface) => {
  console.log('tile', tile)

  const { rackTiles, selectedTile } = state.value
  if(typeof tile.rackIndex !== 'number') {
    return
  }
  // When there is already a tile selected
  if(selectedTile) {
    // Get the clicked rack space to check if there is a tile in it
    const clickedTile = document.getElementById(`rack_${tile.rackIndex}`)
    const selectedRackIndex = selectedTile.rackIndex

    if(!selectedRackIndex) {
      return null
    }

    // If clicking on an empty rack space place the selected tile in that space
    if(clickedTile?.innerHTML === '') {
      // Kill the transform and mouse listener
      detachTileFromCursor(selectedRackIndex)

      // Remove the letter from the old spot if putting the tile back in different place
      if(selectedRackIndex !== tile.rackIndex) {
        rackTiles[selectedRackIndex].letter = ''
      }
      selectedTile.rackIndex = tile.rackIndex
      // Update the rack index of the selected tile and put it in the clicked space
      rackTiles[tile.rackIndex] = selectedTile
      // rackTiles[selectedTile.rackIndex] = selectedTile
      state.value = { ...state.value, rackTiles, selectedTile: null }
    } else {
       // Kill the transform but keep the mouse listener
      detachTileFromCursor(selectedTile.rackIndex, false)
      // Put the tile back if clicking the space it came from
      if(selectedRackIndex === tile.rackIndex) {
        state.value = { ...state.value, selectedTile: null }
      } else {
        // Swap the selected tile for the clicked tile
        state.value = { ...state.value, selectedTile: tile }
      }
    }
  } else {
    const clickedTile = document.getElementById(`rack_${tile.rackIndex}`)

    // Don't do anything if clicking on an empty rack space
    if(clickedTile?.innerHTML === '') {
      return
    }

    // Set the selected tile and attach the cursor
    state.value = {
      ...state.value,
      selectedTile: {
        boardIndex: tile.boardIndex,
        letter: tile.letter,
        rackIndex: tile.rackIndex
      }
    }
    document.addEventListener('mousemove', followCursor, true)
  }
}

const canPlayWord = computed(() => {
  return state.value.totalTilesPlayed > 1
})

</script>

<template>
<div class="gameActions">
  <button @click="playWord" :disabled="!canPlayWord">Play Word</button>
</div>
<div class="GameRack">
  <div
    v-for="(tile, index) in state.rackTiles"
    :key="index"
    class="GameRackSquare"
    @click="() => handleRackSpaceClick(tile)"
  >
    <div
      class="GameRackTile"
      :class="{
        active: tile.rackIndex === state.selectedTile?.rackIndex,
        empty: state.rackTiles[index].letter === '',
        stickToCursor: state.selectedTile?.rackIndex === index,
      }"
      :id="getRackTileId(index)"
    >
      {{ tile.letter }}
    </div>
  </div>
</div>
<div class="gameActions">
  <ShuffleTiles />
  <BringBackTiles />
</div>
<div class="gameActions">
  <StartNewGame />
</div>
<p>Selected tile:
  {{ state.selectedTile?.boardIndex }}
  {{ state.selectedTile?.letter }}
  {{ state.selectedTile?.rackIndex }}
</p>
<p>Tiles played: {{ state.totalTilesPlayed }}</p>
</template>