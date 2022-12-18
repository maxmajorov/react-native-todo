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

    setTaskChecked(todoID: string, taskID: string) {
        const todo_ID = Object.keys(this.data.tasks).filter(el => el === todoID)[0];
        this.data.tasks[todoID].map(task => task.id === taskID && (task.isDone = !task.isDone));
    },

    addTodo(title: string) {
        const id = `ID_${this.data.todos.length + 1}`;
        this.data.todos = [...this.data.todos, { id, title }];
        this.data.tasks[id] = [];
    },

    addTask(title: string) {},
};
