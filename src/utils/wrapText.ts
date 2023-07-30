import {canvasWidth, whiteReactBoxHeight, allowedHeadingAreaWidth, allowedHeadingAreaHeight} from './data';

let numberOfLines = 1;
let allowedNumberOfLines = 4;

export function splitText(text:string){
  return text.split(" ");
}

export function joinText(textArray:string[]){
  return textArray.join(" ");
}

export function splitArray(textArray:string[], position:number){
  var p1 = textArray.slice(0,position);
  var p2 = textArray.slice(position);
  return [joinText(p1),joinText(p2)];
}

export function createPossibleLines(text:string, linesAllowed: number):string[][]{
  const p = splitText(text);
  const wordLength = p.length;
  if (wordLength > 1 && linesAllowed > 1) {
    let stringArray = [] as string[][];
    let startAt = wordLength-1;
    while (startAt >= 1) {
      if (linesAllowed > 2) {
        const newSplitArray = splitArray(p, startAt);
        const lastString = newSplitArray[1];
        const firstString = newSplitArray[0];
        if (splitText(firstString).length >= linesAllowed - 1) {
          let firstStringArray = createPossibleLines(firstString, linesAllowed - 1);
          firstStringArray.map((s:string[]) => s.push(lastString));
          stringArray = [...stringArray, ...firstStringArray];
        }
      } else if ( linesAllowed === 2 ) {
        stringArray.push(splitArray(p, startAt));
      }
      startAt = startAt -1;
    }
    return stringArray;
  } else {
    return [[joinText(p)]];
  }
}

export const filterOutSomeLines = (text:string, returnArray:string[][][]):string[][][] => {
  const textLength = text.length;
  const wordLength = splitText(text).length;
  const t = wordLength > 6;
  const linesAllowed = Math.ceil(textLength / 12);
  //console.log('returnArray', returnArray);
  if (t && textLength > 20) {
    const newReturnArray = [] as string[][][];
    returnArray.forEach((linesArray:string[][]) => {
       let array1 = [] as string[][];
       linesArray.forEach((lines: string[]) => {
          if (lines.length >= linesAllowed && lines.length <= 5 ) {
            let needToUse = true;
            let maxNumbers = 0;
            let minNumbers = 0;
            const lineLength = lines.length;
            const balanceWordsLengthInLine = Math.ceil(wordLength / lineLength);
            const balanceCharsLengthInLine = Math.ceil(textLength / lineLength);
            let linesBelowBalancedWordsLength = 0 ;
            let linesBelowBalancedCharLength = 0 ;
            let linesAboveBalancedWordsLength = 0 ;
            let linesAboveBalancedCharLength = 0 ;
            lines.forEach((l:string, index:number) => {
              const wLength = splitText(l).length;
              const charLength = l.length;
              if (index < Math.floor(lineLength/2)) {
                if (charLength < balanceCharsLengthInLine) {
                  needToUse = false;
                }
              }
              if (wLength > 5 && needToUse) {
                needToUse = false;
              }
              if (index === 0) {
                minNumbers = wLength;
                maxNumbers = wLength;
              }
              if (needToUse) {
                if (wLength < balanceWordsLengthInLine) {
                  linesBelowBalancedWordsLength++;
                } else {
                  linesAboveBalancedWordsLength++;
                }
                if (charLength < balanceCharsLengthInLine) {
                  linesBelowBalancedCharLength++;
                } else {
                  linesAboveBalancedCharLength++;
                }
              }
            });
            if (needToUse) {
              if ( linesBelowBalancedWordsLength/lineLength > 0.5  ) {
                needToUse = false;
              }
              if ( linesBelowBalancedCharLength/lineLength > 0.5  ) {
                needToUse = false;
              }
              if ( linesAboveBalancedWordsLength/lineLength < 0.20  ) {
                needToUse = false;
              }
              if ( linesAboveBalancedCharLength/lineLength < 0.20  ) {
                needToUse = false;
              }
            }
            if (needToUse) {
              array1.push(lines);
            }
          }
        });
        if (array1.length > 0) {
          newReturnArray.push(array1);
        }
    });
    //console.log('new returnArray', newReturnArray);
    return newReturnArray;
  }
  return returnArray;
}

export function createPossibleLinesMatrixToMax(text:string):string[][][]{
  const cleanText = text.trim();
  const p = splitText(cleanText);
  let maxLinesCanBe = p.length;
  let returnArray = [];
  while(maxLinesCanBe > 0){
    returnArray.push(createPossibleLines(text, maxLinesCanBe));
    maxLinesCanBe = maxLinesCanBe - 1;
  }
  return filterOutSomeLines(cleanText, returnArray);
}

export const applyScoreToFontSize = (fontSize:number) => {
  if (fontSize >= 40 ) {
    return (20 + ((fontSize-40)/10));
  } else if (fontSize >= 30) {
    return (5 + ((fontSize-30)/10));
  }
  return 2.5;
}

export const getObjectWithCorrectFontSize = (obj:any, p:string[], fontSize: number = 48, scoreFactor: number):number => {
  obj.setOptions({
    text: p.join("\n"),
    fontSize,
  });
  const h1 = obj.height as number;
  const w1 = obj.width as number;
  const topPadding = 10;
  const leftPadding = 10;
  const newLeft = (allowedHeadingAreaWidth - w1) / 2;
  const newTop = (allowedHeadingAreaHeight - h1) / 2;

  const a1 = newLeft < 10;
  const b1 = newTop < 10;

  // console.log('obj in else', w1, h1, newLeft, newTop, fontSize, p);
  obj.setOptions({
    top: topPadding + newTop,
    left: leftPadding + newLeft
  });
  if (a1 || b1) {
    //console.log('obj did not pass throw error', 'left', a1, 'top', b1);
    return 0;
  }
  const sc4 = applyScoreToFontSize(fontSize);
  return sc4;
}

