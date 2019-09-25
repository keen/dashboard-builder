export default function checkBoundaries(topPos, leftPos, elWidth, ref) {
  const { width } = ref;
  const grid = 20;
  const top = Math.round((ref.top + window.pageYOffset) / grid) * grid;
  const margin = {
    top: 20,
    left: 20,
    right: 20
  };
  return {
    top: topPos <= 0 + top ? margin.top : topPos - top,
    left:
      leftPos <= 0
        ? margin.left
        : leftPos + elWidth >= width - margin.right
        ? width - elWidth - margin.right
        : leftPos
  };
}
