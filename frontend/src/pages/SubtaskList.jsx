import React, {useState} from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CreateSubTask from "../elements/CreateSubTask";
import SubTaskElement from "../elements/SubTaskElement";

const SubtaskList = (props) => {
    const [SubTaskAdd,toggleSubTaskAdd] = useState(false);
    function handleOnDragEndSubTask(result) {
        if (!result.destination) return;

        // const items = Array.from(queryResult.tasks);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);

        // let temp_arr = queryResult;
        // temp_arr.tasks = items;

        //Todo: apply to backend

    }

    return (

        <section className="">
            <DragDropContext onDragEnd={handleOnDragEndSubTask}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="list-group list-group-flush" {...provided.droppableProps} ref={provided.innerRef}>

                            {props.subtask && props.subtask.map((element, index) => {
                            return (
                                <SubTaskElement 
                                    key={index} 
                                    index={index} 
                                    element={element}
                                    task_id = {props.task_id}
                                    toggleRefreshTasklist = {props.toggleRefreshTasklist}
                                />
                            );
                            })} 
                            {provided.placeholder}

                            {SubTaskAdd  ? (
                                    <CreateSubTask
                                        toggleSubTaskAdd = {toggleSubTaskAdd} 
                                        task_id = {props.task_id}
                                    />
                                ): (
                                    <ul className="list-group list-group-flush" >
                                        <li  role="button" className="list-group-item hover-text-red border-bottom">
                                            <div className="p-2 pe-auto" onClick={() => toggleSubTaskAdd(!SubTaskAdd)}>
                                                <i className="bi bi-plus-lg"></i> Add new SubTask  
                                            </div>
                                        </li>
                                    </ul>
                            )}      
                    </ul>
                    )}
                </Droppable>
            </DragDropContext> 
            {/* {
                !TaskAdd && (
                    
                    <ListGroupItem action href="#" tag="a" className="hover-text-red">
                        <div className="p-2 pe-auto" onClick={() => toggleTaskAdd(!TaskAdd)}>
                            <i className="bi bi-plus-lg"></i> Add new Task  
                        </div>
                    </ListGroupItem>
                )

            }    
            {
                TaskAdd && (
                    <CreateTask
                        refreshList = {getProjectDetails}
                        toggleClose = {toggleTaskAdd}
                        queryResult = {queryResult}
                        projectid = {projectid}
                        toggleRefreshTasklist = {toggleRefreshTasklist}
                    />
                )

            }   */}
        </section>

    )
}



export default SubtaskList;