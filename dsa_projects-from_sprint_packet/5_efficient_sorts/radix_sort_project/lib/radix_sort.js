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
// ----------------------------------------------
// initial attempt
function radixSort1(arr) {
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

function countSortSubroutine1(arr, single_digit_arr) {
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

// ----------------------------------------------
// cleaned initial attempt
function radixSort(arr) {
  // return null if input is not array, or empty array for array length 0
  if (!Array.isArray(arr)) {
    return null;
  } else if (arr.length === 0) {
    return [];
  }
  // 	determine number of digits in max value in original array - num of outer loop iterations
  const max_num_digits = arr
    .reduce((max, el) => (el > max ? el : max))
    .toString().length;
  // 	iterate for i = 1 to i <= number of loops determined above - count sort on each level of significance (ones, tens, etc.)
  // 		initialize single digit array of length arr, fill with 0
  let single_digit_arr = new Array(arr.length).fill(0);
  for (let i = 1; i <= max_num_digits; i++) {
    // 		iterate through input array to fill in single digit array
    for (let j = 0; j < arr.length; j++) {
      //	 		convert each value to a string
      const number_string = arr[j].toString();
      const digit_string_len = number_string.length;
      // 			access value at length - i (desired single digit) and save to single digit array
      // 			if length - i < digit string length, consider it 0
      single_digit_arr[j] =
        digit_string_len >= i
          ? parseInt(number_string[digit_string_len - i], 10)
          : 0;
    }
    // sort based on current digit values
    arr = countSortSubroutine(arr, single_digit_arr);
    // 		update sorted array to return value from countSort subroutine
  }
  return arr;
}

function countSortSubroutine(arr, single_digit_arr) {
  // 		SUBROUTINE: perform countSort on single digit array - input is original array and single digit array
  // 			initialize count_arr with length 10 for single values, fill with 0
  let count_arr = new Array(10).fill(0);
  // 			iterate through single digit array and increment count array value at index corresponding to digit value
  single_digit_arr.forEach((digit_val) => (count_arr[digit_val] += 1));
  // 			mutate count array so that it is cumulative count of values:
  // 				iterate from i = 1 to count array length
  // 					count_array[i] += count_array[i-1]
  for (let i = 1; i < count_arr.length; i++) {
    count_arr[i] += count_arr[i - 1];
  }
  // 			initialize original number result array of sorted numbers with length equal to input array
  let original_number_result = new Array(arr.length);
	// 			iterate through single digit values in input array with index i
	// 			we start at the end of the single digit arr to preserve order!!!
	// 				e.g. if [4, 100, 10, 1] on first loop it should be [100, 10, 1, 4] NOT [10, 100, 1, 4]
	// 					if we do not start from the end we would get the incorrect result
	// 					this does not matter for a simple countSort, but in this case we are using count sort multiple times
	// 					so we want to preserve initial order of elements if the digit value is equal.
	// 					on second loop it should be [100, 1, 4, 10]
	// 					and on third loop [1, 4, 10, 100]
  for (let i = single_digit_arr.length - 1; i >= 0; i--) {
		// for a particular digit value in single digit array,
		// 	the index of that value in the SORTED single digit array is equal to
		// 	the value of the count array indexed at that value, minus 1
		// the index of the value in the SORTED original number array is the same
    const single_digit_val = single_digit_arr[i];
    count_arr[single_digit_val] -= 1;
    const result_arr_idx = count_arr[single_digit_val];
    original_number_result[result_arr_idx] = arr[i];
  }
  return original_number_result;
}

// 5. example input

// console.log(radixSort([4, 9, 0, 23, 15, 100, 66, 41, 5, 10]));
// console.log(radixSort([]));

// 6. time/space complexity
// 	time:
// 		for count sort subroutine the time complexity is:
// 			one for loop with arr.length iterations and constant inner operations - T(n)
// 			one for loop with 9 iterations and constant inner operations - T(9)
// 			one for loop with arr.length iterations and constant inner operations - T(n)
// 			overall subroutine time complexity is T(2n+9) -> O(n)
// 		for radix sort outer algo:
// 			one loop over input array with constant inner operations - T(n)
// 				toString method has O(n) time complexity where n is length - only performed once so T(m) where assumed m << n
// 			outer main loop performed m times where m is number of digits in max value T(m)
// 				inner for loop over input array length n (T(n)) where single digit array created
// 					.toString called each loop - T(m); parseInt called each loop - T(m) -> T(2m)
// 					time complexity of inner for loop is T(2mn) -> O(m*n)
// 				count sort subroutine called with time complexity O(n)
// 				overall time complexity of main for loop is T(m^2*n + m*n) -> O(m^2*n)
// 		for typical case where m << n time complexity is O(n)

// 	space: don't want to think about it right now - come back.



module.exports = {
  radixSort,
};
