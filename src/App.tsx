import { useState, useEffect } from "react";
import "./App.css";
import { createGame } from "./util/create-game";
import { Card } from "./Card";
export type Entry = {
  x: number;
  y: number;
  value: string;
};

type PlayPicks = {
  first: Entry;
  second: Entry;
};

function App() {
  const [selected, setSelected] = useState<Partial<PlayPicks>>({});
  const [successfulSelections, setSuccessful] = useState<string[]>([]);
  const [game, setGame] = useState(createGame());
  const [loading, setLoading] = useState(false);
  const [moves, setMoves] = useState(0);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((status) => {
        if (status.active) {
          console.log("Service worker active");
        } else if (status.installing) {
          console.log("Service worker installing");
        } else {
          console.log("bruh");
        }
      });
    }
  }, []);
  useEffect(() => {
    if (selected.first && selected.second) {
      const check = checkPosition();
      if (check) {
        setSuccessful((prev) => [...prev, selected.first?.value!]);
        setSelected({});
      } else {
        setLoading(true);
        setTimeout(() => {
          setSelected({});
          setLoading(false);
        }, 1000);
      }
    }
  }, [selected]);

  const onSelect = (value: Entry) => {
    if (successfulSelections.includes(value.value)) return;
    if (selected.first?.x === value.x && selected.first?.y === value.y) return;
    if (selected.second?.x === value.x && selected.second.y === value.y) return;
    if (!selected.first) {
      setSelected((prev) => ({ ...prev, first: value }));
    } else {
      setSelected((prev) => ({ ...prev, second: value }));
      setMoves((prev) => prev + 1);
    }
  };

  const checkPosition = () => {
    return selected.first?.value === selected.second?.value;
  };

  const checkSelected = (y: number, x: number) => {
    const first = selected.first?.y === y && selected.first?.x === x;
    const second = selected.second?.y === y && selected.second?.x === x;
    return first || second;
  };

  const resetGame = () => {
    setSuccessful([]);
    setGame(createGame());
    setMoves(0);
  };

  return (
    <div className="App">
      <div>
        <p>Moves: {moves}</p>
        <button onClick={resetGame}>Reset</button>
      </div>
      <div className="game-wrapper">
        {game.map((position, yPosition) => {
          return (
            <div key={yPosition} className="game-row">
              {position.map((symbol, xPosition) => {
                const checked = successfulSelections.includes(symbol);
                const s = checkSelected(yPosition, xPosition);
                const entry = { value: symbol, x: xPosition, y: yPosition };
                return (
                  <Card
                    key={`${yPosition}-${xPosition}`}
                    complete={checked}
                    selected={s}
                    entry={entry}
                    onClick={!loading ? onSelect : undefined}
                  />
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
