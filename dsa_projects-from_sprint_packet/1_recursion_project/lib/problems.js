// Write a function, lucasNumber(n), that takes in a number.
// The function should return the n-th number of the Lucas Sequence.
// The 0-th number of the Lucas Sequence is 2.
// The 1-st number of the Lucas Sequence is 1
// To generate the next number of the sequence, we add up the previous two numbers.
//
// For example, the sequence begins: 2, 1, 3, 4, 7, 11, ...
//
// Solve this recursively!
//
// Examples:
//
// lucasNumber(0)   // => 2
// lucasNumber(1)   // => 1
// lucasNumber(2)   // => 3
// lucasNumber(3)   // => 4
// lucasNumber(5)   // => 11
// lucasNumber(9)   // => 76

// 1. clarify/test I/O/edge cases:
// 	already clear; test I/O above; edge cases: negative numbers, non-integer -> N/A. Input will be pos int.
// 2. formulate approach:
// 		solve with memoization - lucasNumber(n) = lucasNumber(n-1) + lucasNumber(n-2)
// 		base case is n = 0
// 		once we hit n = 0, lucasNumber bubbles up using our memoization obeject
// 3. pseudocode:
// 		initialize memo object in args with keys of 0 and 1 equal to 2 and 1, respectively.
// 		if n not in memo: memo[n] = lucasNumber(n-1) + lucasNumber(n-2)
// 		return memo[n]
// 4. code:

function lucasNumber(n, memo = { 0: 2, 1: 1 }) {
  if (!memo[n]) {
    memo[n] = lucasNumber(n - 1) + lucasNumber(n - 2);
  }
  return memo[n];
}

// 5. example input:
// 6 time and space complexity:
// 		time: recursive function that makes 2n calls => O(n) time complexity
// 		space: memo object occupies n spaces in memory => O(n) space complexity

// ---------------------------------------------------------------------------------------
// Write a function, sumArray(array), that takes in an array of numbers.
// The function should return the total sum of the elements.
//
// Solve this recursively!
//
// Examples:
//
// sumArray([])             // => 0
// sumArray([5])            // => 5
// sumArray([5, 2])         // => 7
// sumArray([4, 10, -1, 2]) // => 15

// 1. clarify/test I/O/edge cases:
// 		clarify: can we mutate array? Assume yes
// 		test I/O above
// 		edge cases: empty array => 0, non-array -> N/A
// 2. formulate approach:
// 		solving RECURSIVELY - base case is empty array. Pop value and add to return of function call on mutated array.
// 3. pseudocode:
// 		check base case: if array.length = 0 return 0
// 		sum: val = array.pop()
// 		return val + sumArray(array)
// 4. code:

function sumArray(array) {
  if (array.length === 0) {
    return 0;
  }
  const val = array.pop();
  return val + sumArray(array);
}

// 5. example input:
// 6. time and space complexity:
// 		time: one recurvise call for each element
// 			array.length is constant time
// 			array.pop is constant time (NOTE that array.shift is O(n) time bc each element must be 'moved'!!!)
// 			-> O(n) time complexity.
// 		space: array occupies n space; val is overwritten each call -> O(1) time complexity

// ---------------------------------------------------------------------------------------
// Write a function, reverseString(str), that takes in a string.
// The function should return the string with it's characters in reverse order.
//
// Solve this recursively!
//
// Examples:
//
// reverseString("")            // => ""
// reverseString("c")           // => "c"
// reverseString("internet")    // => "tenretni"
// reverseString("friends")     // => "sdneirf"

// 1. clarify/test I/O/edge cases:
// 		assume string
// 		mutate? Assume no
// 2. formulate approach:
// 		pass an index - base case is index = str.length
// 		return the character at that index plus function called with incremented index
// 3. pseudocode:
// 			default arg of idx = 0
// 			default arg of new_str = ''
// 			check base case: if idx = str.length then return new_str
// 			otherwise new_str = new_str + str[idx]
// 4. code:
function reverseString(str, new_str = "") {
  // base case:
  if (str.length === new_str.length) {
    // 3 === 3 => true
    return new_str; //'cba'
  } else {
    new_str = str[new_str.length] + new_str; // 'ba' = str[2] + 'ba'  = 'cba'
    return reverseString(str, new_str); //reverseString('abc', 'cba')
  }
}
// 5. example input:
// reverseString('abc')
// 6. time and space complexity:
// 			time: .length lookup linear; adding to str linear; str.length function calls -> O(n) time complexity
// 			space: new_str occupies n space -> total of 2n space -> O(n) space complexity
// 				could reduce by mutating str but would increase time complexity (unshifting is n time)

