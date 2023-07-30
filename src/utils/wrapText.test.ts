import {
  createPossibleLinesMatrixToMax,
  createPossibleLines
} from './wrapText'
import { faker } from '@faker-js/faker';

const sentence = faker.lorem.sentences(1, "\n");
let sentenceArray = sentence.split("\n").filter((s:string) => s !== "").map(sentence => ({sentence}));
sentenceArray = [{sentence: 'This Is Best Design I Can Imagine Now So I Can Work'}]
// console.log('sentenceArray', sentenceArray);

// test.each(sentenceArray)('Test createPossibleLines', (sentenceObj:object) => {
//   // @ts-ignore
//   const { sentence } = sentenceObj;
//   const result = createPossibleLines(sentence, 3);
//   console.log('result', sentence, result);
//   expect(typeof result).toBe('object');
//   expect(Array.isArray(result)).toBe(true);
//   expect(result.length).toBe(sentence.split(" ").length);
// });



test.each(sentenceArray)('Test createPossibleLines', (sentenceObj:object) => {
  // @ts-ignore
  const { sentence } = sentenceObj;
  const result = createPossibleLinesMatrixToMax(sentence);
  console.log('result', sentence, result);
  expect(typeof result).toBe('object');
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(sentence.split(" ").length);
});




