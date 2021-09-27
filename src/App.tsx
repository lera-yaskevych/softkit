import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './_normalize.scss';
import './App.scss';

export const App: React.FC = () => {
  const squares = [1, 2, 3, 4, 5, 6];
  const [selected, setSelected] = useState<number[]>([]);
  const [blueSquaresCount, setBlueSquaresCount] = useState(0);
  const [hasError, setError] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);

  useEffect(() => {
    setBlueSquaresCount(Math.floor(Math.random() * 3 + 1));
  }, []);

  const selectSquare = (value: number) => {
    setSelected([...selected, value]);
  };

  const unselectSquare = (value: number) => {
    setSelected(selected.filter(number => number !== value));
  };

  const clickHandler = (squareNo: number) => {
    if (!selected.includes(squareNo)) {
      selectSquare(squareNo);
    } else {
      unselectSquare(squareNo);
    }
  };

  const validate = () => {
    if (selected.some(number => number > blueSquaresCount)
        || selected.length > blueSquaresCount
        || !selected.length) {
      setError(true);
      setSuccessful(false);
    } else {
      setError(false);
      setSuccessful(true);

      setTimeout(() => {
        setSuccessful(false);
        setSelected([]);
        setBlueSquaresCount(Math.floor(Math.random() * 3 + 1));
      }, 1000);
    }
  };

  return (
    <div className="App">
      {squares.map(square => (
        <button
          type="button"
          className={classNames(`App__square App__square--${square}`, {
            'App__square--selected': selected.includes(square),
            'App__square--blue': square <= blueSquaresCount,
          })}
          key={square}
          onClick={() => clickHandler(square)}
        >
          {square}
        </button>
      ))}

      {hasError && (
        <p className="App__message App__message--error">
          Please, select blue squares only
        </p>
      )}

      {isSuccessful && (
        <p className="App__message App__message--success">
          Congrats! Input is valid.
        </p>
      )}

      <button
        type="submit"
        className="App__button"
        onClick={event => {
          event.preventDefault();
          validate();
        }}
      >
        Submit
      </button>
    </div>
  );
};
