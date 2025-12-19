// Algo problem 2
// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

// Example 1:
// Input: nums = [-4,-1,0,3,10]
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
// After sorting, it becomes [0,1,9,16,100].
//
//
// Example 2:
// Input: nums = [-7,-3,2,3,11]
// Output: [4,9,9,49,121]

// SOLUTION 1
// time complexity O(n) + O(n log n) = O(n log n)
// Big-O keeps only the dominant (fastest-growing) term, and n log n grows faster than n.
function nonDecreasingArray(nums) {
    const squared = nums.map(num => num ** 2);
    const sorted = squared.sort((a, b) => a - b);

    return sorted;
}



// SOLUTION 2 - using a two-pointer technique
// Conceptually:
// Compare |nums[left]| and |nums[right]|
// Square the larger one
// Place it at the end of the result
// Move only one pointer
// Time: O(n) — each element processed once
// Space: O(n) — output array
function nonDecreasingArray2(nums) {
    let leftPointer = 0; // start of the array
    let rightPointer = nums.length - 1; // end of the array
    let i = nums.length - 1; // position where we place the next largest square

    const result = new Array(nums.length); // We fill result from right to left. We preallocate the array so we can assign values by index instead of using push().

    while (leftPointer <= rightPointer) {
        const a = nums[leftPointer] ** 2;
        const b = nums[rightPointer] ** 2;
        if (a > b) {
            // Put the larger of a and b at position i
            // Move only the pointer that produced that value
            // Decrement i to fill the next position to the left
            // This guarantees: largest values go to the end
            result[i] = a;
            i--;
            leftPointer++;
        } else {
            result[i] = b;
            i--;
            rightPointer--;
        }
    }

    return result;
}

// testing
console.log(nonDecreasingArray2([-4,-1,0,3,10])); // should be [0,1,9,16,100]
console.log(nonDecreasingArray2([-7,-3,2,3,11])); // should be [4,9,9,49,121]
