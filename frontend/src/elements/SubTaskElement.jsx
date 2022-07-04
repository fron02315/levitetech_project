import React, { useState, Fragment } from "react";
import { Draggable } from 'react-beautiful-dnd';
import PriorityBadge from "./PriorityBadge";
import TagBadge from "./TagBadge";
import EditSubTask from "../elements/EditSubTask";
import axiosInstance from "../axiosApi";
import { 
    Button,Modal 
} from 'antd';

const SubTaskElement = (props) =>{
    var deadline_string = "";
    if (props.element.subtask_deadline){
        var dateParts = new Date(props.element.subtask_deadline); // Valid Date
        deadline_string = dateParts.toLocaleString('default', { month: 'long' }) +" "+ dateParts.getDate();
    }

    const [iseditSubTask, setIseditSubTask] = useState(false);
    const [isMouseHover, setIsMouseHover] = useState(false);

    const editSubTask = () => {
        setIseditSubTask(true);
    };

    const handleOk = () => {
        setIseditSubTask(false);
    };

    const handleCancel = () => {
        setIseditSubTask(false);
    };

    const onMouseHoverHandler = () =>{
        setIsMouseHover(!isMouseHover);
    }

    const onClickFlag = (event) => {
        try {
            event.preventDefault();
            const axios = axiosInstance.patch(`/task/${props.element.id}`, {
                flag: !props.element.flag
            });
            axios.then(res => {
                props.toggleRefreshTasklist((prevState) => (!prevState));
            }).catch(({response}) => {

            });
            
        } catch (error) {
            throw error;
        }
    }
    return (
        <Fragment>
            <Draggable key={props.element.subtask_id} draggableId={props.element.subtask_id} index={props.index}>
                {(provided) => (
                    <li className="list-group-item"  key={props.element.id}  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {iseditSubTask ? (

                        <EditSubTask
                            toggleSubTaskAdd = {setIseditSubTask} 
                            toggleRefreshTasklist = {props.toggleRefreshTasklist}
                            task_id = {props.task_id}
                            subtask = {props.element}
                        />
                    ):(
                        <Fragment>
                        
                            <div className="d-flex justify-content-between">
                                <div>
                                    <span role="button" onClick={onClickFlag} onMouseEnter={onMouseHoverHandler} onMouseLeave={onMouseHoverHandler}>
                                        {(!isMouseHover &&  !props.element.flag) || (isMouseHover && props.element.flag ) ? (
                                            <i className="bi bi-circle pe-2"></i>
                                        ):(
                                            <i className="bi bi-check-circle pe-2"></i>
                                        )}

                                        
                                    </span>
                                    <span className={(props.element.flag ? 'subtask-description-flag':'' )}>
                                        {props.element.description}
                                    </span>
                                    <PriorityBadge priority = {props.element.subtask_priority} />
                                </div>
                                <div className="onhover-wrap">
                                    <button type="button" className="btn btn-light onhover-button" onClick={editSubTask}><i className="bi bi-pen"></i></button>
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-trash"></i></button>
                                </div>
                            </div>
                            <div className="d-flex onhover-wrap">
                                {props.element.subtask_deadline && (
                                    <div>
                                        <Button type="text" className="text-danger onhover-button" title="Deadline">
                                            <i className="bi bi-calendar pe-1"></i>
                                            {deadline_string}
                                        </Button>
                                    </div>
                                )}
                                {props.element.subtask_tag && (
                                    <div className="mt-1  onhover-button">
                                        <TagBadge  tagelement={props.element.subtask_tag} />
                                    </div>
                                )}
                                
                            </div>
                        </Fragment>

                    )}
                </li>
                )}
            
            
                
                </Draggable>

      
        </Fragment>
    );
}

export default SubTaskElement;