const minimumOfAll = function(arr:number[]){
  let minimum = 0;
  arr.forEach((item:number, index:number) => {
    if (index === 0) {
      minimum = item;
    }
    if (item < minimum) {
      minimum = item;
    }
  });
  return minimum;
};

export function getScoreFactor2(linesArray:string[][], charLength:number) : number[] {
  const bestOne = charLength/linesArray[0].length;
  const scoreArray:number[] = [];
  linesArray.forEach((lines:string[]) => {
    let multiplier = 1;
    lines.forEach((s:string) => {
      multiplier = multiplier * Math.abs(s.length - bestOne);
    });
    scoreArray.push(multiplier);
  });
  const min = minimumOfAll(scoreArray);
  return scoreArray.map((s:number) => s === min ? 4 : 2 );
}

export function wrapTextFs(obj: object|any, possibleLinesMatrix:string[][][], fs: number, scoreFactor: number, charLength: number, cleanText:string){
  let scroreArray:any = {} ;
  let {index: lastWorkedIndex, index1: lastWorkedIndex2, lastWorkedArray} = getTextUsed(cleanText);
  possibleLinesMatrix.forEach((linesArray:string[][], index:number) => {
    const gs2 = getScoreFactor2(linesArray, charLength);
    linesArray.forEach((lines:string[], index1:number) => {
      if (
          ( lines.length - lastWorkedArray.length <= 3) &&
          ( lastWorkedIndex2 === 0 ||
              (Math.abs(lastWorkedIndex2-index1) <=  Math.ceil(linesArray.length / 1.2) ) )
      ) {
        const sc1 = lines.length === scoreFactor ? 2 : 1 ;
        const sc2 = gs2[index];
        const result = getObjectWithCorrectFontSize(obj, lines, fs, (sc2 + sc1));
        //console.log('wrapTextFs', result);
        if (result > 0 ) {
          if (!scroreArray[index]) {
            scroreArray[index] = {}
          }
          scroreArray[index][index1] = result;
        }
      } else {
         //console.log('2: index excluded', lines, Math.abs(lastWorkedIndex2-index1), index, index1);
      }
    });
  });
  return scroreArray;
}


// @ts-ignore
window.smartRemember = {
  text: "",
  perfectFontSize: 48,
  index: 0,
  index1: 0,
  lastWorkedArray: [],
};

const getSmartRemember = ():any => {
  // @ts-ignore
  return window.smartRemember;
}

const resetSmartRemember = ():any => {
  // @ts-ignore
  return window.smartRemember = {
    text: "",
    perfectFontSize: 48,
    index: 0,
    index1: 0,
    lastWorkedArray: []
  };
}

const setSmartRemember = (newObj:object) => {
  //console.log('setSmartRemember', newObj);
  // @ts-ignore
  window.smartRemember = newObj;
}

export const getTextUsed = (text:string) => {
   const {
     text:oldText
   } = getSmartRemember();
   if (text.includes(oldText) || oldText.includes(text)) {
     return getSmartRemember();
   }
   return resetSmartRemember();
}


export function wrapText(obj: object|any, text:string){
  const cleanText = text.trim();
  let returnValue = true;
  const charLength = cleanText.replaceAll(" ","").length;
  const possibleLinesMatrix = createPossibleLinesMatrixToMax(cleanText);
  //console.log('possibleLinesMatrix', possibleLinesMatrix);
  const scoreFactor = Math.ceil(possibleLinesMatrix.length / 2);
  let {perfectFontSize: fs, lastWorkedArray: lastLines} = getTextUsed(cleanText);
  let scroreArray:any = {} ;
  let passed = false;
  if (fs < 30) {
    fs = 30
  }
  //console.log('getTextUsed', fs);
  while(fs >= 22 && !passed){
    const r = wrapTextFs(obj, possibleLinesMatrix, fs, scoreFactor, charLength, cleanText);
    if (Object.keys(r).length > 0) {
      scroreArray[fs] = r;
      passed = true;
    }
    if (fs === 22) {
      passed = true;
    }
    fs = fs-1;
  }
  if (Object.keys(scroreArray).length === 0 || !returnValue) {
    //console.log('298', scroreArray)
    returnValue = false;
  } else {
    returnValue = true
  }
  console.log('scroreArray', scroreArray);

  let biggestScore = 0 ;
  let biggestScoreCombo = "" ;
  let l: string[] = [];
  let perfectFs = 22;
  Object.keys(scroreArray).forEach((fsCurrentIndex:string) => {
     const scoreFactorByFs = scroreArray[fsCurrentIndex];
      Object.keys(scoreFactorByFs).forEach((index:string) => {
        Object.keys(scoreFactorByFs[index]).forEach((index2:string) => {
         const scrore = scoreFactorByFs[index][index2];
         if (scrore > biggestScore) {
           biggestScoreCombo = fsCurrentIndex+"_"+index+"_"+index2;
           biggestScore = scrore;
           perfectFs = Number(fsCurrentIndex);
           l = possibleLinesMatrix[Number(index)][Number(index2)];
           // console.log("scroreArray", scroreArray, perfectFs, l, cleanText.length, index, index2);
           setSmartRemember({
             text: cleanText,
             perfectFontSize: fs,
             index: Number(index),
             index1: Number(index2),
             lastWorkedArray: l
           });
         }
        })
      })
  });

  if (!returnValue && cleanText !== "" && lastLines.length > 0) {
    getObjectWithCorrectFontSize(obj, lastLines, perfectFs, 1);
  } else {
    getObjectWithCorrectFontSize(obj, l, perfectFs, 1);
  }
 return returnValue;
}
