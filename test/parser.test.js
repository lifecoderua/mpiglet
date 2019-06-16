import Parser from "../src/parser/parser";

xdescribe('Parser', () => {
  test('#parse should return passed data back', () => {
    expect(Parser.parse([1,2,3])).toEqual([1,2,3]);
  });

  describe('#parseBox', () => {
    test('should return regular box length', () => {
      const buffer = '';
      const offset = 0;

      expect(Parser.parseBox()).toEqual(8);
    });
  })
});
