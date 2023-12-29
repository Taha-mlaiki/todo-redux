import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"todoSlice",
    initialState:[],
    reducers:{
        newTodo:(state,action)=>{
            state.push(action.payload);
        },
        removeTodo:(state,action)=>{
            return  state.filter((todo)=> todo.id !== action.payload)
        },
        completeTodo:(state,action)=>{
            return state.map((todo)=> todo.id === action.payload ? {...todo,completed:!todo.completed} : {...todo})
        },
        clearTodo:()=>{
            return []
        },
        newFormat:(state,action)=>{
            return state = [...action.payload]
        }
    }
})

export const {newTodo,removeTodo,completeTodo,clearTodo,newFormat} = todoSlice.actions;
export default todoSlice.reducer