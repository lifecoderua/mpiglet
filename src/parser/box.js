/**
 * Read MPEG-4 Box by offset
 *
 * @param buffer
 * @param offset
 * @constructor
 */
import Utils from "../utils/utils";

const TYPE_OFFSET = 4;
// const EXTENDED_LENGTH_OFFSET = 8;
const FIELD_LENGTH = 4;
// const EXTENDED_FIELD_LENGTH = 8;

const CONTAINER_BOX_TYPES = [
  'moov',
  'moof',
  'trak',
  'traf',
  'tfad',
  'mvex',
  'mdia',
  'minf',
  'dinf',
  'stbl',
  'stsd',
  'sinf',
  'mfra',
  'udta',
  'meta',
  'schi',
  'avc1',
  'avc3',
  'hvc1',
  'hev1',
  'mp4a',
  'encv',
  'enca',
  'skip',
  'edts',
];

function Box(buffer, offset) {
  this.buffer = buffer;
  this.offset = offset;

  this.view = new DataView(buffer, offset);

  const lengthData = getLength(this.view);
  this.length = lengthData.length;
  this.contentOffset = lengthData.contentOffset;
  this.type = getType(this.view);
}

Box.prototype.getContentsString = function() {
  const contents = getBytes(this.view.buffer, this.contentOffset, this.length - this.contentOffset);

  return Utils.uintToString(contents);
};

Box.prototype.getNextBoxOffset = function() {
  if (CONTAINER_BOX_TYPES.indexOf(this.type) !== -1) {
    return this.offset + this.contentOffset;
  }

  return this.offset + this.length;
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

function getBytes(buffer, offset, length) {
  return new Uint8Array(buffer.slice(offset, offset + length))
}

export default Box;
