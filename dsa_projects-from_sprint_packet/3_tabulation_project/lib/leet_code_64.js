// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.
// Note: You can only move either down or right at any point in time.

// Example 1:
// Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
// Output: 7
// Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

// Example 2:
// Input: grid = [[1,2,3],[4,5,6]]
// Output: 12

// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 200
// 0 <= grid[i][j] <= 100

// 1. clarify/test I/O/edge cases:
// 2. formulate approach:
// 	top left value is grid[0][0]
// 	bottom right value is grid[grid.length-1][grid[grid.length-1].length - 1]
// 	for grid with i rows and j columns:
// 		max value of row (i) is grid.length-1
// 		max value of column (j) is grid[0].length - 1
// 	solve with tabulation - initialize table to have same dimensions as grid
// 		all values equal to Infinity, except tab[0][0] initialized to grid[0][0]
// 	walk through row and compute sum; add to table
//  move down a row; compute sum; add to table IFF this value is less than table at same column up one row plus current position is less than sum
// continue til at bottom right value - return that value
// 3. pseudocode
// const num_rows = grid.length
// const num_columns = grid[0].length
// tab = Array(num_rows).fill(Array(num_columns).fill(Infinity))
// tab[0][0] = grid[0][0]
// for(i between 0 and num_rows - 2):
// 	for(j between 0 and num_columns - 2):
// 		from_top = tab[i][j] + grid[i+1][j]
// 		if(from_top < tab[i+1][j]): tab[i+1][j] = from_top
// 		from_left = tab[i][j] + grid[i][j+1]
// 		if(from_left < tab[i][j+1]): tab[i][j+1] = from_left
// return tab[num_rows-1][num_columns-1]
// 4. code
// function minPathSum(grid) {
//   const num_rows = grid.length;
//   const num_cols = grid[0].length;
//   let tab = [];
//   for (let i = 0; i < num_rows; i++) {
//     tab.push(Array(num_cols).fill(Infinity));
//   }
//   tab[0][0] = grid[0][0];
//   for (let i = 0; i < num_rows; i++) {
//     for (let j = 0; j < num_cols; j++) {
//       if (i > 0) {
//         const from_top = tab[i - 1][j] + grid[i][j];
//         if (from_top < tab[i][j]) {
//           tab[i][j] = from_top;
//         }
//       }
//       if (j > 0) {
//         const from_left = tab[i][j - 1] + grid[i][j];
//         if (from_left < tab[i][j]) {
//           tab[i][j] = from_left;
//         }
//       }
//     }
//   }
//   return tab[num_rows - 1][num_cols - 1];
// }

// faster solution:
function minPathSum(grid) {
  const num_rows = grid.length;
  const num_cols = grid[0].length;
  let tab = [];
  for (let i = 0; i < num_rows; i++) {
    tab.push(Array(num_cols).fill(Infinity));
  }
  tab[0][0] = grid[0][0];
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      if (i === 0 && j == 0) {
        continue;
      }
      const from_top = i > 0 ? tab[i - 1][j] : Infinity;

      const from_left = j > 0 ? tab[i][j - 1] : Infinity;

      const prev_sum = from_top < from_left ? from_top : from_left;
      tab[i][j] = prev_sum + grid[i][j];
    }
  }
  return tab[num_rows - 1][num_cols - 1];
}

// 5. example input
console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
); // 7
console.log(
  minPathSum([
    [1, 2, 3],
    [4, 5, 6],
  ])
); // 12

// 6. time/space complexity
// time: nested for loops of length m and n - O(n*m) time complexity. Operations within for loop are linear - array loopup, conditional, reassignment to array
// space: from top and from left overwritten on each iteration (O(1)). Main space consumer is table - O(n*m) space complexity.
