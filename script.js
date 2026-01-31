document.addEventListener('DOMContentLoaded',() =>{

    const todoInput = document.getElementById('to-do-input');
    let addTakBut = document.getElementById('add-task-bn');

    let todoList = document.getElementById('to-do-list');

 
 let task=JSON.parse(localStorage.getItem('task')) || [];
 task.forEach((task)=> renderTask(task));
 

 addTakBut.addEventListener('click',()=>{
    const taskText=todoInput.value.trim();
    if (taskText==='')  return;

    const newTask={
        id:Date.now(),
        text:taskText,
        completed:false
    };
        task.push(newTask);
        saveTask();
        renderTask(newTask);
        todoInput.value="" //clear input
        console.log(task);

 });

 function renderTask(singleTask){
    const li= document.createElement('li');
    li.setAttribute("data-id",singleTask.id);
    if(singleTask.completed) li.classList.add("completed");
    li.innerHTML=`
    <span>${singleTask.text}</span>
   <button class="delete-btn">Delete</button>

    `;

    li.addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON") return;
        singleTask.completed = !singleTask.completed;
        li.classList.toggle("completed");
        saveTask();
       




    });
    li.querySelector("button").addEventListener('click',(e) =>{
        e.stopPropagation()  // prevent toggle from firing
        task=task.filter(t=> t.id!==singleTask.id)
        li.remove();
        saveTask();
    })





    todoList.appendChild(li);

    

 }


 function saveTask(){
    localStorage.setItem('task',JSON.stringify(task))
 }


})