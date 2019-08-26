export default function isCollide(a, b, isMoving) {
  const collision = !(
    a.top + a.height - 1 < b.top ||
    a.top + 1 > b.top + b.height ||
    a.left + a.width - 1 < b.left ||
    a.left + 1 > b.left + b.width
  );
  let side = "";
  let height = 0;
  let width = 0;
  if (a.left + a.width - b.left > 0 && a.left + a.width < b.left + b.width) {
    side += "left";
    width = a.left + a.width - b.left;
  }
  if (b.left + b.width - a.left > 0 && a.left + a.width > b.left + b.width) {
    side += "right";
    width = b.left + b.width - a.left;
  }
  if (a.top + a.height - b.top > 0 && a.top + a.height < b.top + b.height) {
    side += "top";
    if (
      (b.left > a.left && b.left + b.width < a.left + a.width) ||
      (b.left < a.left && b.left + b.width > a.left + a.width)
    ) {
      width = 0;
    }
    height = a.top + a.height - b.top;
    if (
      (b.top > a.top && b.top + b.height < a.top + a.height) ||
      (b.top < a.top && b.top + b.height > a.top + a.height)
    ) {
      height = 0;
    }
  }
  if (b.top + b.height - a.top > 0 && a.top + a.height > b.top + b.height) {
    side += "bottom";
    if (
      (b.left > a.left && b.left + b.width < a.left + a.width) ||
      (b.left < a.left && b.left + b.width > a.left + a.width)
    ) {
      width = 0;
    }
    height = b.top + b.height - a.top;
    if (
      (b.top > a.top && b.top + b.height < a.top + a.height) ||
      (b.top < a.top && b.top + b.height > a.top + a.height)
    ) {
      height = 0;
    }
  }
  if (
    (a.top <= b.top &&
      a.left <= b.left &&
      a.top + a.height >= b.top + b.height &&
      a.left + a.width >= b.left + b.width ) 
  )
   {
    side = "bottom";
    height = b.top + b.height - a.top;
  }
  if (
    
    (a.top >= b.top &&
      a.left >= b.left &&
      a.top + a.height <= b.top + b.height &&
      a.left + a.width <= b.left + b.width )
  )
   {
    side = "bottom";
    height = a.top + a.height - b.top;
  }
  if (
    (a.top <= b.top &&
      a.left <= b.left &&
      a.top + a.height >= b.top + b.height &&
      a.left + a.width >= b.left + b.width &&
      isMoving !== undefined) ||
    (a.top >= b.top &&
      a.left >= b.left &&
      a.top + a.height <= b.top + b.height &&
      a.left + a.width <= b.left + b.width &&
      isMoving !== undefined)
  ) {
    side = "all";
  }
  return {
    collision,
    side,
    width,
    height
  };
}
