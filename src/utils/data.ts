export const canvasWidth = 225;

export const headingLeftPadding = 10;
export const headingText = {
    data: {
        id: 'title-text'
    },
    left: 10,
    top: 10,
    fontSize: 48,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    stroke: 'black',
    fill: 'black',
    selectable: false,
    textAlign: 'center', // Horizontal alignment
    verticalAlign: 'middle'
};



export const infoWhiteBoxRect = {
    data: {
        id: 'info-white-box'
    },
    left: 0,
    top: 0,
    width: canvasWidth,
    height: canvasWidth,
    strokeWidth: 0,
    stroke: 'white',
    fill: 'white',
    selectable: false,
};

export const whiteReactBoxHeight = canvasWidth - 20;
export const allowedHeadingAreaWidth = canvasWidth-20;
export const allowedHeadingAreaHeight = allowedHeadingAreaWidth;
