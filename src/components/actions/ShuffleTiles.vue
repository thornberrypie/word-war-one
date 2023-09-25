<script setup lang="ts">
import { state } from '@/main'

function shuffleTiles() {
  const { rackTiles } = state.value
  let currentIndex = rackTiles.length, randomIndex: number

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [rackTiles[currentIndex], rackTiles[randomIndex]] = [
    rackTiles[randomIndex], rackTiles[currentIndex]];
  }

  state.value = { ...state.value, rackTiles }
}
</script>

<template>
  <button @click="shuffleTiles">
    <font-awesome-icon icon="fa-solid fa-refresh" />
    &nbsp;Shuffle Tiles&nbsp;
    <font-awesome-icon icon="fa-solid fa-refresh" />
  </button>
</template>