// ---------------------------------------------------------------------------------------
// Write a function, pow(base, exponent), that takes in two numbers.
// The function should calculate the base raised to the exponent power.
//
// Note:
// A negative exponent can be calculate by taking the reciprocal of the positive exponent.
// That is, pow(2, -5) is equal to 1 / pow(2, 5)
//
// Solve this recursively!
//
// Examples:
//
// pow(2, 0)    // => 1
// pow(2, 1)    // => 2
// pow(2, 5)    // => 32
// pow(3, 4)    // => 81
// pow(2, -5)   // => 0.03125

// 1. clarify/test I/O/edge:
// 		edge: decimal powers?
// 2. formulate approach:
// 			solve recursively
// 			check if exponent is negative -> return 1 / pow(base, exponent * -1)
// 			base case: check if exponent is 0 -> return 1
// 			otherwise: return base * pow(base, exponent - 1)
// 3. pseudocode:
// 		if(exponent < 0) return 1/pow(base, exponent * -1)
// 		if(exponent === 0) return 1
// 		else return base * pow(base, exponent - 1)
// 4. code:
function pow(base, exponent) {
  if (exponent < 0) {
    return 1 / pow(base, exponent * -1);
  }
  if (exponent === 0) {
    return 1;
  } else {
    return base * pow(base, exponent - 1);
  }
}
// 5. example input:
// 6. time and space complexity:
//		time: num recursive calls is equal to exponent -> O(n) time complexity
// 		space: no additional space used in each function call -> O(1) space complexity

// ---------------------------------------------------------------------------------------
// A 1-dimensional array is also known as a flattened array.
// Write a method, flatten(data), that accepts a single argument. The
// method should take in an array of any dimension and return the flattened
// version of that array. Solve this recursively.
//
// Hint:
//  - if the argument is not an array, then we have reached the base case
//  - look up the documentation for how to check if data is an array or not
//
// Examples:
//
// array_1 = [1, 2, [[3, 4], [5, [6]]], [7, 8]]
// flatten(array_1)      // => [ 1, 2, 3, 4, 5, 6, 7, 8 ]
//
// array_2 = ['this', ['problem', 'is'], [['pretty', 'tough'], [[':)']]]]
// flatten(array_2)      // => [ 'this', 'problem', 'is', 'pretty', 'tough', ':)' ]
//
// flatten('base case')  // => [ 'base case' ]
//
// Another Hint:
//
// From the last example, you may be confused. We said that the method takes
// in an array as an arg, but we passed it a string?
// If data is not an array, then we can consider it as a 0-dimensional array.
//     0-dimensional array: 'some data'
//     1-dimensional array: ['some data']
//     2-dimensional array: [['some data']]
//     3-dimensional array: [[['some data']]]

// 1. clarify/test I/O/edge:
// 		clarify: can we mutate? Assume yes
// 		edge: non-array -> we consider it a 0-dim array and return an array with a single entry - the arg
// 2. formulate approach:
// 		two base cases:
// 			arg is not an array -> we return that element
// 			arg is an array and we are at the end of the array -> return our flattened array
// 		step through array one element at a time -> heading towards our base case of reaching the end of the array
// 		if that element is itself an array then we need to flatten it -> recursive call
// 		else if that element is anything other than an array, we step
//
// 3. pseudocode:
// 		default arg of flattened = []
// 		check if array: if data is not array: flattened.push(data)
// 		else if data is array:
// 				for each el in data:
// 						flattened.push(...flatten(el))
// 		return flattened
// 4. code:
function flatten(data) {
  let flattened = [];
  if (!Array.isArray(data)) {
    flattened.push(data);
  } else {
    for (let i = 0; i < data.length; i++) {
      flattened.push(...flatten(data[i]));
    }
  }
  return flattened;
}
// 5. example input:
// 6. time and space complexity:
// 		time complexity:
// 			Array.isArray is constant time
// 			.push is constant time
// 			n recursive calls, where n is the length of the flattened array
// 			at worst it is a * b time complexity (~polynomial, O(n^2)?)
// 				a is the maximum array dimension (degree of nesting) - from recursive call
// 				b is the maximum length of any nested array - from for loop
// 		space complexity: O(n) space complexity, where n is the length of the flattened array

