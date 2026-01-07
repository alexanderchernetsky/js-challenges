class Counter {
    constructor() {
        this.counter = 0;
    }

    increment() {
        this.counter += 1;
    }

    decrement() {
        this.counter -= 1;
    }

    getValue() {
        console.log('counter value', this.counter);
        return this.counter;
    }
}

// modern Singleton implementation using ES Modules
// It works because:
// - You export an instance, not a class
// - ES modules are evaluated once
// - Imports share the same cached object
// - Mutating that object shares state across the app
export default new Counter();
