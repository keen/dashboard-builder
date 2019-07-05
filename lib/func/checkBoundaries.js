export default function checkBoundaries(topPos, leftPos, elWidth, ref) {
  const { width } = ref;
  const margin = {
    top: 20,
    left: 20,
    right: 20
  };
  return {
    top: topPos <= 0 + 60 ? margin.top : topPos - 60,
    left:
      leftPos <= 0
        ? margin.left
        : leftPos + elWidth >= width - margin.right
        ? width - elWidth - margin.right
        : leftPos
  };
}