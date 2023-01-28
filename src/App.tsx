import { useState, useEffect } from "react";
import "./App.css";
import { createGame } from "./util/create-game";
const game = createGame();

type Entry = {
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
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (successfulSelections.length === 6) alert("Game completed!!");
  }, [successfulSelections]);

  const onSelect = (value: Entry) => {
    if (!selected.first) {
      setSelected((prev) => ({ ...prev, first: value }));
    } else {
      setSelected((prev) => ({ ...prev, second: value }));
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

  return (
    <div className="App">
      <div className="game-wrapper">
        {game.map((position, yPosition) => {
          return (
            <div key={yPosition} className="game-row">
              {position.map((symbol, xPosition) => {
                const checked = successfulSelections.includes(symbol);
                const s = checkSelected(yPosition, xPosition);
                return (
                  <div
                    onClick={!loading ? () => onSelect({ value: symbol, x: xPosition, y: yPosition }) : undefined}
                    className="game-card"
                    data-complete={checked}
                    key={xPosition}
                  >
                    {s ? symbol : checked ? symbol : null}
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
