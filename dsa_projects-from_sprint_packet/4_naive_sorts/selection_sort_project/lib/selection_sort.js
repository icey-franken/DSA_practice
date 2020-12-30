function swap(arr, index1, index2) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
// the idea behind selection sort:
// 	iterate from 0 to n and find the smallest value
// 		swap this value with value at 0
// 	iterate from 1 to n and find the smallest value
// 		swap this value with value at 1
// 	continue until index is n

// time complexity:  O(n^2) - two nested loops - quadratic (polynomial)
// space complexity: O(1) not including the input array - constant
function selectionSort(arr) {
  // index i is the index we are swapping with - find min value from here
  for (let i = 0; i < arr.length; i++) {
    let min_idx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    swap(arr, i, min_idx);
  }
  return arr;
}

module.exports = {
  selectionSort,
  swap,
};
