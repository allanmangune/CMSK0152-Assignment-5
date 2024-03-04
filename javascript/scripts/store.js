/**
 * Represents a class that stores the task data.
 */
class Store {
    constructor() {
        this.data = [];
    }

    /**
     * Adds a task to the data property.
     * @param {*} task 
     */
    addTask(task) {
        this.data.push(task);
    }

    /**
     * Loads all data from the store.
     * @returns an array of tasks.
     */
    loadTasks() {
        return this.data;
    }

    /**
     * Deletes a task from the data array.
     * @param {*} index 
     */
    deleteTask(index) {
        this.data.splice(index, 1);
    }

    /**
     * Sorts the data in ascending order.
     */
    sort(){
        this.data.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    }

}