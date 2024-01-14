import { defineStore } from "pinia"

export default defineStore("ToDoList", {
    state: () => {
        return {
            todoListArr: [
                { name: "唱歌", flag: true },
                { name: "跳舞", flag: false },
                { name: "Rap", flag: false },
            ],
        }
    },
    actions: {
        addToDo(todo) {
            this.todoListArr.push(todo)
        },
        deleteToDo(todo) {
            this.todoListArr.splice(this.todoListArr.indexOf(todo), 1)
        },
        deleteToDoBatch(todos) {
            todos.value.forEach((item) => {
                this.todoListArr.forEach((i) => {
                    if (item == i.name)
                        this.todoListArr.splice(this.todoListArr.indexOf(i), 1)
                })
            })
        },
    },
    getters: {},
    persist: {
        enabled: true,
        strategies: [
            {
                key: "todolist",
                storage: sessionStorage,
            },
        ],
    },
})