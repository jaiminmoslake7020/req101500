import React, {useEffect, useState, useCallback} from 'react';
// @ts-ignore
import {Canvas, fabric} from 'fabric';
import {
  initiateCanvasRender
} from '../utils/canvas';

function CanvasInitiation() {
  const [canavasRenderingLock, setCanavasRenderingLock] = useState<boolean>(false);
  const [canvasInitiated, setCanvasInitiated] = useState<boolean>(false);

  let oneTimeOnly = false;
  useEffect(() => {
    if (!oneTimeOnly && !canvasInitiated) {
      oneTimeOnly = true;
      setCanvasInitiated(true);
    }
  }, []);

  const initiateRenderCanvas = useCallback(() => {
    setCanavasRenderingLock(true);
    initiateCanvasRender().then((canvasInitiatedArg:boolean) => {
      if (canvasInitiatedArg) {
        setCanvasInitiated(true);
      } else {
        // console.log('no initiation required');
      }
    });
  }, [
    initiateCanvasRender,
  ]);

  let allow = true;
  useEffect(() => {
    const mount = () => {
      if (allow && !canavasRenderingLock) {
        allow = false;
        initiateRenderCanvas();
      }
    }
    return mount();
  }, [canavasRenderingLock, initiateRenderCanvas]);

  return (
    <div id="canvas-initiation" />
  );
}

CanvasInitiation.defaultProps = {

};

export default CanvasInitiation;
