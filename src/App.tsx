import { useState, useEffect } from "react";
import "./App.css";
import { createGame } from "./util/create-game";
const game = createGame();

type PlayPicks = {
  first: string;
  second: string;
};

function App() {
  const [selected, setSelected] = useState<Partial<PlayPicks>>({});
  useEffect(() => {
    if (selected.first && selected.second) {
      const check = checkPosition();
      if (check) {
        alert("nice");
      } else {
        alert("bruh");
      }
      setSelected({});
      return;
    }
  }, [selected]);

  const onSelect = (value: string) => {
    if (!selected.first) {
      setSelected((prev) => ({ ...prev, first: value }));
    } else {
      setSelected((prev) => ({ ...prev, second: value }));
    }
  };

  const checkPosition = () => {
    return selected.first === selected.second;
  };

  return (
    <div className="App">
      <div className="game-wrapper">
        {game.map((position, yPosition) => {
          return (
            <div key={yPosition} className="game-container">
              {position.map((symbol, xPosition) => {
                return (
                  <div onClick={() => onSelect(symbol)} className="game-card" key={xPosition}>
                    {symbol}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
