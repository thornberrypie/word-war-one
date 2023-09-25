<script setup lang="ts">
import { computed } from 'vue'
import { state } from '@/main'
import { type RackTileInterface } from '../assets/interfaces'
import { followCursor } from '../assets/helpers'


import BringBackTiles from './actions/BringBackTiles.vue'
import ShuffleTiles from './actions/ShuffleTiles.vue'
import StartNewGame from './actions/StartNewGame.vue'

const getRackTileId = (i: number) => `rack_${i}`

const playWord = () => {
  console.log(state.value)
}

const handleRackTileClick = (event: any, tile: RackTileInterface) => {
  const { rackTiles, selectedTile } = state.value

  // If a tile has already been selected
  if(selectedTile) {

    // Unstick the tile from the cursor and drop it back in the rack
    document.removeEventListener('mousemove', followCursor, true)
    const rackTileEl = document.getElementById(`rack_${selectedTile.rackIndex}`)
    if(rackTileEl) {
      rackTileEl.style.transform = 'none'

    }

    // Swap the clicked tile to be the selectedTile to the new tile being clicked on


    state.value = { ...state.value, rackTiles, selectedTile: null }

  } else {
    // Attach the tile to the cursor if there is no selectedTile
    state.value = {
      ...state.value,
      selectedTile: {
        boardIndex: tile.boardIndex,
        letter: tile.letter,
        rackIndex: tile.rackIndex
      }
    }
    document.addEventListener('mousemove', followCursor, true)
    event.initEvent('mousemove', followCursor, true)
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
  >
    <div
      class="GameRackTile"
      :class="{
        active: tile.rackIndex === state.selectedTile?.rackIndex,
        empty: state.rackTiles[index].letter === '',
        stickToCursor: state.selectedTile?.rackIndex === index,
      }"
      :id="getRackTileId(index)"
      @click="(event) => handleRackTileClick(event, tile)"
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