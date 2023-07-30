import React from 'react';
import './App.css';
import {canvasWidth} from './utils/data';
import CanvasInitiation from './components/CanvasInitiation';
import CanvasHeading from './components/CanvasHeading';

function App() {
  return (
    <div className="App">
      <div className={"w-screen h-screen bg-red-100 flex justify-center items-center"}>
          <div className="canvas-border flex flex-col gap-2 justify-center items-center" >
              <canvas
                  id="canvas-preview"
                  width={canvasWidth}
                  height={canvasWidth}
                  className={`cursor-not-allowed mb-4 `}
              />
              <CanvasInitiation />
              <CanvasHeading />
          </div>
      </div>
    </div>
  );
}

export default App;
