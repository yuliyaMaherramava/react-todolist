const ADD_POST = 'ADD_POST';
const UPDATE_NEW_TASK_TEXT = 'UPDATE_NEW_TASK_TEXT';

type TaskType = {
    id:number
    name: string
    idParent: number
}

type InitialStateType =  {
    newTaskText: string
    tasks: Array<TaskType> 
};
 
let initialState: InitialStateType = {
    newTaskText: '',  
    tasks: []
 };

type UpdateNewTaskTextType = {
    type: typeof UPDATE_NEW_TASK_TEXT
    newText: string
};

 //action Creator
 export const updateNewTaskText = (text:string):UpdateNewTaskTextType => {
    return {
        type: UPDATE_NEW_TASK_TEXT,
        newText : text,
    }
 };

 type AddTaskType = {type: typeof ADD_POST};

 //action Creator
 export const addTask = ():AddTaskType => {
    return {
        type: ADD_POST
    }
 };

 type ActionsType = UpdateNewTaskTextType | AddTaskType;

 const reducer = (state = initialState, action:ActionsType) =>{
    switch(action.type){
        case UPDATE_NEW_TASK_TEXT:{
            return{
                ...state,
                newTaskText: action.newText,
            }
        }
        case ADD_POST:{
            let newTask = {
                id: state.tasks.length + 1,
                name: state.newTaskText,
                idParent:1
            }
            return{
                ...state,
                tasks: [...state.tasks, newTask],
                newTaskText: ''
            }
        }
        default:
            return state;

    }
 }

 export default reducer;