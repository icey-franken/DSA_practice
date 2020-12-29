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
// // -----------------------------------------------------------------------------
// // inefficient - too much memory usage
// function change1(amount, coins) {
//   let coin_combos = [[]];
//   for (let i = 0; i < coins.length; i++) {
//     const coin = coins[i];
//     let new_coin_combos = [];
//     for (let j = 0; j < coin_combos.length; j++) {
//       const combo = coin_combos[j];
//       let current_amount = combo.reduce(
//         (sum, single_coin) => sum + single_coin,
//         0
//       );
//       const max_num_coin = Math.floor((amount - current_amount) / coin);
//       let coins_to_add = [];
//       for (let k = 0; k <= max_num_coin; k++) {
//         const new_combo = [...combo, ...coins_to_add];
//         new_coin_combos.push(new_combo);
//         coins_to_add.push(coin);
//       }
//     }
//     coin_combos = [...new_coin_combos];
//     // console.log(coin_combos);
//   }
//   let valid_combo_count = 0;
//   for (let i = 0; i < coin_combos.length; i++) {
//     const coin_combo = coin_combos[i];
//     const sum = coin_combo.reduce((sum, single_coin) => sum + single_coin, 0);
//     if (sum === amount) {
//       valid_combo_count++;
//     }
//   }
//   return valid_combo_count;
// }

// // -----------------------------------------------------------------------------
// // still too much memory usage - memoization!
// function change2(amount, coins) {
// 	if(coins.length === 0 && amount === 0){
// 		return 1;
// 	} else if(coins.length === 0 && amount !== 0){
// 		return 0;
// 	}
// 	// ensure coins sorted smallest to largest
//   coins.sort((a, b) => b - a);
//   // we want to avoid adding tons of arrays that will never sum to amount on our last loop
//   // 	i.e. if coin is 1, on last loop it will generate at least n arrays, where n is amount, and only one of those arrays will be valid
//   let coin_combos = [[]];
//   for (let i = 0; i < coins.length; i++) {
//     const coin = coins[i];
//     // we know that we are on our last loop if coins.length-1 === i
//     // on this loop we only want to add coin combos that sum to amount
//     if (coins.length - 1 !== i) {
//       new_coin_combos = change_on_not_last_loop(amount, coin_combos, coin);
//       coin_combos = [...new_coin_combos];
//     } else {
//       return change_on_last_loop(amount, coin_combos, coin);
//     }
//   }

//   function change_on_not_last_loop(amount, coin_combos, coin) {
//     let new_coin_combos = [];
//     for (let j = 0; j < coin_combos.length; j++) {
//       const combo = coin_combos[j];
//       let current_amount = combo.reduce(
//         (sum, single_coin) => sum + single_coin,
//         0
//       );
//       const max_num_coin = Math.floor((amount - current_amount) / coin);
//       let coins_to_add = [];
//       for (let k = 0; k <= max_num_coin; k++) {
//         const new_combo = [...combo, ...coins_to_add];
//         new_coin_combos.push(new_combo);
//         coins_to_add.push(coin);
//       }
//     }
//     return new_coin_combos;
//   }
// }

// function change_on_last_loop(amount, coin_combos, last_coin) {
//   // sum each coin combo passed into this function
//   num_valid_coin_combos = coin_combos.reduce(
//     (num_valid_coin_combos, coin_combo) => {
//       const sum = coin_combo.reduce((sum, coin) => sum + coin, 0);
//       const current_amount = amount - sum;
//       // check if amount - current_sum is 0 OR evenly divisible by last_coin
//       if (current_amount === 0 || current_amount % last_coin === 0) {
//         // if so, increment counter
//         num_valid_coin_combos++;
//       }
//       return num_valid_coin_combos;
//     },
//     0
//   );
//   // return counter
//   return num_valid_coin_combos;
// }

