document.addEventListener('DOMContentLoaded',()=>  {
    const inputTake=document.getElementById('inputTake');
    let sumbitIt =document.getElementById('sumbitIt');
    let addList=document.getElementById('addList');

    let task =JSON.parse(localStorage.getItem('task'))|| [];
    task.forEach((task) => (renderTask(task)));

    sumbitIt.addEventListener('click',()=>{
        let Text=inputTake.value.trim();
        if(Text==='') return;
        let newTask={
            id:Date.now(),
            text:Text,
            completed:false,
        };
        task.push(newTask);
            saveTask();
            renderTask(newTask);
            // console.log(task);
            

        
    });
   

    function  renderTask(eachTask){
        const li=document.createElement('li') ;
        li.setAttribute('d-id',eachTask.id)  ;
        if(eachTask.completed)
            { li.classList.add('completed') ; }
        li.innerHTML= `
        <span>${eachTask.text}</span>
        <button class='button-li'>delete </button> ` ;

        li.addEventListener('click',(e)=>{
        if(e.target.tagName==="BUTTON") return;
        eachTask.completed = !eachTask.completed;
        li.classList.toggle("completed");
        saveTask();
       




    });
    li.querySelector("button").addEventListener('click',(e) =>{
        e.stopPropagation()  // prevent toggle from firing
        task=task.filter(t=> t.id!==eachTask.id)
        li.remove();
        saveTask();
    })


    
    addList.appendChild(li);
    }



 function saveTask(){
    localStorage.setItem('task',JSON.stringify(task));
 }

})
