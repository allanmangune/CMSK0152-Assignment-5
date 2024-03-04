    const dataStore = new Store();

    /**
     * Resets the biding of data to the taskTable.
     */
    function refreshListOfTasks() {
        const taskBody = document.getElementById('taskBody');
        taskBody.innerHTML = '';

        dataStore.loadTasks().forEach((task, rowIndex) => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${task.name}</td>
                <td>
                    <button type="button" class="btn btn-info btn-sm" onclick="showEditModal(${rowIndex})">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(${rowIndex})">Delete</button>
                </td>
            `;
            taskBody.appendChild(tableRow);
        });
    }

    /**
     * Displays modal for editing a task.
     * @param {*} index 
     */
    function showEditModal(index) {
        const existingTask = dataStore.loadTasks()[index];
        document.getElementById('editTaskName').value = existingTask.name;
        $('#editTaskModal').modal('show');

        document.getElementById('updateTaskBtn').onclick = function() {
            let taskName = document.getElementById('editTaskName').value;
            if(taskName.trim() === ''){
                alert('Please enter the task name.');
                return;
            }
            existingTask.name = taskName;
            refreshListOfTasks();
            $('#editTaskModal').modal('hide');
            document.getElementById('editTaskForm').reset();
        };
    }

    /** 
    Deletes a task from the dataStore and refreshes the taskTable.
    * @param {*} index
    */
    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            dataStore.deleteTask(index);
            refreshListOfTasks();
        }
    }

    /* 
        Sorts the items in the dataStore in ascending order based on the task name.
    */
    function sortTask(){
        dataStore.sort();
        refreshListOfTasks();
    }

    /*
    Sets up an event listener for the saveTaskBtn click event.
    */
    document.getElementById('saveTaskBtn').addEventListener('click', function() {
        var taskName = document.getElementById('taskName').value;
        if(taskName.trim() === ''){
            alert('Please enter the task name.');
            return;
        }
        dataStore.addTask({name: taskName});
        refreshListOfTasks();
        $('#addTaskModal').modal('hide');
        document.getElementById('taskForm').reset();
    });

    /*
        Deletes all items in the dataStore and refreshes the taskTable.
    */
    function deleteAllTasks() {
        if(dataStore?.data?.length != 0){
            if (confirm("Are you sure you want to delete all tasks?")) {
                dataStore.data = [];
                refreshListOfTasks();
            }
        }
    }

    /* 
        Deletes a task based on the value entered in the
        input element found under the table of tasks.
    */
    function deleteTaskFromInput() {
        const taskNameToDelete = document.getElementById('deleteTaskInput').value;
        const indexToDelete = dataStore.data.findIndex(task => task.name.toLowerCase().trim() === taskNameToDelete?.toLowerCase().trim());
        if (indexToDelete !== -1) {
            if (confirm("Are you sure you want to delete all tasks?")) {
                dataStore.data.splice(indexToDelete, 1);
                console.log(`Task with name '${taskNameToDelete}' deleted.`);
                refreshListOfTasks();
                document.getElementById('deleteTaskInput').value = '';
            }
        } else {
            alert('Task name does not exist.');
        }
    }