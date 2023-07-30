export const defaultNoticeWidth = 324;

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


export const whiteReactBoxHeight = (defaultNoticeWidth / 2) - 10;
export const infoWhiteBoxRect = {
    data: {
        id: 'info-white-box'
    },
    left: 0,
    top: defaultNoticeWidth / 2,
    width: defaultNoticeWidth,
    height: whiteReactBoxHeight,
    strokeWidth: 0,
    stroke: 'white',
    fill: 'white',
    selectable: false,
};

export const allowedHeadingAreaWidth = (defaultNoticeWidth / 2) + (1 * (defaultNoticeWidth / 10));
