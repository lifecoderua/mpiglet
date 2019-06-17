/**
 * Read MPEG-4 Box by offset
 *
 * @param buffer
 * @param offset
 * @constructor
 */
import Utils from "../utils/utils";

const TYPE_OFFSET = 4;
const EXTENDED_LENGTH_OFFSET = 8;
const FIELD_LENGTH = 4;
const EXTENDED_FIELD_LENGTH = 8;


function Box(buffer, offset) {
  this.buffer = buffer;
  this.offset = offset;

  const view = new DataView(buffer, offset);

  const lengthData = getLength(view);
  this.length = lengthData.length;
  this.contentOffset = lengthData.contentOffset;
  this.type = getType(view);
  this.nextBoxOffset = getNextBoxOffset(view);
}

Box.prototype.getContents = function() {

};

function getLength(view) {
  let contentOffset = 8;
  let length = view.getUint32(0);

  // extended size
  if (length === 1) {
    contentOffset = 16;
    // TODO: Uint64 have limited support. Implementing it within zero polyfills concept is impractical.
    throw new Error('Extended size encountered but is not supported');
  }

  // up to EOF
  if (length === 0) {
    length = view.buffer.byteLength - view.byteOffset;
  }

  return {
    length: length,
    contentOffset: contentOffset,
  };
}

function getType(view) {
  const typeCode = getBytes(view.buffer, view.byteOffset + TYPE_OFFSET, FIELD_LENGTH);

  return Utils.uintToString(typeCode);
}

function getNextBoxOffset(view) {

}

function getBytes(buffer, offset, length) {
  return new Uint8Array(buffer.slice(offset, offset + length))
}

export default Box;
