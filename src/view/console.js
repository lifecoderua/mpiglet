/**
 *  Render box type to console
 *
 *  Also render `mdat` content expecting Utf8-encoded string
 *
 * @param box {Box}
 */
export default function consoleRender(box) {
  console.log(box.type);

  if (box.type === 'mdat') {
    const decodedContent = Utils.uintToString( box.getContent() );
    console.log(decodedContent);
  }
}

