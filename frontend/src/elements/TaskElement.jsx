import React, { useState, Fragment } from "react";
import { Draggable } from 'react-beautiful-dnd';
import PriorityBadge from "../elements/PriorityBadge";
import TagBadge from "../elements/TagBadge";
import UpdateTask from "../elements/UpdateTask";
import axiosInstance from "../axiosApi";
import { 
    Button,Modal 
} from 'antd';

const TaskElement = (props) =>{
    var deadline_string = "";
    if (props.element.task_deadline){
        var dateParts = new Date(props.element.task_deadline); // Valid Date
        deadline_string = dateParts.toLocaleString('default', { month: 'long' }) +" "+ dateParts.getDate();
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMouseHover, setIsMouseHover] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
            <Draggable key={props.element.task_id} draggableId={props.element.task_id} index={props.index}>
                {(provided) => (
                    <li className="list-group-item"  key={props.element.id}  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        
                        <div className="d-flex justify-content-between">
                            <div>
                                <span role="button" onClick={onClickFlag} onMouseEnter={onMouseHoverHandler} onMouseLeave={onMouseHoverHandler}>
                                    {(!isMouseHover &&  !props.element.flag) || (isMouseHover && props.element.flag ) ? (
                                        <i className="bi bi-circle pe-2"></i>
                                    ):(
                                        <i className="bi bi-check-circle pe-2"></i>
                                    )}

                                    
                                </span>
                                <span className={(props.element.flag ? 'task-description-flag':'' )}>
                                    {props.element.description}
                                </span>
                                <PriorityBadge priority = {props.element.task_priority} />
                            </div>
                            <div className="onhover-wrap">
                                <button type="button" className="btn btn-light onhover-button" onClick={showModal}><i className="bi bi-pen"></i></button>
                                <button type="button" className="btn btn-light onhover-button"><i className="bi bi-trash"></i></button>
                            </div>
                        </div>
                        <div className="d-flex onhover-wrap">
                            {props.element.task_deadline && (
                                <div>
                                    <Button type="text" className="text-danger onhover-button" title="Deadline">
                                        <i className="bi bi-calendar pe-1"></i>
                                        {deadline_string}
                                    </Button>
                                </div>
                            )}
                            {props.element.task_tag && (
                                <div className="mt-1  onhover-button">
                                    <TagBadge  tagelement={props.element.task_tag} />
                                </div>
                            )}
                            
                        </div>
                    </li>
                )}
            </Draggable>

            <Modal 
                title=''
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}
                width={1000}
            >
                <UpdateTask
                    element = {props.element}
                    toggleRefreshTasklist = {props.toggleRefreshTasklist}
                />
               
            </Modal>
      
        </Fragment>
    );
}

export default TaskElement;