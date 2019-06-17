import Parser from "../src/parser/parser";

const TYPES = {
  moov: 0x6D6F6F76,
  moof: 0x6D6F6F66,
  mdat: 0x6D646174,
  ftyp: 0x66747970,
  pdin: 0x7064696E,
  mfhd: 0x6D666864,
  traf: 0x74726166,
  tfhd: 0x74666864,
};

describe('Parser', () => {
  describe('#parse', () => {
    test('should parse a single box', () => {
      const fileBuffer = new ArrayBuffer(8);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 8);
      view.setUint32(4, TYPES.moov);

      const boxes = Parser.parse(fileBuffer);

      expect(boxes.length).toEqual(1);
      expect(boxes[0].type).toEqual('moov');
    });

    test('should parse sequential boxes', () => {
      const fileBuffer = new ArrayBuffer(36);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 12);
      view.setUint32(4, TYPES.ftyp);

      view.setUint32(12, 12);
      view.setUint32(12+4, TYPES.pdin);

      view.setUint32(24, 12);
      view.setUint32(24+4, TYPES.mdat);

      const boxes = Parser.parse(fileBuffer);

      expect(boxes.length).toEqual(3);
      expect(boxes.map(box => box.type)).toEqual(['ftyp', 'pdin', 'mdat']);
    });

    test('should parse nested boxes', () => {
      const fileBuffer = new ArrayBuffer(36);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 36);
      view.setUint32(4, TYPES.moof);

      view.setUint32(8, 8);
      view.setUint32(8+4, TYPES.mfhd);

      view.setUint32(16, 20);
      view.setUint32(16+4, TYPES.traf);

      view.setUint32(24, 0);
      view.setUint32(24+4, TYPES.tfhd);

      const boxes = Parser.parse(fileBuffer);

      expect(boxes.length).toEqual(4);
      expect(boxes.map(box => box.type)).toEqual(['moof', 'mfhd', 'traf', 'tfhd']);
    });

    test('should parse combined box set', () => {
      const fileBuffer = new ArrayBuffer(48);
      const view = new DataView(fileBuffer);
      view.setUint32(0, 36);
      view.setUint32(4, TYPES.moof);

      view.setUint32(8, 8);
      view.setUint32(8+4, TYPES.mfhd);

      view.setUint32(16, 20);
      view.setUint32(16+4, TYPES.traf);

      view.setUint32(24, 12);
      view.setUint32(24+4, TYPES.tfhd);

      view.setUint32(36, 12);
      view.setUint32(36+4, TYPES.mdat);

      const boxes = Parser.parse(fileBuffer);

      expect(boxes.length).toEqual(5);
      expect(boxes.map(box => box.type)).toEqual(['moof', 'mfhd', 'traf', 'tfhd', 'mdat']);
    });
  });
});
