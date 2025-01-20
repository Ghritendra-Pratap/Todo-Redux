import { createSlice , PayloadAction } from "@reduxjs/toolkit";


export interface ITodo{
    id:number,
    title:string,
    completed:boolean
}

interface ITodoState{
    Todo:ITodo[]
}
const initialState : ITodoState ={
    Todo : []
}

const TodoSlice = createSlice({
    name:"Todo",
    initialState,
    reducers:{
        addTodo:(state,action: PayloadAction<{title: string}>)=>{
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            } 
            state.Todo.push(newTodo)
        },
        removeTodo:(state,action: PayloadAction<{id: number}>)=>{
            state.Todo = state.Todo.filter((todo) => todo.id !== action.payload.id)
        },
        toggleTodo:(state,action: PayloadAction<{id: number}>)=>{
            const todo = state.Todo.find((todo) => todo.id === action.payload.id)
            if (todo) {
                todo.completed = !todo.completed
            }
        }
    }
})

export const {addTodo , removeTodo , toggleTodo} = TodoSlice.actions
export default TodoSlice.reducer;