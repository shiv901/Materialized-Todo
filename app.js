// Const
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('#filter-todo');
const clearAll = document.querySelector('.btn-clr-all');

// Event Listners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterTodo.addEventListener('change', filterResults);
clearAll.addEventListener('click', function(e){
  e.preventDefault;
  localStorage.clear();
  for(i=0; i = todoList.children.length; i++){
    todoList.children[0].remove();
  }
})

// Functions
function addTodo(event) {
  event.preventDefault();

  // Create DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create Li
  const todoLi = document.createElement('li');
  todoLi.innerText = todoInput.value;
  todoDiv.classList.add('todo.row');
  todoDiv.appendChild(todoLi);

  // Save to LS
  addtodoToLS(todoInput.value);

  //Check Icon
  const completedBtn = document.createElement('button');
  completedBtn.classList.add('completed-btn');
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completedBtn);
  //trash Icon
  const trashBtn = document.createElement('button');
  trashBtn.classList.add('trash-btn');
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashBtn);

  // Append to List
  if (todoInput.value != '') {
    todoList.appendChild(todoDiv);
  } else {
    alert('Please Enter todo')
  }

  //Clear Input Field
  todoInput.value = ''
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;
  //Delete todo
  if (item.classList[0] === 'trash-btn') {
    todo.classList.add('fall');
    remtodoLS(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    })
  }

  //Checked todo
  if (item.classList[0] === 'completed-btn') {
    todo.classList.toggle('completed');
  }
}

// Filter Todo
function filterResults(e) {
  const filterResult = e.target.value;
  const todo = document.querySelectorAll('.todo');
  // console.log(todo);
  for (i = 0; i < todo.length; i++) {
    var selectedTodo = todo[i];
    switch (filterResult) {
      case 'all':
        selectedTodo.style.display = 'flex';
        break;

      case 'completed':
        if (selectedTodo.classList.contains('completed')) {
          selectedTodo.style.display = 'flex';
        } else {
          selectedTodo.style.display = 'none';
        }
        break;

      case 'uncompleted':
        if (!(selectedTodo.classList.contains('completed'))) {
          selectedTodo.style.display = 'flex';
        } else {
          selectedTodo.style.display = 'none';
        }
        break;
    }
  }
}

function addtodoToLS(todo) {
  // Check
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo) {
  // Check
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    // Create DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create Li
    const todoLi = document.createElement('li');
    todoLi.innerText = todo;
    todoDiv.classList.add('todo.row');
    todoDiv.appendChild(todoLi);

    //Check Icon
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completed-btn');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedBtn);
    //trash Icon
    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashBtn);

    // Append to List
    todoList.appendChild(todoDiv);
  
  })
}

function remtodoLS(todo) {
  // Check
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  
  localStorage.setItem('todos', JSON.stringify(todos));
}
