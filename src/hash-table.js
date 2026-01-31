/**
 * Hash Table Challenge
 *
 * Implement a Hash Table class using only arrays.
 * The Hash Table should support the following methods:
 * - set(key, value): Inserts or updates a key-value pair.
 * - get(key): Retrieves the value associated with a key.
 * - remove(key): Removes a key-value pair.
 * - keys(): Returns an array of all keys in the table.
 *
 * Handle collisions using the separate chaining method (arrays of arrays).
 */

// solution
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
        // [
        //      [[key1, value1]],
        //      [[key2, value2], [key3, value3]],
        // ]
    }

    _hash(key) {
        let hash = 0;

        for (let i= 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % this.keyMap.length; // this will always return an index in range [0, size-1].
        }

        return hash;
    }

    set(key, value) {
       const index = this._hash(key);

        // initialise empty array
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        // check if the key already exists in the bucket and update instead of pushing duplicate
        for (let pair of this.keyMap[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        this.keyMap[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key);
        if (!this.keyMap[index]) return undefined;
        const pair = this.keyMap[index].find(item => item[0] === key);
        return pair ? pair[1] : undefined;
    }

    remove(key) {
       const index = this._hash(key);
       const bucket = this.keyMap[index];
       if (!bucket) return;

       this.keyMap[index] = bucket.filter(item => item[0] !== key);
       if (this.keyMap[index].length === 0) {
           this.keyMap[index] = undefined;
       };
    }

    keys() {
        const allKeys = [];
        for (let bucket of this.keyMap) {
            if (!bucket) continue;
            for (let [key, value] of bucket) {
                allKeys.push(key);
            }
        }
        return allKeys;
    }
}

// UI Logic
document.addEventListener('DOMContentLoaded', () => {
    const hashTable = new HashTable(17);
    const keyInput = document.getElementById('hash-key');
    const valueInput = document.getElementById('hash-value');
    const setBtn = document.getElementById('set-btn');
    const getBtn = document.getElementById('get-btn');
    const removeBtn = document.getElementById('remove-btn');
    const listKeysBtn = document.getElementById('list-keys-btn');
    const output = document.getElementById('hash-output');
    const storageDisplay = document.getElementById('storage-display');

    const updateStorageDisplay = () => {
        if (!storageDisplay) return;
        let content = 'Internal Array Storage:\n';
        hashTable.keyMap.forEach((bucket, index) => {
            if (bucket && bucket.length > 0) {
                content += `Index ${index}: ${JSON.stringify(bucket)}\n`;
            }
        });
        storageDisplay.textContent = content;
    };

    const showOutput = (message, isError = false) => {
        output.textContent = message;
        output.style.color = isError ? '#e74c3c' : '#2e7d32';
    };

    setBtn.addEventListener('click', () => {
        const key = keyInput.value.trim();
        const value = valueInput.value.trim();
        if (!key || !value) {
            showOutput('Please enter both key and value', true);
            return;
        }
        hashTable.set(key, value);
        showOutput(`Set: ${key} => ${value}`);
        updateStorageDisplay();
        keyInput.value = '';
        valueInput.value = '';
    });

    getBtn.addEventListener('click', () => {
        const key = keyInput.value.trim();
        if (!key) {
            showOutput('Please enter a key to search', true);
            return;
        }
        const val = hashTable.get(key);
        if (val !== undefined) {
            showOutput(`Found: ${key} => ${val}`);
        } else {
            showOutput(`Key "${key}" not found`, true);
        }
    });

    removeBtn.addEventListener('click', () => {
        const key = keyInput.value.trim();
        if (!key) {
            showOutput('Please enter a key to remove', true);
            return;
        }

        const exists = hashTable.get(key) !== undefined;
        hashTable.remove(key);

        if (exists) {
            showOutput(`Removed key: ${key}`);
            updateStorageDisplay();
        } else {
            showOutput(`Key "${key}" not found`, true);
        }
        keyInput.value = '';
    });

    listKeysBtn.addEventListener('click', () => {
        const keys = hashTable.keys();
        showOutput(`All keys: ${keys.join(', ') || 'none'}`);
    });

    updateStorageDisplay();
});
