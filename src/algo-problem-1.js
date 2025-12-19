// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

// Bonus: You must implement a solution with a linear runtime complexity and use only constant extra space.

// Example 1:
// Input: nums = [2,2,1]
// Output: 1

// Example 2:
// Input: nums = [4,1,2,1,2]
// Output: 4

// Example 3:
// Input: nums = [1]


// solution 1

// ✅ Linear time: O(n)
// ❌ Not constant space — Map uses extra memory
function singleNumber(nums) {
    if (nums.length === 1) {
        return nums[0];
    }

    const occurrences = new Map();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (occurrences.has(num)) {
            occurrences.delete(num);
        } else {
            occurrences.set(num, 1);
        }
    }

    const nonRepeatedNumber = occurrences.keys().next().value; // occurrences.keys() returns a Map iterator, not the key itself.

    return nonRepeatedNumber;
}


// solution 2
// ✅ O(n) time
// ✅ O(1) space
function singleNumber2(nums) {
    let result = 0;

    for (const num of nums) {
        result ^= num; // ^ - XOR keeps what’s unique and deletes what appears twice.
    }

    return result;
}


// testing

console.log(singleNumber([2,2,1])); // should be 1
console.log(singleNumber([4,1,2,1,2])); // should be 4
console.log(singleNumber([1])); // should be 1
