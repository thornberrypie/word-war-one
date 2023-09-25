<script setup lang="ts">
import { state } from '@/main'
import { getFreshBoard, getFreshRack } from '../../assets/helpers'

const startNewGame = () => {
  state.value = {
    ...state.value,
    boardTiles: getFreshBoard(),
    rackTiles: getFreshRack(),
    selectedTile: null,
    totalTilesPlayed: 0,
  }
}
</script>

<template>
<button @click="startNewGame">Start New Game</button>
</template>