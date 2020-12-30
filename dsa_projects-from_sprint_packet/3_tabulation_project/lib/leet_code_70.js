// Work through this problem on https://leetcode.com/problems/climbing-stairs/ and use the specs given there.
// Feel free to use this file for scratch work.

// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// Constraints:
// 1 <= n <= 45

// 1. clarify/test I/O/edge cases:
// 2. formulate approach
// 	in this problem order DOES matter
// 	solve with tabulation
// 	ways you can climb 1 step is trivial - 1 way
// 	ways you can climb 2 steps is trivial - 2 ways
// 	ways you can climb 3 steps is the number of ways you can climb 2 plus number of ways you can climb 1
// 		tab[x] = tab[x-1]+tab[x-2] for x >= 3
// 3. pseudocode
// 	initialize table: length of n - 1 with all values = 0, except idx 1 = 1 and idx 2 = 2
// 	for i between 3 and n: tab[i] = tab[i-1] + tab[i-2]
// 	return tab[n]
// 4. code
// tabulation
// function climbStairs(n) {
// 	let tab = Array(n-1).fill(0);
// 	tab[0] = 1;
// 	tab[1] = 2;
// 	for(let i = 2; i < n; i ++){
// 		tab[i] = tab[i-1] + tab[i-2];
// 	}
// 	return tab[n-1]
// }

// memoization
function climbStairs(n, memo = { 1: 1, 2: 2 }) {
  if (!memo[n]) {
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  }
  return memo[n];
}

// 5. example input
console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3

// 6. time/space complexity
