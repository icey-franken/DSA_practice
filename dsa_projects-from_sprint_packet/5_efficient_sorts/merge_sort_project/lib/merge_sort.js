function merge(array1, array2) {
  let sorted = [];

  let val;
  while (array1.length > 0 && array2.length > 0) {
    if (array1[0] < array2[0]) {
      // this is inefficient - shift takes O(n) time
      val = array1.shift();
    } else {
      val = array2.shift();
    }
    sorted.push(val);
  }
  // either array1 or array2 will have length 0 first
  // at that point we just want to put those values at the end of the array
  sorted.push(...array1, ...array2);
  return sorted;
}

function efficientMerge(arr1, arr2) {
  let sorted = [];
  let idx_1 = (idx_2 = 0);
  let val;
  while (idx_1 < arr1.length && idx_2 < arr2.length) {
    if (arr1[idx_1] < arr2[idx_2]) {
      val = arr1[idx_1];
      idx_1++;
    } else {
      val = arr2[idx_2];
      idx_2++;
    }
    sorted.push(val);
  }
  // at this point we have run through values in one of the two arrays
	// we now add the remaining values to our sorted array
	if(idx_1 < arr1.length){
		sorted.push(...arr1.slice(idx_1));
	} else{
		sorted.push(...arr2.slice(idx_2))
	}
  return sorted;
}

// general idea:
// 	we first begin by recursively splitting the initial array into smaller and smaller halves
// we do this until we have arrays of length 1, which are trivially sorted
// we then work our way back up using the merge function
// the merge function compares the first values of each sorted subarray
// the smallest of these first values is pushed into a sorted array, and the process is repeated
// the end result is a returned array from merge that is sorted
// this return value is used in mergeSort, where merge is called with the return value using that array and another sorted subarray
// end resutl is a sorted array

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const midpoint = Math.floor(array.length / 2);
  const left = array.slice(0, midpoint);
  const right = array.slice(midpoint);

  const left_sorted = mergeSort(left);
  const right_sorted = mergeSort(right);
  return efficientMerge(left_sorted, right_sorted);
}

// time complexity:
// 	mergeSort makes log(n) calls - for each call the array length (n) is split in half approximately
// 	slice operation is O(n)
// 	efficientMerge is O(n) time complexity - must run through values in both arrays
// so - one call to mergeSort is T(3n) (slice, slice, and merge), with log(n) recursive calls - overall time complexity is O(n logn)
// space complexity - only additional space that is not constant is sorted (in merge) and array slice copies in mergeSort function - overall space complexity is O(n)

console.log(mergeSort([1, 3, 2, 4, 5]));
console.log(mergeSort([1, 3, 2, 4, 5, 6]));

module.exports = {
  merge,
  mergeSort,
};
