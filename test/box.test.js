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

    test('should panic on extended size', () => {
      const fileBuffer = new ArrayBuffer(16);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 1);
      view.setUint32(4, TYPES.moov);
      view.setBigUint64(8, '1234');

      function createExtendedBox() {
        new Box(fileBuffer, 0);
      }
      expect(createExtendedBox).toThrowError('Extended size');
    });

    test('should return length for up-to-the-end boxes', () => {
      const fileBuffer = new ArrayBuffer(32);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 0);
      view.setUint32(4, TYPES.moov);

      const box = new Box(fileBuffer, 0);
      expect(box.length).toBe(32);
    });

    test('should return length up-to-the-end boxes | shifted', () => {
      const fileBuffer = new ArrayBuffer(32);
      const view = new DataView(fileBuffer);
      view.setUint32(8, 0);
      view.setUint32(12, TYPES.moov);

      const box = new Box(fileBuffer, 8);
      expect(box.length).toBe(24);
    });

    test('should read regular box type', () => {
      const fileBuffer = new ArrayBuffer(8);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 8);
      view.setUint32(4, TYPES.moov);


      const box = new Box(fileBuffer, 0);
      expect(box.type).toBe('moov');
    });

    test.skip('should return next box offset for node box', () => {

    });

    test.skip('should return inner box offset for container box', () => {

    });

    test.skip('should return box contents', () => {

    });

    test.skip('should read extended type - skip | not interested', () => {});
  });
});
