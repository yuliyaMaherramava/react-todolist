import React from 'react';
import {connect} from 'react-redux';
import { addTask } from '../../store/addtodo-reducer';
import {StateType} from '../../store/redux-store';
import Button from '@material-ui/core/Button';

type PropsType ={
    AddTask:() => void
};

const ButtonC: React.FC<PropsType> = (props) =>{ 
    let onAddTask = () => {
        props.AddTask();
        
    }
    return (
            <Button type='submit' onClick={onAddTask} variant="contained" color="primary">Add Task</Button>
    )
};


let mapStateToProps = (state:StateType) =>{
    return{
        
    }
};

let mapDispatchToProps = (dispatch:any) =>{
    return{
        AddTask: () => {
            dispatch(addTask());
        },
    }
};

const ButtonContainer = connect(mapStateToProps,mapDispatchToProps)(ButtonC);

export default ButtonContainer;