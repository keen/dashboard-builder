export default function resizingCount(element, pageX, pageY, el, grid, ref) {
  let newTop = 0;
  let newLeft = 0;
  let newWidth = 0;
  let newHeight = 0;
  const top = Math.round((ref.top + window.pageYOffset) / grid) * grid;
  switch (element) {
    case "top":
      newTop = el.top + Math.round((pageY - el.top) / grid) * grid - top;
      newLeft = el.left;
      newWidth = el.width;
      newHeight = el.height - Math.round((pageY - el.top) / grid) * grid + top;
      break;
    case "bottom":
      newTop = el.top;
      newLeft = el.left;
      newWidth = el.width;
      newHeight = Math.round((pageY - el.top) / grid) * grid - top;
      break;
    case "right":
      newTop = el.top;
      newLeft = el.left;
      newWidth =
        Math.round((pageX - el.left) / grid) * grid -
        Math.round((Math.round(ref.left / grid) * grid) / grid) * grid;
      newHeight = el.height;
      break;
    case "left":
      newTop = el.top;
      newLeft =
        el.left +
        Math.round((pageX - el.left) / grid) * grid -
        Math.round((Math.round(ref.left / grid) * grid) / grid) * grid;
      newWidth =
        el.width -
        Math.round((pageX - el.left) / grid) * grid +
        Math.round((Math.round(ref.left / grid) * grid) / grid) * grid;
      newHeight = el.height;
      break;
    case "top-left":
      newTop = el.top + Math.round((pageY - el.top) / grid) * grid - top;
      newLeft =
        el.left +
        Math.round((pageX - el.left) / grid) * grid -
        Math.round((Math.round(ref.left / grid) * grid) / grid) * grid;
      newWidth =
        el.width -
        Math.round((pageX - el.left) / grid) * grid +
        Math.round((Math.round(ref.left / grid) * grid) / grid) * grid;
      newHeight = el.height - Math.round((pageY - el.top) / grid) * grid + top;
      break;
    case "top-right":
      newTop = el.top + Math.round((pageY - el.top) / grid) * grid - top;
      newLeft = el.left;
      newWidth =
        Math.round((pageX - el.left) / grid) * grid -
        Math.round(ref.left / grid) * grid;
      newHeight = el.height - Math.round((pageY - el.top) / grid) * grid + top;
      break;
    case "bottom-right":
      newTop = el.top;
      newLeft = el.left;
      newWidth =
        Math.round((pageX - el.left) / grid) * grid -
        Math.round(ref.left / grid) * grid;
      newHeight = Math.round((pageY - el.top) / grid) * grid - top;
      break;
    case "bottom-left":
      newTop = el.top;
      newLeft =
        el.left +
        Math.round((pageX - el.left) / grid) * grid -
        Math.round(ref.left / grid) * grid;
      newWidth =
        el.width -
        Math.round((pageX - el.left) / grid) * grid +
        Math.round(ref.left / grid) * grid;
      newHeight = Math.round((pageY - el.top) / grid) * grid - top;
      break;

    default:
      break;
  }
  return {
    top: newTop,
    left: newLeft,
    width: newWidth,
    height: newHeight
  };
}