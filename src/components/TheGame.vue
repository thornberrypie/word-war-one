<script setup lang="ts">
import { state } from '@/main'
import GameBoard from './GameBoard.vue'
import GameMessages from './GameMessages.vue'
import GameRack from './GameRack.vue'
</script>

<template>
  <div class="TheGame" :class="{ tileIsSelected: !!state.selectedTile }">
    <GameMessages />
    <div class="theGameMain">
      <GameBoard />
      <GameRack />
    </div>
  </div>
</template>
