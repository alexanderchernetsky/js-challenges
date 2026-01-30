/**
 * Merge Sort Algorithm
 *
 * Implement the merge sort algorithm.
 * Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.
 * It works by dividing an array into two halves, sorting each half, and then merging the two sorted halves back together.
 */

// solution
/**
 * Merges two sorted arrays into one sorted array.
 * @param {number[]} left
 * @param {number[]} right
 * @returns {number[]}
 */
function merge(left, right) {
    const result = [];
    let leftPointer = 0;
    let rightPointer = 0;

    while (leftPointer < left.length && rightPointer < right.length) {
        if (left[leftPointer] < right[rightPointer]) {
            result.push(left[leftPointer]);
            leftPointer++;
        } else {
            result.push(right[rightPointer]);
            rightPointer++;
        }
    }

    while (leftPointer < left.length) {
        result.push(left[leftPointer]);
        leftPointer++;
    }

    while (rightPointer < right.length) {
        result.push(right[rightPointer]);
        rightPointer++;
    }

    return result;
}

/**
 * Recursively sorts an array using merge sort.
 * @param {number[]} arr
 * @returns {number[]}
 */
function mergeSort(arr) {
    // Base case: an array of 0 or 1 element is already sorted - exit recursion
    if (arr.length <= 1) return arr;

    const left = 0;
    const right = arr.length;
    const mid = Math.floor((left + right) / 2);

    const leftArr = arr.slice(left, mid);
    const rightArr = arr.slice(mid, right);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

// UI Logic
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('array-input');
    const sortButton = document.getElementById('sort-button');
    const resultDisplay = document.getElementById('sort-result');
    const originalDisplay = document.getElementById('original-array');

    if (sortButton) {
        sortButton.addEventListener('click', () => {
            const input = inputField.value;
            const arr = input.split(',').map(item => parseInt(item.trim())).filter(item => !isNaN(item));

            if (arr.length === 0) {
                resultDisplay.textContent = 'Please enter a valid list of numbers.';
                return;
            }

            originalDisplay.textContent = arr.join(', ');
            const sorted = mergeSort(arr);
            resultDisplay.textContent = sorted.join(', ');
        });
    }
});

// Export for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mergeSort, merge };
}
