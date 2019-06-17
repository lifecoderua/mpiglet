import Box from "../src/parser/box";

const TYPES = {
  //moov: [0x6d, 0x6f, 0x6f, 0x76],
  moov: 0x6D6F6F76,
  moof: [0x6d, 0x6f, 0x6f, 0x66],
  mdat: [0x6d, 0x64, 0x61, 0x74],
};

describe('Box', () => {
  describe('#constructor', () => {
    test('should read regular size', () => {
      const fileBuffer = new ArrayBuffer(8);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 8);
      view.setUint32(4, TYPES.moov);

      const box = new Box(fileBuffer, 0);
      expect(box.length).toBe(8);
    });

    test('should read extended size', () => {

    });

    test('should setup EOF flag for to-the-end boxes', () => {

    });

    test('should read regular box type', () => {
      const fileBuffer = new ArrayBuffer(8);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 8);
      view.setUint32(4, TYPES.moov);


      const box = new Box(fileBuffer, 0);
      expect(box.type).toBe('moov');
    });

    test.skip('should read extended type - skip | not interested', () => {});
  });
});
