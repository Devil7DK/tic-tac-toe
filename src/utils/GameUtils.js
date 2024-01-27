/**
 * @typedef {[number, number, number]} WinningCombination
 *
 * @typedef Result
 *
 * @property {boolean} isDraw Whether the game is a draw
 * @property {"X" | "O" | null} winner Winner of the game
 * @property {WinningCombination?} winningCombination Winning combination of the game
 * @property {string[]} values Values of the 3x3 grid as an array of 9 strings
 */

/**
 * @type {WinningCombination[]}
 */
const WinningCombinations = [
  /**
   * [X, X, X]
   * [?, ?, ?]
   * [?, ?, ?]
   */
  [0, 1, 2],
  /**
   * [?, ?, ?]
   * [X, X, X]
   * [?, ?, ?]
   */
  [3, 4, 5],
  /**
   * [?, ?, ?]
   * [?, ?, ?]
   * [X, X, X]
   */
  [6, 7, 8],
  /**
   * [X, ?, ?]
   * [X, ?, ?]
   * [X, ?, ?]
   */
  [0, 3, 6],
  /**
   * [?, X, ?]
   * [?, X, ?]
   * [?, X, ?]
   */
  [1, 4, 7],
  /**
   * [?, ?, X]
   * [?, ?, X]
   * [?, ?, X]
   */
  [2, 5, 8],
  /**
   * [X, ?, ?]
   * [?, X, ?]
   * [?, ?, X]
   */
  [0, 4, 8],
  /**
   * [?, ?, X]
   * [?, X, ?]
   * [X, ?, ?]
   */
  [2, 4, 6],
];

/**
 * Get the result of the game
 *
 * @param {string[]} values Values of the 3x3 grid as an array of 9 strings
 *
 * @returns {Result} Result of the game
 */
export const getResult = (values) => {
  const winningCombination = WinningCombinations.find((combination) => {
    const [a, b, c] = combination;

    return values[a] && values[a] === values[b] && values[a] === values[c];
  });

  if (winningCombination) {
    const [a] = winningCombination;

    return {
      isDraw: false,
      winner: values[a],
      winningCombination,
      values,
    };
  }

  const isDraw = values.every((value) => value !== "");

  return {
    isDraw,
    winner: null,
    winningCombination: null,
    values,
  };
};

/**
 * Get x and y coordinates of the 3x3 grid from the index
 *
 * @param {number} index Index of array of 9 strings containing the values of the 3x3 grid
 *
 * @returns {{x: number, y: number}} x and y coordinates of the 3x3 grid
 */
export const getXYFromIndex = (index) => {
  return {
    x: index % 3,
    y: Math.floor(index / 3),
  };
};
