import Utils from "../src/utils/utils";

describe('Utils', () => {
  describe('#uintToString', () => {
    test('should convert simple characters', () => {
      const input = new Uint8Array(4);
      input[0] = 0x41;
      input[1] = 0x68;
      input[2] = 0x65;
      input[3] = 0x6D;

      expect(Utils.uintToString(input)).toEqual('Ahem');
    });

    test('should convert multibyte characters', () => {
      const input = new Uint8Array(3);
      input[0] = 0xe2;
      input[1] = 0x82;
      input[2] = 0xac;

      expect(Utils.uintToString(input)).toEqual('€');
    });

    test('should read combined strings', () => {
      const input = new Uint8Array(5);
      input[0] = 0x65;
      input[1] = 0xe2;
      input[2] = 0x82;
      input[3] = 0xac;
      input[4] = 0x6D;

      expect(Utils.uintToString(input)).toEqual('e€m');
    })
  });

  describe('#getImages', () => {
    test('should return [] for non-xml docs', () => {
      const payload = 'I am a random string';

      expect(Utils.getImages(payload)).toEqual([]);
    });

    test('should return [] if no smpte:images tag found', () => {
      const payload = '<?xml prop="val"?><tt></tt>';

      expect(Utils.getImages(payload)).toEqual([]);
    });

    test('should return [] if smpte:images tag is not Base64', () => {
      const payload = `<?xml version="1.0" encoding="UTF-8"?>
        <tt xmlns:smpte="http://www.smpte-ra.org/schemas/2052-1/2010/smpte-tt" >
        <head>
          <metadata>
            <smpte:image xml:id="image001" imagetype="PNG" encoding="Base007">
              IamImage_Honestly
            </smpte:image>
            <sometag></sometag>
          </metadata>
        </head> 
        <body></body>
      </tt>`;

      expect(Utils.getImages(payload)).toEqual([]);
    });

    test('should return an array of applicable smpte:images', () => {
      const payload = `<?xml version="1.0" encoding="UTF-8"?>
        <tt xmlns:smpte="http://www.smpte-ra.org/schemas/2052-1/2010/smpte-tt" >
        <head>
          <metadata>
            <smpte:image xml:id="image001" imagetype="PNG" encoding="Base64">
              IamImage_Honestly
            </smpte:image>
            <sometag></sometag>
          </metadata>
        </head> 
        <body></body>
      </tt>`;

      expect(Utils.getImages(payload)).toEqual(['data:image/PNG;base64, IamImage_Honestly']);
    });

    test('should return an array of applicable smpte:images | multiple images', () => {
      const payload = `<?xml version="1.0" encoding="UTF-8"?>
        <tt xmlns:smpte="http://www.smpte-ra.org/schemas/2052-1/2010/smpte-tt" >
        <head>
          <metadata>
            <smpte:image xml:id="image001" imagetype="PNG" encoding="Base64">
              IamImage_Honestly
            </smpte:image>
            <sometag></sometag>
            <smpte:image xml:id="image002" imagetype="PNG" encoding="Base64">
              IamImage_numer2_Honestly
            </smpte:image>
          </metadata>
        </head> 
        <body></body>
      </tt>`;

      expect(Utils.getImages(payload)).toEqual(['data:image/PNG;base64, IamImage_Honestly', 'data:image/PNG;base64, IamImage_numer2_Honestly']);
    });
  });
});