// ---------------------------------------------------------------------------------------
// Write a function, fileFinder(directories, targetFile), that accepts an object representing directories and a string respresenting a filename.
// The function should return true, if the file is contained anywhere in the given directories.
// Note that directory names will begin with '/', but file names will not.
//
// Example:
//
// let desktop = {
//     '/images': {
//         'app_academy_logo.svg': null,
//         '/parks': {
//             'yosemite.jpeg': null,
//             'acadia.jpeg': null,
//             'yellowstone.png': null
//         },
//         '/pets': {
//             'trixie_lou.jpeg': null,
//             'rolo.jpeg': null,
//             'opal.jpeg': null,
//             'diana.jpeg': null,
//         }
//     },
//     '/music': {
//         'hey_programmers.mp3': null,
//         '/genres': {
//             '/rock': {
//                 'everlong.flac': null,
//                 'livin_on_a_prayer.mp3': null
//             },
//             '/hip_hop': {
//                 'express_yourself.wav': null,
//                 'ny_state_of_mind.mp3': null
//             }
//         }
//     }
// };

// fileFinder(desktop, 'app_academy_logo.svg');     // => true
// fileFinder(desktop, 'everlong.flac');            // => true
// fileFinder(desktop, 'sequoia.jpeg');             // => false

// 1. clarify/test I/O/edge:
// 		assume we solve recursive; assume valid inputs
// 2. formulate approach:
// 		depth or breadth first - let's do depth and solve recursively
// 		iterate through top level objects
// 		if first character is '/' -> recursive call on that directory slice
// 		otherise check if it matches targetFile - if so return true, else continue
// 3. pseudocode:
// 		found = false
// 		for each key in top level:
// 			if key[0] === '/' {
// 				if(fileFinder(value, targetFile)){
// 					found = true
// 					break
// 				}
// 				if(found){return true}
// 			}
// 			else if key === targetFile {found = true}
// 		return found
// 4. code:
function fileFinder(directories, targetFile) {
  let found = false;
  for (let key in directories) {
    if (key[0] === "/") {
      if (fileFinder(directories[key], targetFile)) {
        found = true;
        break;
      }
    } else if (key === targetFile) {
      found = true;
      break;
    }
  }
  return found;
}
// 5. example input:
// 6. time and space complexity:
// 		time: for loop with recursive call - at worst it is O(n*m) ~polynomial time
// 			n recursive calls based on depth;
// 			m for loops based on length
// 		space: only additional space used is for found variable - O(1) constant space

// ---------------------------------------------------------------------------------------
// Write another function, pathFinder(directories, targetFile), that returns the path that contains the targetFile.
// If the targetFile is not found in the directories, then return null.
// You can assume the files are unique.
//
// Example using the same desktop from previously:
//
// pathFinder(desktop, 'trixie_lou.jpeg'));     // => '/images/pets/trixie_lou.jpeg'
// pathFinder(desktop, 'everlong.flac'));       // => '/music/genres/rock/everlong.flac'
// pathFinder(desktop, 'honeybadger.png'));     // => null

// 1. clarify/test I/O/edge cases:
// 		assume targetFile is string; assume directories is valid object
// 2. formulate approach:
// 		same idea as before, except now if key === targetFile we need to return the key string
// 		this key string bubbles up - if fileFinder(args) !== null then we return key += file finder return value
// 		final return will be string, which is initialized to null - if file not found then string will remain as null
// 3. pseudocode:
// 		file_path = null; //initialize answer
// 		for key in directories: //iterate through top level:
// 			if key starts with '/':
// 					val = pathFinder(directories[key], targetFile)
// 					if val is not null:
// 							file_path = key + val;
// 							break
// 			else if key === targetFile:
// 					file_path = '/' + key;
// 					break
// 		return file_path
// 4. code:
function pathFinder(directories, targetFile) {
  let file_path = null;
  for (let key in directories) {
    if (key[0] === "/") {
      const val = pathFinder(directories[key], targetFile);
      if (val !== null) {
        file_path = key + val;
        break;
      }
    } else {
      if (key === targetFile) {
        file_path = "/" + key;
        break;
      }
    }
  }
  return file_path;
}
// 5. example input:
// 6. time and space complexity:
// 		time: main contributors are for loop and recursive calls
// 			number of recursive calls based on file tree depth
// 			loop length based on tree length
// 			overall time complexity at worst is polynomial O(n^2)
// 		space: additional use of space from file_path and val variables -> O(n) constant space

module.exports = {
  lucasNumber,
  sumArray,
  reverseString,
  pow,
  flatten,
  fileFinder,
  pathFinder,
};
