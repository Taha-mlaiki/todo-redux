import { useRef, useState } from 'react'
import './App.css'
import sun from "../public/images/icon-sun.svg"
import moon from "../public/images/icon-moon.svg"
import { useSelector,useDispatch } from 'react-redux';
import { newTodo, removeTodo,completeTodo,clearTodo,newFormat } from './todoSlice';
import { nanoid } from 'nanoid';
function App() {

  const [todo,setTodo] = useState({
    id:nanoid(),
    title:"",
    completed:false
  });
  const dispatch = useDispatch();
  const todosValue = useSelector(state => state.todo );

  const [filter,setFilter] = useState("all")

  
  function hundelChange(e){
    setTodo({
      id:nanoid(),
      title: e.target.value ,
      completed:false
    })
  }
  function hundelSubmit(e){
    const todoValue = e.target.todo.value.trim()
    e.preventDefault();
    if(todoValue !== "") {
      dispatch(newTodo(todo))
      e.target.todo.value = "";
      setTodo({})
    }
  }
  const dragTodo = useRef();
  const dragOverTodo = useRef();

  function hundelSort(){
    const todoClone = [...todosValue];
    console.log(todoClone)
    const temp = todoClone[dragTodo.current];

    todoClone[dragTodo.current] = todoClone[dragOverTodo.current];
    todoClone[dragOverTodo.current] = temp;
    console.log(todoClone)
    dispatch(newFormat(todoClone))
  }
  
  function todoResult(){
    const newState = []
      if(filter === "all"){
          todosValue.map((todo)=> ( newState.push(todo) ))
      }else if(filter === "active"){
        todosValue.map((todo)=> !todo.completed ? newState.push(todo): null)

      }else if (filter === "completed"){
        todosValue.map((todo)=> todo.completed ? newState.push(todo): null)
      }
      

      return newState.map((state,index)=>(<label className="check" draggable key={state.id}
        onDragStart={()=> dragTodo.current = index}
        onDragEnter={()=> dragOverTodo.current = index}
        onDragEnd={hundelSort}
        onDragOver={(e)=> e.preventDefault()}

      >
      <input onChange={()=> dispatch(completeTodo(state.id))} checked={state.completed} type="checkbox" name="" id="" />
      <p className='ms-4 text-break'>{state.title}</p>
      <div onClick={()=>dispatch(removeTodo(state.id))} className='delete'>X</div>
      </label>))
  }
  const [theme,setTheme] = useState("dark")


  return (
    <>
    <div className={`position-relative back ${theme}`}>
      <div className='back-img'></div>
      <div className="container-sm">
        <div className="todo">
          <div className="logo d-flex align-items-center justify-content-between">
            <h1 className='m-0'>TODO</h1>
            {theme === "dark" ? <img onClick={()=>setTheme("light")} src={sun} alt="" /> : <img onClick={()=>setTheme("dark")} src={moon} alt="" />}
          </div>
          <form action="" onSubmit={hundelSubmit}>
          <input onChange={(e)=> hundelChange(e)} name='todo' placeholder='Create a new todo...' autoComplete="off" type="text" />
          </form>
          <div className='todoList'>
            {todoResult()}
            <div className='info'>
              {todosValue && todosValue.length > 0 ? <span>{todosValue.length} Item left</span>:<span>No Item</span>}
              <div>
                <span onClick={()=> setFilter("all")} className={`mx-2 ${filter === "all"?"active":null}`}>All</span>
                <span onClick={()=> setFilter("active")} className={`mx-2 ${filter === "active"?"active":null}`}>Active</span>
                <span onClick={()=> setFilter("completed")} className={`mx-2 ${filter === "completed"?"active":null}`}>Completed</span>
              </div>
              <span onClick={()=> dispatch(clearTodo())}>Clear Completed</span>
            </div>
          </div>
            <div className='mobile-info'>
                <span onClick={()=> setFilter("all")} className={`mx-2 ${filter === "all"?"active":null}`}>All</span>
                <span onClick={()=> setFilter("active")} className={`mx-2 ${filter === "active"?"active":null}`}>Active</span>
                <span onClick={()=> setFilter("completed")} className={`mx-2 ${filter === "completed"?"active":null}`}>Completed</span>
            </div>
        </div>
      </div>
        <p className='mt-5 mb-0 text-center'>Drag and drop to reorder list</p>
    </div>
    </>
  )
}

export default App
