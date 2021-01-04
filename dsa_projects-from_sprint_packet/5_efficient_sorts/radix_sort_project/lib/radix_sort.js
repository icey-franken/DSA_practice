// 1. clarify/sample I/O/edge

// 2. formulate approach

// general idea:
// 		we sort based on digits, starting with least significant (1's place)
// 		counting sort is implemented as a subroutine to sort each digit (with a max of 9)

//

// 3. pseodocode

// 	initialize sorted array with length = arr.length
// 	determine max value in original array:
// 		initialize max value as 0
// 		iterate through original array, updating max value if value > max
// 	determine max number of digits, equal to number of outer loops required
// 		number of loops = max.toString().length
// 	iterate through input array for i = 1 to i <= number of loops determined above
// 		initialize single digit array of length 10, fill with 0
// 		convert each value to a string and access value at length - i
// 			if value at length -1 d.n.e., consider it a zero - skip
// 		SUBROUTINE: perform countSort on single digit array - input is original array and single digit array
// 			initialize count_arr with length 10 for single values, fill with 0
// 			iterate through single values array
// 				increment value in count_arr at index corresponding to single digit value
// 			mutate count array so that it is cumulative count of values:
// 				iterate from i = 1 to count array length
// 					count_array[i] += count_array[i-1]
// 			initialize single digit result array of sorted digits with length equal to input array
// 			initialize original number result array in same manner
// 			iterate through single digit values in input array with index i
// 				original number value = orignal number array[i]
// 				count array[single digit value] -= 1
// 				result array index = count array[single digit value]
// 				single digit result array[result array index] = single digit value
// 				original number result array[result array index] = original number value
// 			at this point we have a sorted single digit and original number array
// 			return original number array, sorted for first digit
// 		update sorted array to return value from countSort subroutine

// 4. code
function radixSort(arr) {
  // return null if input is not array
  if (!Array.isArray(arr)) {
    return null;
  }
  // 	initialize sorted array with length = arr.length
  let sorted_arr = [...arr];
  // 	determine max value in original array:
  // 		initialize max value as 0
  // 		iterate through original array, updating max value if value > max
  let max_val = 0;
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (val > max_val) {
      max_val = val;
    }
  }
  // 	determine max number of digits, equal to number of outer loops required
  // 		number of loops = max.toString().length
  let max_num_digits = max_val.toString().length;
  // 	iterate for i = 1 to i <= number of loops determined above - count sort on each level of significance (ones, tens, etc.)
  // !!!CHANGE BACK AFTER DEBUGGING
  for (let i = 1; i <= max_num_digits; i++) {
    // for (let i = 1; i <= 2; i++) {
    // 		initialize single digit array of length arr, fill with 0

    let single_digit_arr = new Array(arr.length).fill(0);
    // 		iterate through input array to fill in single digit array
    for (let j = 0; j < sorted_arr.length; j++) {
      //	 		convert each value to a string and access value at length - i
      const number_string = sorted_arr[j].toString();
      const digit_string_len = number_string.length;
      // 				if value at length -1 d.n.e., consider it a zero - skip
      if (digit_string_len >= i) {
        single_digit_arr[j] = parseInt(number_string[digit_string_len - i], 10);
      }
    }
    sorted_arr = [...countSortSubroutine(sorted_arr, single_digit_arr)];
    // 		update sorted array to return value from countSort subroutine
  }
  return sorted_arr;
}

function countSortSubroutine(arr, single_digit_arr) {
  // 		SUBROUTINE: perform countSort on single digit array - input is original array and single digit array
  // 			initialize count_arr with length 10 for single values, fill with 0
  let count_arr = new Array(10).fill(0);
  // 			iterate through single values array
  for (let i = 0; i < single_digit_arr.length; i++) {
    // 				increment value in count_arr at index corresponding to single digit value
    const digit_val = single_digit_arr[i];
    count_arr[digit_val] += 1;
  }
  // 			mutate count array so that it is cumulative count of values:
  // 				iterate from i = 1 to count array length
  // 					count_array[i] += count_array[i-1]
  for (let i = 1; i < count_arr.length; i++) {
    count_arr[i] += count_arr[i - 1];
  }
  // 			initialize single digit result array of sorted digits with length equal to input array
  let single_digit_result = new Array(arr.length);
  let original_number_result = new Array(arr.length);
  // 			initialize original number result array in same manner
  // 			iterate through single digit values in input array with index i
  for (let i = single_digit_arr.length - 1; i >= 0; i--) {
    // 				original number value = orignal number array[i]
    // 				count array[single digit value] -= 1
    const single_digit_val = single_digit_arr[i];
    const original_number_val = arr[i];
    count_arr[single_digit_val] -= 1;
    // 				result array index = count array[single digit value]
    const result_arr_idx = count_arr[single_digit_val];
    // 				single digit result array[result array index] = single digit value
    single_digit_result[result_arr_idx] = single_digit_val;
    // 				original number result array[result array index] = original number value
    original_number_result[result_arr_idx] = original_number_val;
  }

  return original_number_result;
  // 			at this point we have a sorted single digit and original number array
  // 			return original number array, sorted for first digit
}

// 5. example input

console.log(radixSort([4, 9, 0, 23, 15, 100, 66, 41, 5, 10]));
// 6. time/space complexity

module.exports = {
  radixSort,
};
