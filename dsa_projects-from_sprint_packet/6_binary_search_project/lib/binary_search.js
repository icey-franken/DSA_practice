function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = array[mid];
    if (midVal === target) {
      return true;
    } else if (midVal > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return false;
}

function binarySearchIndex(array, target) {
	let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = array[mid];
    if (midVal === target) {
      return mid;
    } else if (midVal > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

module.exports = {
  binarySearch,
  binarySearchIndex,
};
