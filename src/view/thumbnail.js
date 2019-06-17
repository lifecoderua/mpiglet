import Utils from "../utils/utils";

/**
 * Render thumbnail for mdat Box with inline image
 *
 * @param box {Box}
 */
export default function thumbnailRender(box) {
  if (box.type !== 'mdat') { return false; }

  const contents = box.getContentsString();
  const isImage = Utils.isImage(contents);
  if (!isImage) { return false; }

  Utils.appendImage(contents);
}

