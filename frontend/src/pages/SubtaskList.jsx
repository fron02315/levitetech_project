import React, {useState} from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const SubtaskList = (props) => {
    const [TaskAdd,toggleTaskAdd] = useState(false);
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

        <section className="overflow-auto p-3">
            <DragDropContext onDragEnd={handleOnDragEndSubTask}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="list-group list-group-flush" {...provided.droppableProps} ref={provided.innerRef}>

                            {/* {props.subtask && props.subtask.map((element, index) => {
                            return (
                                <TaskElement 
                                    key={index} 
                                    index={index} 
                                    element={element}
                                    toggleRefreshTasklist = {toggleRefreshTasklist}
                                />
                            );
                            })} */}
                            {provided.placeholder}

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

                            }        */}
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