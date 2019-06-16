import consoleRender from "./console";
import thumbnailRender from "./thumbnail";


/**
 * Render all Box content using defined render methods
 *
 * @param boxes {[Box]} Array of Box to render
 */
export default function render(boxes) {
  boxes.forEach((box) => {
    consoleRender(box);
    thumbnailRender(box);
  })
}
