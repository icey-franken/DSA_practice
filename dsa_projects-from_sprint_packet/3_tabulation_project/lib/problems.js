// Write a function, stepper(nums), that takes in an array of non negative numbers.
// Each element of the array represents the maximum number of steps you can take from that position in the array.
// The function should return a boolean indicating if it is possible to travel from the
// first position of the array to the last position.
//
// For Example:
//
// Given [3, 1, 0, 5, 10]
//      - We begin at first position, 3.
//      - Since the element is 3 we can take up to 3 steps from this position.
//      - This means we can step to the 1, 0, or 5
//      - Say we step to 1
//      - Since the element is 1, now the only option is to take 1 step to land on 0
//      - etc...
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// stepper([3, 1, 0, 5, 10]);           // => true, because we can step through elements 3 -> 5 -> 10
// stepper([3, 4, 1, 0, 10]);           // => true, because we can step through elements 3 -> 4 -> 10
// stepper([2, 3, 1, 1, 0, 4, 7, 8])    // => false, there is no way to step to the end

// 1. clarify/test I/O/edge cases:
// 	assume valid array of integer input
// 	test input - given
// 	edge case - n/a
// 2. formulate approach:
// 	our tabulation will be an array of length(input) containing booleans
// 	booleans all initialized to false except for value at index 0
// 		we know we can reach first value - start position
// 	start at index 0 of nums
// 		change nums from index = 0 up to index=nums[0] to true
// 	move to next index - if value of tab[index] is true, then repeat the process
// 	else, continue to next index
// 	at end return tab[nums.length-1]
// 3. pseudocode:
// initialize tabulation:
// 	tab = [true]
// 	for i = 1 to i < nums.length: tab.push(false)
// begin stepping:
// 	for i = 0 to i < nums.length:
// 		check that it's possible to reach this value of num:
// 		if(tab[i] === false): continue
// 		else:
// 			max_steps = nums[i]
// 			for j = i to j = i + nums[i]:
// 				check for short-circuit: if j > nums.length - 1: return true
// 				tab[j] = true
// 	return tab[nums.length-1]

// 4. code:
// solved with tabulation
// function stepper(nums) {
//   let tab = [true];
//   const len = nums.length;
//   for (let i = 1; i < len; i++) {
//     tab.push(false);
//   }
//   for (let i = 0; i < len; i++) {
//     if (tab[i] === false) {
//       continue;
//     } else {
//       const max_steps = nums[i];
//       // start at j = i + 1 because we already know that tab[i] is true
//       for (let j = i + 1; j <= i + max_steps; j++) {
//         if (j >= len - 1) {
//           return true;
//         }
//         tab[j] = true;
//       }
//     }
// 	}
//   return tab[len - 1];
// }

// solve with memoization
// 2. formulate approach:
// 	we take a top down approach for memoization:
// 		start at end of nums - initialize index to true in memo, all others are false
// 		check nums[index-j] - if value is greater than or equal to j, then index-j is true in memo, otherwise false
// 		repeat until index-j<0
// 		at end we return memo[0]
function stepper(nums) {
  let memo = { [nums.length - 1]: true };
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = 1; j <= i; j++) {
      // we only check if memo[i] is true - if we can't reach that value in the first place then it is irrelevant
      if (memo[i] && j <= nums[i - j]) {
        memo[i - j] = true;
        // short circuit here
        if (i - j === 0) {
          return true;
        }
      } else if (memo[i - j] === undefined) {
        memo[i - j] = false;
      }
    }
  }
  // console.log(memo);
  return memo[0];
}
// 5. example input:
// console.log(stepper([3, 1, 0, 5, 10])); // => true, because we can step through elements 3 -> 5 -> 10
// console.log(stepper([3, 4, 1, 0, 10])); // => true, because we can step through elements 3 -> 4 -> 10
// console.log(stepper([2, 3, 1, 1, 0, 4, 7, 8])); // => false, there is no way to step to the end

// 6. time/space complexity:
// 		time: O(n^2) due to nested for loops
// 		space: O(n) because we require a tabulation array of length equal to input array