// -----------------------------------------------------------------------------
// still too much memory usage - memoization!
// we know that each array generated will be unique because of how we are looping
// therefore we don't need to store coin combo arrays - we only need to store the amount
// we assume that duplicate amounts are generated using different combos and are therefore unique
// we don't care about the individual amounts either - we care about the number of unique ways to reach a particular amount
// if we add a single coin to a particular amount, that adds one way we can reach that same amount
// // at the end of our function, what we care about are the number of unique ways to reach the specified amount - which will be memo[amount]!

// function change(amount, coins) {
//   if (amount === 0) {
//     return 1;
//   } else if (coins.length === 0 && amount !== 0) {
//     return 0;
//   }
//   let memo = { 0: 0, [amount]: 0 };

//   // ensure coins sorted smallest to largest
//   coins.sort((a, b) => b - a);
//   // we want to avoid adding tons of arrays that will never sum to amount on our last loop
//   // 	i.e. if coin is 1, on last loop it will generate at least n arrays, where n is amount, and only one of those arrays will be valid
//   coins.forEach((coin, idx) => {
//     // we know that we are on our last loop if coins.length-1 === i
//     // on this loop we only want to add coin combos that sum to amount
//     if (coins.length - 1 !== idx) {
//       memo = change_on_not_last_loop(amount, memo, coin);
//     } else {
//       memo = change_on_last_loop(amount, memo, coin);
//     }
//   });
//   return memo[amount];
// }

// function change_on_not_last_loop(amount, memo, coin) {
//   let current_amounts = Object.keys(memo);
//   current_amounts.forEach((current_amount) => {
//     current_amount = parseInt(current_amount, 10);
//     const max_num_coin = Math.floor((amount - current_amount) / coin);
//     for (let i = 1; i <= max_num_coin; i++) {
//       const new_amount = current_amount + i * coin;
//       if (memo[new_amount]) {
//         // if we have already reach this amount, we increment the number of ways we can reach it
//         memo[new_amount]++;
//       } else {
//         // if we haven't reached this amount, initialize it as 1
//         memo[new_amount] = 1;
//       }
//     }
//   });
//   return memo;
// }

// function change_on_last_loop(amount, memo, last_coin) {
//   // we only care about the current_amounts that can reach exactly amount with some multiple of the last coin
//   // there is no use updating the memo for combos that add to anything but amount
//   let current_amounts = Object.keys(memo);
//   current_amounts.forEach((current_amount) => {
//     const remaining_amount = amount - current_amount;
//     if (remaining_amount > 0 && remaining_amount % last_coin === 0) {
//       memo[amount]++;
//     }
//   });
//   return memo;
// }

// // -----------------------------------------------------------------------------
// // still too much memory usage - break it into pieces
// function change(amount, coins, memo = { 0: 0 }) {
//   // account for edge case of amount = 0
//   if (amount === 0) {
//     return 1;
//     // account for edge case of no coins and non-zero amount
//   } else if (coins.length === 0) {
//     return 0;
//   }
//   // go through all but last coin
//   for (let i = coins.length - 1; i > 0; i--) {
//     const coin = coins[i];
//     const current_amounts = Object.keys(memo);
//     current_amounts.forEach((current_amount) => {
//       // convert each current amount string to an integer
//       current_amount = parseInt(current_amount, 10);
//       max_num_coin = Math.floor((amount - current_amount) / coin);
//       // add between 1 and max_num_coin to current_amount
//       for (let i = 1; i <= max_num_coin; i++) {
//         const new_amount = current_amount + i * coin;
//         if (!memo[new_amount]) {
//           memo[new_amount] = 1;
//         } else {
//           memo[new_amount]++;
//         }
//       }
//     });
//   }

