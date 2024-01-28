/**
 * @typedef {[number, number, number]} Combination
 *
 * @typedef Result
 *
 * @property {boolean} isDraw Whether the game is a draw
 * @property {"X" | "O" | null} winner Winner of the game
 * @property {Combination?} winningCombination Winning combination of the game
 * @property {string[]?} values Values of the 3x3 grid as an array of 9 strings
 */

/**
 * @type {Combination[]}
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
 * @type {number[]} Corners of the 3x3 grid
 */
const Corners = [0, 2, 6, 8];

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

  // Check if all the values are filled or all the winning combinations are unavailable
  const isDraw =
    values.every((value) => value !== "") ||
    WinningCombinations.every((combination) => {
      const filledValues = combination.map((value) => values[value]);

      return filledValues.includes("X") && filledValues.includes("O");
    });

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

/**
 * Sort the combinations to keep corner combinations first
 *
 * @param {Combination} a A combination
 * @param {Combination} b Another combination
 *
 * @returns {number} The difference between the number of corners in the combinations
 */
const sortByCorners = (a, b) => {
  const aCornerCount = a.filter((value) => Corners.includes(value)).length;
  const bCornerCount = b.filter((value) => Corners.includes(value)).length;

  return bCornerCount - aCornerCount;
};

/**
 * Returns a function to sort the combinations in descending order of the number of player's moves in the combination
 *
 * @param {"X" | "O"} playerTurn The player's turn
 *
 * @returns {(a: Combination, b: Combination) => number} A function to sort the combinations in descending order of the number of player's moves in the combination
 */
const sortByCount = (values, playerTurn) => (a, b) => {
  const aPlayerCount = a.filter((value) => values[value] === playerTurn).length;
  const bPlayerCount = b.filter((value) => values[value] === playerTurn).length;

  return bPlayerCount - aPlayerCount;
};

/**
 * Get an available position in the combination
 *
 * @param {string[]} values Array of 9 strings containing the values of the 3x3 grid
 * @param {Combination} combination A combination from which the available position is to be returned
 *
 * @returns {number} An available position in the combination
 */
const returnCombination = (values, combination) => {
  const [a, b, c] = combination;

  if (!values[a]) {
    return a;
  }

  if (!values[b]) {
    return b;
  }

  if (!values[c]) {
    return c;
  }

  return null;
};

/**
 * Get the next move of the computer.
 *
 * First it will check whether the computer can win in the next move, if so, it will fill the winning combination.
 * Then it will check whether the center is empty, if so, it will fill the center.
 * Then it will check whether the player's last move is one of the winning combinations, if so, it will block the player.
 * Then it will check wither player has filled any of the winning combinations, if so, it will fill the winning combination.
 * If none of the above conditions are met, it will try to fill any of the available winning combinations.
 * If no such combination is found or unavailable, it will try to fill any of the corners, if they are empty.
 * Otherwise, it will fill any of the remaining positions.
 *
 * @param {string[]} values Values of the 3x3 grid as an array of 9 strings
 * @param {"X" | "O"} playerTurn The player's turn
 * @param {number} playerLastMove The player's last move
 *
 * @returns {number} The next move of the computer
 */
export const getNextMove = (values, playerTurn, playerLastMove) => {
  const computerTurn = playerTurn === "X" ? "O" : "X";

  const winningCombinationForComputer = WinningCombinations.find(
    (combination) =>
      combination.filter((value) => values[value] === computerTurn).length ===
        2 && !combination.some((value) => values[value] === playerTurn)
  );

  if (!values[4]) {
    return 4;
  }

  if (winningCombinationForComputer) {
    return returnCombination(values, winningCombinationForComputer);
  }

  const winningCombinationsWithPlayerLastMove = WinningCombinations.filter(
    (combination) =>
      combination.includes(playerLastMove) &&
      !combination.some((value) => values[value] === computerTurn)
  )
    .sort(sortByCorners)
    .sort(sortByCount(values, playerTurn));

  if (winningCombinationsWithPlayerLastMove.length) {
    return returnCombination(values, winningCombinationsWithPlayerLastMove[0]);
  }

  const winningCombinationsWithPlayer = WinningCombinations.filter(
    (combination) =>
      combination.some((value) => values[value] === playerTurn) &&
      !combination.some((value) => values[value] === computerTurn)
  )
    .sort(sortByCorners)
    .sort(sortByCount(values, playerTurn));

  if (winningCombinationsWithPlayer.length) {
    return returnCombination(values, winningCombinationsWithPlayer[0]);
  }

  const winningCombinationsWithComputer = WinningCombinations.filter(
    (combination) => combination.some((value) => values[value] === computerTurn)
  )
    .sort(sortByCorners)
    .sort(sortByCount(values, computerTurn));

  if (winningCombinationsWithComputer.length) {
    return returnCombination(values, winningCombinationsWithComputer[0]);
  }

  const emptyCorners = Corners.filter((corner) => !values[corner]);

  if (emptyCorners.length) {
    return emptyCorners[0];
  }

  const remaining = [1, 3, 5, 7];

  const emptyRemaining = remaining.filter((remaining) => !values[remaining]);

  if (emptyRemaining.length) {
    return emptyRemaining[0];
  }
};