// -----------------------------------------------------------------------------------
// Write a function, maxNonAdjacentSum(nums), that takes in an array of nonnegative numbers.
// The function should return the maximum sum of elements in the array we can get if we cannot take
// adjacent elements into the sum.
//
// Try to solve this in two ways, using tabulation and memoization.
//
// Examples:
//
// maxNonAdjacentSum([2, 7, 9, 3, 4])   // => 15, because 2 + 9 + 4
// maxNonAdjacentSum([4,2,1,6])         // => 10, because 4 + 6
// 1. clarify/test I/O/edge:
//
// 2/3. formulate approach/pseudocode:
// 	we will always take either 2 or 3 steps - if we were to take 4 steps it would always better at least as good if not better to take 2 and 2 steps, because all values are given to be positive
// 	seed our tabulation with first two values - one of those values will always be used in calculating max sum
// 	initialize rest of tabulation as 0
// 	initialize max_sum = 0
// 	begin at index 0 and calculate max sum with 2 steps out, add to tabulation
// 	do same for 3 steps out, add to tabulation
// 	increment index, do same thing
// 		if sum is greater than current value in tab array at index + step, update tab[index+step] to sum
// 		if sum is greater than max_sum, update max_sum
// 	return max_sum
// 4. code
function maxNonAdjacentSum(nums) {
  let tab = Array(nums.length).fill(0);
  tab[0] = nums[0];
  tab[1] = nums[1];
  let max_sum = 0;
  const last_idx = nums.length - 1;
  for (let idx = 0; idx <= last_idx; idx++) {
    // take 2 or 3 steps
    for (let step = 2; step <= 3; step++) {
      const step_idx = idx + step;
      if (step_idx <= last_idx) {
        const step_sum = tab[idx] + nums[step_idx];
        if (step_sum > tab[step_idx]) {
          tab[step_idx] = step_sum;
          if (step_sum > max_sum) {
            max_sum = step_sum;
          }
        }
      }
    }
  }
  return max_sum;
}
// 5. example input
// console.log(maxNonAdjacentSum([2, 7, 9, 3, 4])); // => 15, because 2 + 9 + 4
// console.log(maxNonAdjacentSum([4, 2, 1, 6])); // => 10, because 4 + 6
// 6. time/space complexity:
// 	time: O(n) - inner for loop in constant time; all operations within main for loop are constant time as well (reassignment, array lookup, conditionals)
// 	space: O(n) - tabulation occupies same space as input nums array.

// -----------------------------------------------------------------------------------
// Write a function, minChange(coins, amount), that accepts an array of coin values
// and a target amount as arguments. The method should the minimum number of coins needed
// to make the target amount. A coin value can be used multiple times.
//
// You've seen this problem before with memoization, but now solve it using the Tabulation strategy!
//
// Examples:
//
// minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
// minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
// minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
// minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100

// 1. clarify/test I/O/edge:
// 	edge:
// 		empty coins array and amount > 0? return 0
// 		empty coins array and amount = 0? return 1
// 2/3. formulate approach/pseudocode
// 	tabulation - solve with bottom up approach
// 		initialize tab array of length=amount and all elements equal to 0 except first
// 		start at amount of 0 in tab array - 1 way to reach 0 (with no coins)
// 		step to next index in tab array(equal to current amount)
// 			if current amount - current coin is < 0: continue
// 			else: tab[index] = tab[index] + tab[index-current_coin]
// 		repeat for length of tab array
// 		repeat for all coins
// 		return tab[amount]

// 4. code
function minChange(coins, amount) {
  let tab = Array(amount + 1).fill(Infinity);
  tab[0] = 0;
  coins.forEach((coin) => {
    for (let curr_amt = 1; curr_amt <= amount; curr_amt++) {
      if (curr_amt < coin) {
        continue;
      } else {
        const prev_num_coins = tab[curr_amt];
        const curr_num_coins = tab[curr_amt - coin] + 1;
        if (curr_num_coins < prev_num_coins) {
          tab[curr_amt] = curr_num_coins;
        }
      }
    }
  });
  if (tab[amount] === Infinity) {
    return -1;
  } else {
    return tab[amount];
  }
}

// 5. example input
console.log(minChange([1, 2, 5], 11)); // => 3, because 5 + 5 + 1 = 11
console.log(minChange([1, 4, 5], 8)); // => 2, because 4 + 4 = 8
console.log(minChange([1, 5, 10, 25], 15)); // => 2, because 10 + 5 = 15
console.log(minChange([1, 5, 10, 25], 100)); // => 4, because 25 + 25 + 25 + 25 = 100

// 6. time/space complexity

module.exports = {
  stepper,
  maxNonAdjacentSum,
  minChange,
};