//   const coin = coins[0];
//   // console.log(memo[amount]);
//   const total_num_combos_with_last_coin = Object.entries(memo).reduce(
//     (total_num_combos, [current_amount, num_combos]) => {
//       current_amount = parseInt(current_amount, 10);
//       console.log(current_amount === 0, amount, current_amount, num_combos);
//       const remaining_amount = amount - current_amount;
//       // console.log(remaining_amount, remaining_amount % coin === 0)
//       if (remaining_amount % coin === 0) {
//         return total_num_combos + num_combos;
//       } else {
//         return total_num_combos;
//       }
//     },
//     0
//   );
//   // console.log(total_num_combos_with_last_coin, memo[amount])
//   // console.log(memo)
//   if (amount % coin === 0) {
//     return total_num_combos_with_last_coin + 1;
//   } else {
//     return total_num_combos_with_last_coin;
//   }
// }

// -----------------------------------------------------------------------------
// late night brain blast...
// still doesn't work - using shift or pop results in different answers
// I still can't wrap my head around this...
// function change(amount, coins, memo = { 0: 1 }) {
//   if (coins.length === 0) {
//     // if amount reached, return count
//     // if amount not reached return 0 - set in our default memo value
//     // case of amount = 0 taken care of - seeded with value of 1
//     if (amount === 0) {
//       return 1;
//     } else if (!memo[amount]) {
//       return 0;
//     } else {
// 			console.log(memo);
//       return memo[amount];
//     }
//   }
//   coin = coins.pop();
//   amount_list = Object.keys(memo);
//   for (let i = 0; i < amount_list.length; i++) {
//     current_amount = parseInt(amount_list[i], 10);
//     max_num_coin = Math.floor((amount - current_amount) / coin);
//     for (let j = 1; j <= max_num_coin; j++) {
//       const new_amount = current_amount + j * coin;
//       if (memo[new_amount]) {
//         memo[new_amount]++;
//       } else {
//         memo[new_amount] = 1;
//       }
//     }
//   }
//   return change(amount, coins, memo);
// }

// -----------------------------------------------------------------------------
// using the internet
// function change(amount, coins) {
//     // initialize our memo
//   // each key is an amount and each value is the number of ways we can reach that amount
//   let memo = { 0: 1 };
//   for (let i = 1; i <= amount; i++) {
//     memo[i] = 0;
//   }
//   // console.log(memo)
//   coins.forEach((coin) => {
//     for (let curr_amt = 0; curr_amt <= amount; curr_amt++) {
//       if (curr_amt >= coin) {
//         memo[curr_amt] += memo[curr_amt - coin];
//       }
//     }
//   });
//   return memo[amount];
// }
// what the fuck this is so simple
// I am upset
// not really
// but
// I spent so much time trying to reinvent the wheel
// this is a classical dynamic programming problem

// result with shift:
// {
//   '0': 1,
//   '1': 1,
//   '2': 2,
//   '3': 2,
//   '4': 3,
//   '5': 4,
//   '6': 5,
//   '7': 5,
//   '8': 6,
//   '9': 6,
//   '10': 8
// }
// 8

// result with pop:
// {
//   '0': 1,
//   '1': 1,
//   '2': 2,
//   '3': 2,
//   '4': 3,
//   '5': 4,
//   '6': 5,
//   '7': 6,
//   '8': 7,
//   '9': 8,
//   '10': 10
// }
// 10

// --------------------------------------
// fresh attempt a few days later:
function change(amount, coins) {
  let ways = [1];
  for (let i = 0; i < amount; i++) {
    ways.push(0);
  }
  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    for (let curr_amt = 1; curr_amt < ways.length; curr_amt++) {
      if (coin > curr_amt) {
        continue;
      } else {
        const prev_amt = curr_amt - coin;
        ways[curr_amt] = ways[curr_amt] + ways[prev_amt];
      }
    }
  }
  return ways[amount];
}

console.log(change(5, [2, 5])); //1
console.log(change(5, [1, 2, 5])); // 4
console.log(change(10, [1, 2])); //6
console.log(change(500, [2, 7, 13])); //717
console.log(change(100, [3, 5, 7, 8, 9, 10, 11])); // 6606
console.log(change(500, [1, 2, 5])); //12701

console.log(change(500, [3, 5, 7, 8, 9, 10, 11]));

console.log(change(10, [1, 2, 5])); //10
