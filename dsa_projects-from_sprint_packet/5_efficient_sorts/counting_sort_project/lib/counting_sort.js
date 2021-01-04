// 1. clarify/sample I/O/edge
// 		assume all integers >= 0
// 		sample: I: [1,4,1,2,7,5,2], 9; O:[1,1,2,2,4,5,7];
// 		edge: I: []; O: [];

// 2. formulate approach:
// general idea (from geeksforgeeks):
// 	sorting technique based on keys between a specific range
// 		assume specific range is between 0 and max
// 	counts number of objects having distinct key values
// 		initialize a count array of length max + 1 with all 0s
// 		iterate through input array
// 		increment value in count array at index corresponding to value in input array
// 		initialize result array with length equal to input array
// 		modify count array as follows:
// 			iterate through count array
// 			modify each value to be the value plus the value in the previous spot in original count array
// 			the value in the modified count array indicates the position of each value in sorted array
// 			after adding input array value to the sorted value, decrement the corresponding value in the modified count array

// 3. pseodocode:
// create count array
// 	initialize count array of length max+1; fill with zeroes
// 	for value in input array:
// 		count_array[value] += 1
// create modified count array
// 	initialize modified count array [count_array[0]]
// 	for value in count array starting at index 1:
// 		modified count array[index] = count array[index] + modified count array[index-1]
// create sorted result array
// 	initialize result array of length n; fill with -1
// 	for value in input array:
// 		position of sorted value = modified count array[value] - 1
// 		modified count array[value] -= 1
// return sorted result array

// 4. code
function countingSort(arr, max) {
  // create count array
  // 	initialize count array of length max+1; fill with zeroes
  // 	for value in input array:
  // 		count_array[value] += 1
  let count_arr = new Array(max + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    count_arr[value] += 1;
  }

  // create modified count array
  // 	initialize modified count array [count_array[0]]
  // 	for value in count array starting at index 1:
  // 		modified count array[index] = count array[index] + modified count array[index-1]
  let mod_count_arr = [count_arr[0]];
  for (let i = 1; i < count_arr.length; i++) {
    mod_count_arr[i] = count_arr[i] + mod_count_arr[i - 1];
  }

  // create sorted result array
  // 	initialize result array of length n; fill with -1
  // 	for value in input array:
  // 		position of sorted value = modified count array[value] - 1
  // 		modified count array[value] -= 1
  let result_arr = new Array(arr.length).fill(-1);
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const sorted_val_idx = mod_count_arr[value] - 1;
    result_arr[sorted_val_idx] = value;
    mod_count_arr[value] -= 1;
  }
  // return sorted result array
  return result_arr;
}

// console.log(countingSort([1, 4, 1, 2, 7, 5, 2], 9)); // [1,1,2,2,4,5,7]

// 5. example input

// 6. time/space complexity

module.exports = {
  countingSort,
};
