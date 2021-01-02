// general idea:
// we pick a pivot point - it can be anywhere - beginning, middle, end, whatever
// we split the array into three pieces:
// 	lhs - elements less than pivot
// 	rhs - elements greater than pivot
// 	the pivot value itself
// 	our final return will be [...lhs, pivot, ...rhs]
// before our final return we recursively call quickSort on the lhs and rhs

// function quickSort(array) {
//   if (array.length === 0) {
//     return array;
//   }
//   let pivot = array[0];
//   let lhs = [];
//   let rhs = [];
//   for (let i = 1; i < array.length; i++) {
//     if (array[i] > pivot) {
//       rhs.push(array[i]);
//     } else {
//       lhs.push(array[i]);
//     }
//   }
//   // at this point we have our lhs (smaller) and rhs (larger) arrays
//   // we now need to sort these arrays:
//   let lhs_sorted = quickSort(lhs);
//   let rhs_sorted = quickSort(rhs);
//   // we return the sorted array, with pivot in the middle
//   return [...lhs_sorted, pivot, ...rhs_sorted];
// }

// console.log(quickSort([1, 5, 2, 8, -5]));

// time complexity:
// 	our quickSort function alone is linear time complexity - for loop runs through array
// 	quickSort is called recursively log(n) times at best; n times at worst
// 	this results in overall time complexity from n log(n) to n^2 for worst case
// 		worst case is already sorted array
// space complexity:
// 	O(n) because of space used by lhs/rhs and sorted arrays
// 	because this algorithm proceeds in a depth first manner the space complexity remains O(n)
// 	NOTE that quickSort can be implemented with constant space complexity
// 	in this implementation array indexes are tracked and sort is performed in place by swapping elements

function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
  return array;
}
// attempted implementation with constant space complexity - not sure how it works
function quickSort(array, low = 0, high = array.length - 1) {
  if (low < high) {
    const pivot = array[high];
    let pivot_idx = low - 1;
    for (let i = low; i < high; i++) {
      // if el is less than pivot val, we want to move the pivot right by one and swap with el
      if (array[i] < pivot) {
        pivot_idx++;
        swap(array, i, pivot_idx);
      }
    }
    pivot_idx++;
    // at end of for loop we swap pivot with pivot index
    swap(array, pivot_idx, high);
    quickSort(array, low, pivot_idx - 1);
    quickSort(array, pivot_idx + 1, high);
  }
  return array;
}

console.log(quickSort([6, 5, 2, 8, -5]));

module.exports = {
  quickSort,
};
