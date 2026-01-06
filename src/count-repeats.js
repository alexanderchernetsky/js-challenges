// Input [4, 3, 2, 3, 3, 4, 1, 1, 3, 5, 6, 2, 3, 4, 5, 6, 2, 5, 2] // length N
// Output [4, 3, 3, 5, 2, 4, 1, 2, 5, 3, 6, 2] - flat array, where 4 is a number, and 3 is a number of how many times it’s encountered in the input array etc.

// Time complexity:
// time complexity O(n), where n - the length of the input array
// for loop - O(n) + .flat() - O(k) , where k - inner arrays
// So time complexity is O(n) + O(k)
// but since  k <= n, we simplify to O(n)
// The function below is already time-optimal.

// Space complexity:
// O(k), where k - each key in the Map
function countRepeated(input) {
    const counters = new Map();

    for (let i = 0; i < input.length; i++) {
        if (counters.has(input[i])) {
            const count = counters.get(input[i]);
            counters.set(input[i], count + 1);
        } else {
            counters.set(input[i], 1);
        }
    }

    return Array.from(counters).flat();
}

// Follow up question: can we use object in this fn?
// In theory we can, but
// 1. Keys in objects are always strings, so if you set counters[1], the key will be coerced to string
// 2. In a Map insertion order is guaranteed. In object rules are more complex.

const testInput1 = [4, 3, 2, 3, 3, 4, 1, 1, 3];
const expectedOutput1 = [4, 2, 3, 4, 2, 1, 1, 2];

console.log(countRepeated(testInput1));
