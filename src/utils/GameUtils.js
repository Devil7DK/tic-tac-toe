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
 * Get the winner of the game
 *
 * @param {string[]} values Array of 9 strings containing the values of the 3x3 grid
 *
 * @returns {"X" | "O" | false | null} The winner of the game or null if there is no winner yet
 */
export const getWinner = (values) => {
  return (
    ["X", "O"].find((player) => {
      return WinningCombinations.find((combination) => {
        return combination.every((index) => values[index] === player);
      });
    }) || null
  );
};

/**
 * Check if the game is a draw
 *
 * @param {string[]} values Array of 9 strings containing the values of the 3x3 grid
 *
 * @returns {boolean} True if the game is a draw, false otherwise
 */
export const isDraw = (values) => {
  return values.every((value) => value !== "");
};
