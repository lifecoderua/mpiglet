/**
 *  Render box type to console
 *
 *  Also render `mdat` content expecting Utf8-encoded string
 *
 * @param box {Box}
 */
export default function consoleRender(box) {
  console.log('Found box of type %s and size %d', box.type, box.length);

  if (box.type === 'mdat') {
    const decodedContent = box.getContentsString();
    console.log('Content of mdat box is: %s', decodedContent);
  }
}

