// Write a function, lucasNumberMemo(n), that takes in a number.
// The function should return the n-th number of the Lucas Sequence.
// The 0-th number of the Lucas Sequence is 2.
// The 1-st number of the Lucas Sequence is 1
// To generate the next number of the sequence, we add up the previous two numbers.
//
// For example, the sequence begins: 2, 1, 3, 4, 7, 11, ...
//
// Solve this recursively with memoization.
//
// Examples:
//
// lucasNumberMemo(0)   // => 2
// lucasNumberMemo(1)   // => 1
// lucasNumberMemo(40)  // => 228826127
// lucasNumberMemo(41)  // => 370248451
// lucasNumberMemo(42)  // => 599074578

// 1. clarify/test I/O/edge:
// 		clarify: only integers >= 0
// 		input: int; output: int
// 		edge: N/A
// 2. formulate approach
// 		solve recursively. lucasNumber(n) is lucasNumber(n-1) + lucasNumber(n-2)
// 		check memo object for value of n - if it exists, return that value
// 		if it doesn't exist, make a recusive call and set it's return value in memo
// 3. pseudocode:
// 		if n in memo: return memo[n]
// 		else memo[n] = lucasNumber(n-1) + lucaasNumber(n-2)
// 			return memo[n]
// 4. code:            ***remember to pass the memo object!
function lucasNumberMemo(n, memo = { 0: 2, 1: 1 }) {
  //n = 3                               // n = 2                      //n = 1               //n = 0          //n = 1
  if (!memo[n]) {
    //memo[3] == false                                                       // memo[2] = false            //memo[1] = true     //memo[0] = true  //memo[1] = true
    memo[n] = lucasNumberMemo(n - 1, memo) + lucasNumberMemo(n - 2, memo); //memo[3] = 3 + 1     // memo[2] = 1 + 2 = 3
  }
  return memo[n]; //return 4                                                  //return 1            //return 2       //return 1
}
// 5. example input:
// 6. time and space complexity:
// 			time: two recursive calls per recursive call -> 2^(n-1) exponential time complexity without memoization?
// 				memoization reduces this to linear time because once a call for each value of n has been made, the function call is constant time (lookup time in obj)
// 				e.g. for n = 5, call fn(5)
// 												call fn(4)                  +                   fn(3),
// 												call fn(3)        +         fn(2)	              fn(2)               +            fn(1)
// 												call fn(2)        + fn(1)   fn(1) + fn(0)       fn(1) + fn(0)
//												call fn(1) + fn(0)
//          we only actually calculate for fn(2), 3, 4, and 5 once - all subsequent calls are lookup in memo obj, therefore time complexity is linear (O(n))
// 		space: space used is that for the memo object - O(n) space complexity

// ---------------------------------------------------------------------------
// Write a function, minChange(coins, amount), that accepts an array of coin values
// and a target amount as arguments. The method should the minimum number of coins needed
// to make the target amount. A coin value can be used multiple times.
//
// After you pass the first 3 examples, you'll likely need to memoize your code
// in order to pass the 4th example in a decent runtime.
//
// Examples:
//
// minChange([1, 2, 5], 11)         // => 3, because 5 + 5 + 1 = 11
// minChange([1, 4, 5], 8))         // => 2, because 4 + 4 = 8
// minChange([1, 5, 10, 25], 15)    // => 2, because 10 + 5 = 15
// minChange([1, 5, 10, 25], 100)   // => 4, because 25 + 25 + 25 + 25 = 100

