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


  getImages: function(xmlPayload) {
    const images = [];

    const parser = new DOMParser();
    let DOM;
    try {
      DOM = parser.parseFromString(xmlPayload, "text/xml");
    } catch(err) {
      console.log('Error while parsing XML', err);
      return [];
    }
    const isInvalidXML = DOM.getElementsByTagName('parsererror').length;

    if (isInvalidXML) { return []; }

    const imageElements = DOM.getElementsByTagNameNS 
      ? DOM.getElementsByTagNameNS('http://www.smpte-ra.org/schemas/2052-1/2010/smpte-tt','image')
      : DOM.getElementsByTagName('smpte:image');

    // for (const elem of imageElements) {
    for (let i = 0; i<imageElements.length; i++) {
      const elem = imageElements[i];
      const encoding = elem.getAttribute('encoding');
      const type = elem.getAttribute('imagetype');

      if (encoding === 'Base64') {
        images.push('data:image/' + type + ';base64, ' + elem.textContent.trim());
      }
    }

    return images;
  },

  appendImages: function(imageSources) {
    imageSources.forEach(function(source) {
      const image = new Image();
      image.src = source;
      document.body.appendChild(image);
    })
  },
};

export default Utils;
