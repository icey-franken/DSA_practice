// 1. clarify/test I/O/edge
// 	test case:
console.log(bubbleSort([4, 1, 5, 3, 2])); //[1, 2, 3, 4, 5]
// 2. formulate approach
// general idea:
// 	walk through an array of values by index
// 	if value at next index greater than that at current - swap values
// 	repeat until at end of array
// 	repeat at most n times where n is array length
//  shortcuts:
// 		if no swaps are made on a pass, then array is sorted and stop early
// 		do not check values beyond n - i, where n is last index in array and i is the sort iteration
// 			i.e. if you've made two iterations, you know the last two values are the largest and you no longer need to compare any values to them - only check up to n-2
// 3. pseudocode
// 4. code
// 5. example input
// 6. time/space complexity
// time: naive bubble sort algorithm has O(n^2) time complexity.
// 		my implementation has at worst O(n^2), but in practice it will be less than that
// space: O(1) constant space complexity, excluding the input array - including that it is O(n) time complexity.

// note: we don't want to slice or splice as that has O(n) time complexity - instead we copy values
// I believe this is O(1) time
function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
  return array;
}
// including i as a count of how many iterations we have made is a slight optimization
// after one iteration we no longer need to check the final value - we know it is the largest
// after two iterations we longer need to check the final 2 values - we know they are the largest and sorted
// so on...
function bubbleSort(array) {
  let swapped = true;
  let i = 0;
  while (swapped) {
    swapped = false;
    for (let j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        swapped = true;
      }
    }
    i++;
  }
  return array;
}

module.exports = {
  bubbleSort,
  swap,
};
