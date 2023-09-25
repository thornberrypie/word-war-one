// Define number of rows and columns the board should have
const rowLength: number = 15
export const BoardLength: number = rowLength * rowLength

// Number of letters the player has at any one time
export const RackLength: number = 7

// Used for selecting a new random letter
export const BagOfLetters: string[] = [ // 98 in total (no blanks)
  'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a',
  'b', 'b',
  'c', 'c',
  'd', 'd', 'd', 'd',
  'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e',
  'f', 'f',
  'g', 'g', 'g',
  'h', 'h',
  'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i',
  'j',
  'k',
  'l', 'l', 'l', 'l',
  'm', 'm',
  'n', 'n', 'n', 'n', 'n', 'n',
  'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o',
  'p', 'p',
  'q',
  'r', 'r', 'r', 'r', 'r', 'r',
  's', 's', 's', 's',
  't', 't', 't', 't', 't', 't',
  'u', 'u', 'u', 'u',
  'v', 'v',
  'w', 'w',
  'x',
  'y', 'y',
  'z',
]