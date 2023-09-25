<script setup lang="ts">
import { state } from '@/main'

const { totalTilesPlayed } = state.value
</script>

<template>
<div class="GameMessages">
  <h1>Word War One!</h1>
  <p>A single-player explosive word game <font-awesome-icon icon="fa-solid fa-explosion" /></p>
  <p>Conquer 75% of the board to win!</p>
  <div v-if="totalTilesPlayed === 0">
    <p>To play:</p>
    <ul>
      <li>Click on a letter then click the square you want to place it on</li>
      <li>Join more letters on to make a word then click Play Word</li>
      <li>Words can be placed left to right horizontally or top to bottom vertically. No diagonal words.</li>
      <li>Be careful of land mines and look out for enemy attack <font-awesome-icon icon="fa-solid fa-bomb" /></li>
    </ul>
  </div>
</div>
</template>