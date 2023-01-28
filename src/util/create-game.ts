const symbols = ["x", "y", "a", "z", "q", "m"];

export function createGame() {
  const doubles = [...symbols, ...symbols];
  const cardPositions: [string, string, string][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  const rows: Record<string, number> = {};
  symbols.forEach((symbol) => {
    rows[symbol] = 0;
  });
  for (let i = 0; i < cardPositions.length; i++) {
    const position = cardPositions[i];
    const newPosition = position.map(() => {
      const index = Math.floor(Math.random() * doubles.length);
      const randomSymbol = doubles[index];
      doubles.splice(index, 1);
      return randomSymbol;
    });
    cardPositions[i] = newPosition as [string, string, string];
  }
  return cardPositions;
}
