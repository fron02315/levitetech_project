import React, { useState, Fragment } from "react";
import { Draggable } from 'react-beautiful-dnd';
import PriorityBadge from "../elements/PriorityBadge";
import TagBadge from "../elements/TagBadge";
import { ListGroupItem } from "reactstrap";
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return (
        <Fragment>
            <Draggable key={`dnd-drag-${props.element.task_id}`} draggableId={props.element.id} index={props.element.id}>
                {(provided) => (
                    <ListGroupItem action href="#" tag="a"  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <i className="bi bi-check-circle pe-2"></i>
                                {props.element.description}
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
                    </ListGroupItem>
                )}
                
            </Draggable>
            


        <Modal 
            title="Basic Modal" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
                <Button form="task_modal" key="submit" type="primary" htmlType="submit">
                    Submit
                </Button>,
                <Button
                    key="link"
                    href="https://google.com"
                    type="secondary"
                    onClick={handleOk}
                >
                    Cancel
                </Button>,
                ]}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
      
      </Fragment>
    );
}

export default TaskElement;