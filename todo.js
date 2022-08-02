
const todoObje ={
    todoInput:document.querySelector("#todoInput"),
    form:document.querySelector("#todo-form"),
    alert:document.createElement("div"),
    cardBody : document.querySelector(".card-body"),
    todoList : document.querySelector(".list-group"),
    newTodo: this.form.querySelector("input"),
    secondCardBody : document.querySelectorAll(".card-body")[1],
    clearButton : document.querySelector("#clear-todos"),

    displayMessage(message,type){

        this.alert.className=`alert alert-${type}`;
        this.alert.textContent=message
        this.cardBody.appendChild(this.alert)
    
        setTimeout(() => {
            this.alert.remove()
        }, 1000);
    },
    addTodoToUI(newTodo){
        
        const listItem = document.createElement("li")
        const link = document.createElement("a")

        link.href= "#";
        link.className="delete-item"
        link.innerHTML= "<i class = 'fa fa-remove'></i>"
        listItem.className="list-group-item d-flex justify-content-between"
    
        listItem.appendChild(document.createTextNode(newTodo))
        listItem.appendChild(link)
        this.todoList.append(listItem)
        
    },
    getTodoFromStorage(){
        let todos;
    
        if(localStorage.getItem("todos") === null){
            todos= [];
        }
        else{
            todos= JSON.parse(localStorage.getItem("todos"))
        }
        return todos;
    },
    addTodoToStorage(newTodo){
        let todos = this.getTodoFromStorage();
    
        todos.push(newTodo)
        localStorage.setItem("todos",JSON.stringify(todos))
    },
    
    loadAllTodos(todos){
        todos.forEach(todo => {
            this.addTodoToUI(todo)
        })
    
    },
    addTodo(){
        if(this.newTodo.value === ""){
            this.displayMessage("Lütfen bir to do giriniz","danger")
        }
        else{
            this.addTodoToUI(this.newTodo.value)
            this.addTodoToStorage(this.newTodo.value)
            this.newTodo.value = ""
        }
    },
    
    deleteTodoFromUI(element){
    
        element.parentElement.parentElement.remove()
        this.displayMessage("To do silindi","warning")
    },
    deleteFromStorage(deleteTodo){
        let todos = this.getTodoFromStorage()
    
        todos.forEach((todo,index) =>{
            if(todo === deleteTodo){
                todos.splice(index,1)
                return;
            }
        })
        localStorage.removeItem("todos");
        localStorage.setItem("todos",JSON.stringify(todos));
    },
    clearAllTodosFromStorage(){
        localStorage.removeItem("todos");
    },
    clearAllTodosFromUI(){
    
        while(this.todoList.firstElementChild !== null){
            this.todoList.firstElementChild.remove()
        }
    },
    clearAllTodos(){
        if(confirm("Tümünü silmek istiyor musunuz?")){
            this.clearAllTodosFromUI()
            this.clearAllTodosFromStorage()
        }
    },
    
    submitForm(){
        this.form.addEventListener("submit",(e)=>{
            e.preventDefault();
            this.addTodo()
        })

        document.addEventListener("DOMContentLoaded",()=>{
            let todos = this.getTodoFromStorage()
            this.loadAllTodos(todos)
        })
        this.secondCardBody.addEventListener("click",(e) => {

                if(e.target.className === "fa fa-remove"){
                    this.deleteTodoFromUI(e.target)
                    this.deleteFromStorage(e.target.parentElement.parentElement.textContent)
                }
        })

        this.clearButton.addEventListener("click",() => {
            this.clearAllTodos()
        })
    },
    
}
todoObje.submitForm()


