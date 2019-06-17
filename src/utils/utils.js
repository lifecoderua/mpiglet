const Utils = {
  /**
   * Reads Utf8 string from byte array
   *
   * From: utf.js
   * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   *
   * @param bytes {Uint8Array}
   * @returns {String}
   */
  uintToString: function(bytes) {
    let out, i, len, c;
    let char2, char3;

    out = "";
    len = bytes.length;
    i = 0;
    while(i < len) {
      c = bytes[i++];
      switch(c >> 4)
      {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
        case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = bytes[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = bytes[i++];
          char3 = bytes[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  },

  isImage: function() {

  },

  appendImage: function() {

  },
};

export default Utils;
