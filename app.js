const form = document.querySelector('form#task-form');
const taskList = document.querySelector('ul.list-group');
const clearBtn = document.querySelector('.clear-button');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('.task-input');

loadEventListeners();

function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove Task Event(Delegation)
    taskList.addEventListener('click', removeTask);
    //Clear Tasks Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'list-group-item bg-light';
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(task));
        let a = document.createElement('a');
        a.setAttribute('href','#');
        a.innerHTML = '<span class="close">&times;</span>';
        p.appendChild(a);
        li.appendChild(p);
            
        //Append li to ul
        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e) {
    if(taskInput.value === '') {
        const inForm = document.querySelector('#input-form');
        if(inForm.childElementCount < 2) {
                let p = document.createElement('p');
                p.className = 'form-text text-danger';
                p.appendChild(document.createTextNode('Please enter a task'));
                inForm.appendChild(p);
                setTimeout(function(){
                    inForm.children[1].remove();
                },1500);
        } 
    } else {
        //Create li element
        const li = document.createElement('li');
        li.className = 'list-group-item bg-light';
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(taskInput.value));
        let a = document.createElement('a');
        a.setAttribute('href','#');
        a.innerHTML = '<span class="close">&times;</span>';
        p.appendChild(a);
        li.appendChild(p);
            
        //Append li to ul
        taskList.appendChild(li);
        //Store in local storage
        storeTaskInLocalStorage(taskInput.value);
    }
    
    taskInput.value = '';
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.classList.contains('close')) {
            e.target.parentElement.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement);
    }
    e.preventDefault();
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.firstChild.firstChild.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks(e) {
    if(JSON.parse(localStorage.getItem('tasks')).length === 0) {
        alert('There is nothing to clear');
    } else {
        if(confirm('Are you sure?')) {
            let taskArr = Array.from(taskList.children);
            taskArr.forEach(function(task) {
            task.remove();
          });
        }
    }
    removeAllTasksFromLocalStorage();
    e.preventDefault();
}

function removeAllTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(function(task) {
        const item = task.firstChild.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

    e.preventDefault();
}
