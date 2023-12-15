import { state } from '@/main'
import { BagOfLetters, BoardLength, RackLength } from './constants'

export const detachTileFromCursor = (rackIndex:number|null, killListener:boolean = true) => {
  const tileElement: HTMLElement | null = document.querySelector(`#rack_${rackIndex}`)
  if(tileElement) {
    tileElement.style.transform = 'none'
  }
  if(killListener) {
    document.removeEventListener('mousemove', followCursor, true)
  }
}

// Pick a random letter from a full bag
export const getRandomLetter = () => BagOfLetters[Math.floor(Math.random()*BagOfLetters.length)]

// Generate a new tile that can be placed in the rack or on the board
export const getEmptyTile = () => ({ boardIndex: null, letter: '', rackIndex: null })

// Build array of board squares to hold the tiles
export const getFreshBoard = () => {
  const board = []
  for ( let i = 0; i < BoardLength; i++ ) {
    board.push({ ...getEmptyTile(), boardIndex: i })
  }
  return board
}

// Build array of random tiles for the player rack
export const getFreshRack = () => {
  const rack = []
  for ( let i = 0; i < RackLength; i++ ) {
    rack.push({
      boardIndex: null,
      letter: getRandomLetter(),
      rackIndex: i,
    })
  }
  return rack
}

// Called when a tile is clicked so we can move it around
export const followCursor = (event: any) => {
  const { selectedTile } = state.value
  if(!selectedTile) {
    return
  }
  const tileSelector: string = `#rack_${selectedTile.rackIndex}`
  const rackTile: HTMLInputElement | null = document.querySelector(tileSelector)
  if(rackTile) {
    const eventX = event ? event.clientX - rackTile.offsetLeft : rackTile.offsetLeft
    const eventY = event ? event.clientY - rackTile.offsetTop : rackTile.offsetTop

    const xValue = eventX - 10
    const yValue = eventY - 40
    rackTile.style.transform = `translateX(${xValue}px)`
    rackTile.style.transform += `translateY(${yValue}px)`
  }        
}