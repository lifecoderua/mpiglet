import Utils from "../src/utils/utils";

describe('Utils', () => {
  describe('#uintToString', () => {
    it('should convert simple characters', () => {
      const input = new Uint8Array(4);
      input[0] = 0x41;
      input[1] = 0x68;
      input[2] = 0x65;
      input[3] = 0x6D;

      expect(Utils.uintToString(input)).toEqual('Ahem');
    });

    it('should convert multibyte characters', () => {
      const input = new Uint8Array(3);
      input[0] = 0xe2;
      input[1] = 0x82;
      input[2] = 0xac;

      expect(Utils.uintToString(input)).toEqual('€');
    })
  });
});
