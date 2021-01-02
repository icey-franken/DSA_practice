// general idea: input array is split into sorted and unsorted pieces
// 	initial piece is element at index 0 - considered trivially sorted
// 	begin at index 1, compare to previous elements (the sorted portion)
// 		if greater than an element in the sorted portion, insert it there
// 		if less than an element in the sorted portion, decrement the index and continue checking

function insertionSort(arr) {
  // loop from i = 1 to end of array
  for (let i = 1; i < arr.length; i++) {
    const curr_el = arr[i];
    let insert_idx = i - 1;
    while (arr[insert_idx] > curr_el && insert_idx >= 0) {
      // if true, copy value at insert index to value at right and decrement insert index.
      // on first loop value at right will be curr_el - you already have a copy saved
      // on future loops you will always have a copy of the element you overwrite, saved immediately to the write of the overwritten value
      arr[insert_idx + 1] = arr[insert_idx];
      insert_idx--;
    }
    // continue till condition not satisfied and insert curr_el at one greater than insert_idx
    arr[insert_idx + 1] = curr_el;
  }
  return arr;
}

// O(n^2) time complexity at worst - nested loops. Operations within loops are simple copies
// O(1) space complexity

// console.log(insertionSort([5,4,3, 2, 1]));
console.log(insertionSort([2, -1, 4, 3, 7, 3]));
module.exports = {
  insertionSort,
};
