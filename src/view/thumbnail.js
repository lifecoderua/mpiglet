/**
 * Render thumbnail for mdat Box with inline image
 *
 * @param box {Box}
 */
export default function thumbnailRender(box) {
  if (box.type !== 'mdat') { return false; }

  const contents = box.getContents();
  const isImage = Utils.isImage(contents);
  if (!isImage) { return false; }

  Utils.appendImage(contents);
}

