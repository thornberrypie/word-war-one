
import { createApp } from 'vue'
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBomb, faArrowDown, faExplosion, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { getFreshBoard, getFreshRack } from './assets/helpers'
import { type StateInterface } from './assets/interfaces'
import App from './App.vue'
import './assets/style/main.sass'

// Set the initial state
const initialState: StateInterface = {
  boardTiles: getFreshBoard(),
  rackTiles: getFreshRack(),
  selectedTile: null,
  totalTilesPlayed: 0,
}

// Export the initial state
export const state = ref(initialState)

// Add fontawesome icons
library.add(faBomb, faArrowDown, faExplosion, faRefresh)

// Create and mount the app
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
