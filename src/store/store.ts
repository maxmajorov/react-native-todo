export const store = {
    data: {
        todos: [
            { id: 'ID_1', title: 'What to learn' },
            { id: 'ID_2', title: 'What to buy' },
        ],
        tasks: {
            ['ID_1' as string]: [
                { id: '1', title: 'HTML', isDone: true },
                { id: '2', title: 'CSS', isDone: true },
                { id: '3', title: 'JS/TS', isDone: false },
            ],
            ['ID_2']: [
                { id: '1', title: 'Keyboard', isDone: true },
                { id: '2', title: 'Dispalay', isDone: true },
                { id: '3', title: 'Proc i9', isDone: false },
            ],
        },
    },

    getTodos() {
        return this.data.todos;
    },

    getTasks(id: string) {
        const todo_ID = Object.keys(this.data.tasks).filter(el => el === id)[0];
        return this.data.tasks[todo_ID];
    },

    addTodo(title: string) {
        const id = `ID_${this.data.todos.length + 1}`;
        this.data.todos = [...this.data.todos, { id, title }];
        this.data.tasks[id] = [];
    },

    deleteTodo(todoID: string) {
        const todo_ID = Object.keys(this.data.tasks).filter(el => el === todoID)[0];
        this.data.todos = this.data.todos.filter(t => t.id !== todo_ID);
        delete this.data.tasks[todo_ID];
    },

    addTask(title: string) {},

    changeTaskStatus(todoID: string, taskID: string, status: boolean) {
        this.data.tasks = {
            ...this.data.tasks,
            todoID: store.data.tasks[todoID].map(task =>
                task.id === taskID ? { ...task, isDone: status } : task,
            ),
        };
    },

    changeTaskTitle(todoID: string, taskID: string, title: string) {
        this.data.tasks = {
            ...this.data.tasks,
            todoID: store.data.tasks[todoID].map(task =>
                task.id === taskID ? { ...task, title } : task,
            ),
        };

        console.log(store);
    },
};
