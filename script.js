let todoList = [];

function addTodo() {
  let inputElement = document.querySelector('#todo-in');
  let descElement = document.querySelector('#todo-desc');
  let dateElement = document.querySelector('#todo-date');
  let timeElement = document.querySelector('#todo-time');
  let priorityElement = document.querySelector('#todo-priority');
  let categoryElement = document.querySelector('#todo-category');

  let todoItem = inputElement.value;
  let todoDesc = descElement.value;
  let todoDate = dateElement.value;
  let todoTime = timeElement.value;
  let todoPriority = priorityElement.value;
  let todoCategory = categoryElement.value;

  if (todoItem && todoDate && todoTime) {
    todoList.push({ 
      item: todoItem, 
      desc: todoDesc,
      date: todoDate, 
      time: todoTime, 
      priority: todoPriority,
      category: todoCategory,
      status: 'Pending'
    });
    inputElement.value = '';
    descElement.value = '';
    dateElement.value = '';
    timeElement.value = '';
    priorityElement.value = 'low';
    categoryElement.value = 'work';
    displayItems();
  }
}

function displayItems() {
  let contElement = document.querySelector('#todo-cont');
  let completedElement = document.querySelector('#completed-cont');
  contElement.innerHTML = '';
  completedElement.innerHTML = '';

  todoList.forEach((todo, index) => {
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task', todo.priority);
    
    if (todo.status === 'Completed') {
      taskDiv.classList.add('completed');
      completedElement.appendChild(taskDiv);
    } else {
      if (isApproachingDeadline(todo.date, todo.time)) {
        taskDiv.classList.add('urgent');
      }
      contElement.appendChild(taskDiv);
    }

    if (todo.status === 'Pending' && isUrgent(todo.date, todo.time)) {
      taskDiv.classList.add('urgent');
    }

    taskDiv.innerHTML = `
      <strong>${todo.item} ❤️</strong> (Due: ${new Date(todo.date).toLocaleDateString()} at ${todo.time} IST) - 
      <em>${todo.desc}</em> - Category: ${todo.category} - Status: ${todo.status} 
      <button onclick="markComplete(${index})">Complete</button>
      <button onclick="deleteTodo(${index})">Delete</button>
    `;

    if (todo.status === 'Pending') {
      contElement.appendChild(taskDiv);
    } else {
      completedElement.appendChild(taskDiv);
    }
  });
}

function markComplete(index) {
  todoList[index].status = 'Completed';
  displayItems();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  displayItems();
}

function isApproachingDeadline(date, time) {
  let now = new Date();
  let dueDateTime = new Date(`${date}T${time}:00`);
  return (dueDateTime - now < 86400000) && (dueDateTime > now); 
}

function isUrgent(date, time) {
  let now = new Date();
  let dueDateTime = new Date(`${date}T${time}:00`);
  return dueDateTime <= now; // Removed the todoList check as it’s unnecessary
}

function checkReminders() {
  let now = new Date();
  todoList.forEach((todo, index) => {
    let dueDateTime = new Date(`${todo.date}T${todo.time}:00`);
    if (dueDateTime.getTime() <= now.getTime() && todo.status === 'Pending') {
      alert(`Reminder: "${todo.item}" is due now!`); // Corrected quotes
      todoList[index].status = 'Completed';
      displayItems();
    }
  });
}

// Check reminders every minute
setInterval(checkReminders, 60000);








