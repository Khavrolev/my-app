import { useEffect, useRef, useState } from "react";
import "./App.css";

const STEP = 25;

const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

function App() {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const parentRectangle = useRef(null);
  const childRectangle = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  function handleKeyDown(event) {
    if (!parentRectangle || !childRectangle) {
      return;
    }

    const parentCoordinates = parentRectangle.current.getBoundingClientRect();
    const childCoordinates = childRectangle.current.getBoundingClientRect();

    switch (event.keyCode) {
      case keys.left:
        setLeft((left) => Math.max(left - STEP, 0));
        return;
      case keys.up:
        setTop((top) => Math.max(top - STEP, 0));
        return;
      case keys.right:
        setLeft((left) =>
          Math.min(
            left + STEP,
            parentCoordinates.width - childCoordinates.width
          )
        );
        return;
      case keys.down:
        setTop((top) =>
          Math.min(
            top + STEP,
            parentCoordinates.height - childCoordinates.height
          )
        );
        return;
      default:
        return;
    }
  }

  return (
    <div className="main-rectangle" ref={parentRectangle}>
      <div
        className="secondary-rectangle"
        style={{ top, left }}
        ref={childRectangle}
      />
    </div>
  );
}

export default App;
