// Work through this problem on https://leetcode.com/problems/coin-change-2/ and use the specs given there.
// Feel free to use this file for scratch work.

// You are given coins of different denominations and a total amount of money. Write a function to compute the number of combinations that make up that amount. You may assume that you have infinite number of each kind of coin.

// Example 1:

// Input: amount = 5, coins = [1, 2, 5]
// Output: 4
// Explanation: there are four ways to make up the amount:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1
// Example 2:

// Input: amount = 3, coins = [2]
// Output: 0
// Explanation: the amount of 3 cannot be made up just with coins of 2.
// Example 3:

// Input: amount = 10, coins = [10]
// Output: 1

// Note:

// You can assume that

// 0 <= amount <= 5000
// 1 <= coin <= 5000
// the number of coins is less than 500
// the answer is guaranteed to fit into signed 32-bit integer

// 1. clarify/test I/O/edge:
// 			clarify: can we assume unique coins? Yes
// 							assume positive integers for all args
// 			test I/O:
// 					I: [1, 2, 5], 5    O: 4
// 					I: [2], 3          O: 0
// 					I: [10], 10        O: 1
// 2. formulate approach:
// 			we need to determine all paths that lead to the amount
// 			we can assume each path will have >= 0 of each coin
// 			possible coin combos can be stored in arrays with order
// 				do we care about actual coins used? We can assume unique if we use arrays properly
// 			use two nested for loops
// 				first for loop goes through coins, adding between 0 and the max number of coins
// 					max number of coins found with amount divided by coin rounded down
// 				store values in array containing subarrays
// 					on each inner loop the inner array is copied and has 0 - max coins added
// 				at end of both loops, we have a final loop that loops through 2D array and counts coins
// 				we increment a counter for each time a subarray sums to amount
// 				return the counter

// 3. pseudocode:
// 	coin_combos = [[]]
// 	for coin in coins:
// 		new_coin_combos = []
// 		for combo in coin_combo:
// 			current_amount = sum(combo)
// 			max_coin = Math.floor(current_amount/coin)
// 			added_coins = [];
// 			for i between 0 and max_coin:
// 				new_combo = [...combo, ...added_coins]
// 				new_coin_combos.push(new_combo)
// 				added_coins.push(coin);
// 		coin_combos.push(...new_coin_combos);
// 	valid_combo_count = 0;
// 	for each coin_combo in coin_combos:
// 		if sum(coin_combo) === amount:
// 			valid_combo_count ++;
// 	return valid_combo_count;

// 4. code:
function change(amount, coins) {
  let coin_combos = [[]];
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    let new_coin_combos = [];
    for (let j = 0; j < coin_combos.length; j++) {
      const combo = coin_combos[j];
      let current_amount = combo.reduce(
        (sum, single_coin) => sum + single_coin,
        0
      );
      const max_num_coin = Math.floor((amount - current_amount) / coin);
      let coins_to_add = [];
      for (let k = 0; k <= max_num_coin; k++) {
        const new_combo = [...combo, ...coins_to_add];
        new_coin_combos.push(new_combo);
        coins_to_add.push(coin);
      }
    }
    coin_combos = [...new_coin_combos];
    // console.log(coin_combos);
  }
  let valid_combo_count = 0;
  for (let i = 0; i < coin_combos.length; i++) {
    const coin_combo = coin_combos[i];
    const sum = coin_combo.reduce((sum, single_coin) => sum + single_coin, 0);
    if (sum === amount) {
      valid_combo_count++;
    }
  }
  return valid_combo_count;
}

console.log(change(50, [5, 2, 1]));
