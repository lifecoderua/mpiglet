import Parser from "../src/parser/parser";

test('Parser.parse should return passed data back', () => {
  expect(Parser.parse([1,2,3])).toEqual([1,2,3]);
});
