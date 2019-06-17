import Box from "./box";

const Parser = {
  /**
   * Parse incoming buffer into MPEG-4 Boxes array
   *
   * @param fileBuffer {ArrayBuffer}
   * @returns {[Box]} Box array
   */
  parse: function(fileBuffer) {
    const boxes = [];
    const fileLength = fileBuffer.byteLength;
    let cursor = 0;

    while (cursor < fileLength) {
      const box = new Box(fileBuffer, cursor);
      boxes.push(box);
      cursor = box.getNextBoxOffset();
    }

    return boxes;
  },
};

export default Parser;


