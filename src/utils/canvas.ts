// @ts-ignore
import { Canvas, fabric } from 'fabric';
import {
    allowedHeadingAreaHeight,
    allowedHeadingAreaWidth,
    canvasWidth,
    headingText,
    infoWhiteBoxRect,
} from './data';

export const hasCanvas = () => {
    // @ts-ignore
    if (window && window.canvasRefOuter && window.canvasRefOuter.current && typeof window.canvasRefOuter.current === 'object') {
        // @ts-ignore
        return true;
    }
    return false;
};

export const getCanvas = () => {
    // @ts-ignore
    if (hasCanvas()) {
        // console.log('getCanvas', window.canvasRefOuter.current);
        // @ts-ignore
        return window.canvasRefOuter.current;
    }
    return null;
};

export const disposeCanvas = () => {
    if (hasCanvas()) {
        // console.log('disposeCanvas disposeCanvas');
        // console.trace();
        // @ts-ignore
        window.canvasRefOuter.current.dispose();
        // @ts-ignore
        window.canvasRefOuter = {
            current: null
        };
    }
};

export const clearCanvas = () => {
    if (hasCanvas()) {
        // console.log('clearCanvas clearCanvas');
        // console.trace();
        // @ts-ignore
        window.canvasRefOuter.current.clear();
    }
};

export const setCanvas = (v:any) => {
    // console.log('setCanvas', v);
    if (hasCanvas() && v === null) {
        console.log('setCanvas disposeCanvas');
        disposeCanvas();
    }
    // @ts-ignore
    window.canvasRefOuter = {
        current: v
    };
};

export const getObjectById = (id:string) => {
    const hs = hasCanvas();
    if (hs) {
        const canvas = getCanvas();
        const filteredObjects = canvas.getObjects().filter((x:any) => x.data.id === id);
        if (filteredObjects.length > 0) {
            return filteredObjects[0];
        }
        return undefined;
    }
    return undefined;
}




export const bringToFront = (targetObj:any) => {
    const canvas = getCanvas();
    canvas.bringToFront(targetObj);
}


export const createRect = (rectOptions:any) => {
    const fabricCanvas = getCanvas();
    const rect = new fabric.Rect(rectOptions);
    fabricCanvas.add(rect);
    setCanvas(fabricCanvas);
}

export const createText = (textString: string, textOptions:any) => {
    const fabricCanvas = getCanvas();
    // @ts-ignore
    const text = new fabric.Text(textString, textOptions);
    const h1 = text.height as number;
    const w1 = text.width as number;
    if (text.data.id === 'title-text') {
        text.setOptions({
            top:  ((allowedHeadingAreaHeight - h1) / 2),
            left: ((allowedHeadingAreaWidth - w1) / 2)
        });
    }
    fabricCanvas.add(text);
    setCanvas(fabricCanvas);
}

export const initiateFabric = () => {
    let fabricCanvas: Canvas;

    // eslint-disable-next-line prefer-const
    fabricCanvas = new fabric.Canvas('canvas-preview', {
        enableRetinaScaling: false,
        selection: false
    });
    // @ts-ignore
    fabric.Control.prototype.touchSizeX = 100;
    fabric.Control.prototype.touchSizeY = 100;
    setCanvas(fabricCanvas);
    return fabricCanvas;
};

export const initiateCanvasRender = (): Promise<boolean> => {
    return new Promise((resolve) => {
        const fCan = getCanvas();
        if (fCan === null) {
            if (document.querySelectorAll('.canvas-container').length > 0) {
                console.error('not allowed', getCanvas());
            } else {
                initiateFabric();
                createRect(infoWhiteBoxRect);
                createText('Heading', headingText);
                resolve(true);
            }
        } else {
            // @ts-ignore
            getCanvas().setWidth(canvasWidth);
            // @ts-ignore
            getCanvas().setHeight(canvasWidth);
            resolve(false);
        }
    });
};

export const getFinalUrl = () => {
    return getCanvas().toDataURL({
        format: 'jpeg',
        quality: 1,
        multiplier: 10
    });
};

