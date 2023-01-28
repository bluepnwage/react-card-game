import { test, expect } from "vitest";
import { createGame } from "./create-game";

test("returns an array", () => {
  const game = Array.isArray(createGame());
  expect(game).toBeTruthy();
});

test("has 4 rows", () => {
  let rows = 0;
  const game = createGame();
  game.forEach(() => (rows += 1));
  expect(rows).toBe(4);
});

test("each row has 3 items", () => {
  let hasThree = true;
  const game = createGame();
  game.forEach((row) => {
    if (row.length !== 3) hasThree = false;
  });
  expect(hasThree).toBeTruthy();
});