// 1. clarify/test I/O/edge cases:
// 			clarify: only integers, assume valid inputs for both args; assume input array sorted from largest to smallest
// 			test I/O: input - array of ints, int; output - int
// 			edge: N/A
// 2. formulate approach:
// 			first thought: begin with largest coin
// 					divide total by largest coin and round down for max num of that coin
// 					add num coins to running total of current number of coins
// 					find remainder with total mod largest coin
// 					repeat for next largest coin using same approach with total being the previous remainder
// 					continue until no coins remain
// 					repeat this using second largest coin after resetting counter
// 					if current counter becomes larger than stored min number of coins, stop early
// 					begin again with next largest coin until you reach the end, assuming it's 1 this solution is trivial
// 			memoization:
// 					we could store an array of the coins used - length of this array is the number of coins.
// 					by storing all coins, in order, we could use shallow equality to determine if combination already used
// 					alternative: store key val pairs of total amount and min num coins required to get there
// 			idea is that by starting with the largest coin value we are aiming towards the minimum number of coins
// 3. pseudocode:
// 			min_num_coins = infinity
// 			current_coins = [...coins]
//	 		loop from i = 0 to coins.length
// 				current_num_coins = 0
// 				current_total = amount
//
// 				loop from i = current_coins.length - 1 to 0
// 					current_coin = current_coins[i]
// 					num_coin = math.floor(current_total/current_coin)
// 					current_total -= (current_coin * num_coin)
// 					current_num_coins += num_coin
// 				if current_total = 0 and current_num_coins < min_num_coins: min_num_coins = current_num_coins
// 				current_coins.pop()  //remove largest coin and try again - current_coins should be [] on last loop
// 			if min_num_coins === infinity: return 'impossible'
// 			else: return min_num_coins

function minChange1(coins, amount, memo = {}) {
  let min_num_coins = Infinity;
  let current_coins = [...coins];
  for (let i = 0; i < coins.length; i++) {
    let current_num_coins = 0;
    let current_total = amount;
    for (let i = current_coins.length - 1; i >= 0; i--) {
      current_coin = current_coins[i];
      num_coin = Math.floor(current_total / current_coin);
      current_total -= current_coin * num_coin;
      current_num_coins += num_coin;
      if (current_num_coins > min_num_coins) {
        break;
      }
    }
    current_coins.pop();
    if (current_total === 0 && current_num_coins < min_num_coins) {
      min_num_coins = current_num_coins;
    }
  }
  return min_num_coins;
}

function minChange(coins, amount, memo = { [amount]: 0 }) {
  // console.log(memo, coins.length);

  // for (let i = 0; i < coins.length; i++) {
  // for (let i = coins.length - 1; i >= 0; i--) {
  // let prev_num_coins = memo[amount];
  console.log("amount remaining: ", amount, "memo[amount]: ", memo[amount]);
  current_coin = coins[coins.length - 1];
  max_num_current_coin = Math.floor(amount / current_coin);
  for (let j = 1; j <= max_num_current_coin; j++) {
    const curr_amount = amount - j * current_coin;
    let curr_num_coins = memo[amount] + j;
    // if (
    //   memo[curr_amount] !== undefined &&
    //   memo[curr_amount] < curr_num_coins
    // ) {
    //   curr_num_coins = memo[curr_amount];
    // } else
    if (memo[curr_amount] === undefined || memo[curr_amount] > curr_num_coins) {
      memo[curr_amount] = curr_num_coins;
    }
    minChange(coins.slice(0, coins.length - 1), curr_amount, memo);
  }

  if (coins.length === 0) {
    return memo[0];
  }
  console.log(memo);
  // }
  // return memo[0];
}
// console.log(83 +83 +83 +83 +83+ 83+ 83+ 83+ 83+ 83+ 83+ 83+ 83+ 186 +408 +408 +408 +408  +419 +419 +419 +419 +419 +419 +419)
// console.log(5830-6249)
console.log(minChange([1, 2, 5], 11)); // => 3, because 5 + 5 + 1 = 11
// console.log(minChange([1, 4, 5], 8)); // => 2, because 4 + 4 = 8
// console.log(minChange([1, 5, 10, 25], 15)); // => 2, because 10 + 5 = 15
// console.log(minChange([1, 5, 10, 25], 100)); // => 4, because 25 + 25 + 25 + 25 = 100
// console.log(minChange([83, 186, 408, 419], 6249)); //20
module.exports = {
  lucasNumberMemo,
  minChange,
};
