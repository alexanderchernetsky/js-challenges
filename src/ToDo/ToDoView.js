class ToDoView {
    constructor() {
        this.appContainer = document.querySelector('.todo');
        this.form = this.appContainer.querySelector('#todo-form');
        this.input = this.appContainer.querySelector('.todo-input');
        this.todoList = this.appContainer.querySelector('.todo-list');
    }

    renderItems(items) {
        this.todoList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            this.todoList.appendChild(li);
        });
    }

    listenToAddItemEvent(handler) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            const newItem = this.input.value;
            if (!newItem) return;
            handler(newItem);
            this.input.value = '';
        })
    }

    listenToRemoveItemEvent(handler) {
        this.todoList.addEventListener('click', e => {
            const text = e.target.textContent;
            handler(text);
        })
    }
}

export default ToDoView;
