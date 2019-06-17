import Utils from "../utils/utils";

/**
 * Render thumbnail for mdat Box with inline image
 *
 * @param box {Box}
 */
export default function thumbnailRender(box) {
  if (box.type !== 'mdat') { return false; }

  const contents = box.getContentsString();
  const images = Utils.getImages(contents);
  if (!images) { return false; }

  Utils.appendImages(images);
}

