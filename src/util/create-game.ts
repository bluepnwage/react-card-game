const symbols = ["1164609-sm", "1168620-sm", "1293302-sm", "315305-sm", "7298913-sm", "966314-sm"];

export function createGame() {
  const doubles = [...symbols, ...symbols];
  const cardPositions: [string, string, string][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

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
