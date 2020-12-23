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
// inefficient - too much memory usage
function change1(amount, coins) {
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

// we assume
function change2(amount, coins) {
	if(coins.length === 0 && amount === 0){
		return 1;
	} else if(coins.length === 0 && amount !== 0){
		return 0;
	}
	// ensure coins sorted smallest to largest
  coins.sort((a, b) => b - a);
  // we want to avoid adding tons of arrays that will never sum to amount on our last loop
  // 	i.e. if coin is 1, on last loop it will generate at least n arrays, where n is amount, and only one of those arrays will be valid
  let coin_combos = [[]];
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    // we know that we are on our last loop if coins.length-1 === i
    // on this loop we only want to add coin combos that sum to amount
    if (coins.length - 1 !== i) {
      new_coin_combos = change_on_not_last_loop(amount, coin_combos, coin);
      coin_combos = [...new_coin_combos];
    } else {
      return change_on_last_loop(amount, coin_combos, coin);
    }
  }

  function change_on_not_last_loop(amount, coin_combos, coin) {
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
    return new_coin_combos;
  }
}

function change_on_last_loop(amount, coin_combos, last_coin) {
  // sum each coin combo passed into this function
  num_valid_coin_combos = coin_combos.reduce(
    (num_valid_coin_combos, coin_combo) => {
      const sum = coin_combo.reduce((sum, coin) => sum + coin, 0);
      const current_amount = amount - sum;
      // check if amount - current_sum is 0 OR evenly divisible by last_coin
      if (current_amount === 0 || current_amount % last_coin === 0) {
        // if so, increment counter
        num_valid_coin_combos++;
      }
      return num_valid_coin_combos;
    },
    0
  );
  // return counter
  return num_valid_coin_combos;
}

// console.log(change2(5, [5, 2, 1]));
console.log(change2(500, [3, 5, 7, 8, 9, 10, 11]));
