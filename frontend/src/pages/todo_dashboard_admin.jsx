import React, {useState, useEffect, useRef} from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosApi";
import TaskElement from "../elements/TaskElement";
import CreateTask from "../elements/CreateTask";

import {
    ListGroupItem,
    Popover,
    PopoverBody
} from 'reactstrap'



const TodoDashboard = () => {

    const [toggleRefreshProjectlist] = useOutletContext();
    const [popoverOpen, togglePopover] = useState(false);
    const [TaskAdd,toggleTaskAdd] = useState(false);
    const [refreshTasklist, toggleRefreshTasklist]= useState(true);
    const [sortResult, setSortResult] = useState("default");
    const [queryResult, setQueryResult] = useState([]);
    const [todoError, setTodoError] = useState(null);
    const { projectid } = useParams();
    const $titleInputRef = useRef();

    const handlePopover=()=>{
        togglePopover(!popoverOpen);
    }


    const sortDropdown=(event)=>{
        setSortResult(event.target.getAttribute("data-type"));
    }

    const handleTitleChange = (event) => {
        setTodoError(null);
    
        const title = $titleInputRef.current.value;
        if (title === queryResult["description"]) return;
    
        const errors = [];
        if(!title) errors.push("Project Name is required");
        if(title.lenght > 20) errors.push("Max length of Title is 20");
    
        if (errors.length > 0) {
            setTodoError(errors);
        } else {
            try {
                event.preventDefault();
                const axios = axiosInstance.put(`/project/${projectid}`, {
                    description: title,
                    flag: queryResult.flag,
                    sequence: queryResult.sequence
                });
                axios.then(res => {
                    getProjectDetails();
                    toggleRefreshProjectlist(true);
                }).catch(({response}) => {
                    //props.handleAlert(response.data.detail);
                });
                
            } catch (error) {
                throw error;
            }
        }
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(queryResult.tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        let temp_arr = queryResult;
        temp_arr.tasks = items;

        //Todo: apply to backend
        //setQueryResult(items);
    }

    useEffect(() => {
        getProjectDetails();

    }, [projectid, refreshTasklist]);

    const getProjectDetails = () => {
        const axios = axiosInstance.get(`/project/${projectid}/todo`);
        axios.then(res => {
            setQueryResult(res.data[0]);
        }).catch(({response}) => {
            
        });
    }
    
    return (
        <section className="vh-100 bg-light p-3">

            <div className="d-flex  justify-content-between pb-2 border-bottom">
                <div>

                    <input 
                        className="editable-textarea" 
                        placeholder="Project Name"
                        defaultValue={queryResult["description"]}
                        ref={$titleInputRef}
                        onBlur={handleTitleChange}
                        onKeyDown={event => {
                            if (event.keyCode === 13) {
                                event.target.blur();
                            }
                        }}
                    />
                    {todoError && <div className="text-danger">{todoError}</div>}
                </div>
                <div className="ps-2">
                    <div className="dropdown">
                        <button id="mypopover" className="btn p-0 m-0 " type="button" >
                            <i className="bi bi-sliders"></i>
                        </button>
                        <Popover
                            placement="bottom"
                            isOpen={popoverOpen}
                            target="mypopover"
                            toggle={handlePopover}
                            trigger='legacy'
                            offset={[-50,0]}
                        >
                            <PopoverBody >
                                <ul className="list-group">
                                    <li className="list-group-item border-0 w-100 p-0 m-0">
                                        <div className="d-flex   w-100 justify-content-between">
                                            <div className="p-2"><i className="bi bi-sort-down"></i> Sort By  </div>
                                            
                                            <div className="dropdown  p-1 m-0">
                                                    
                                                <button className="btn dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                {sortResult}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a className="dropdown-item" data-type="Priority" href="#" onClick={sortDropdown}>Priority</a></li>
                                                    <li><a className="dropdown-item" data-type="Assignee" href="#" onClick={sortDropdown}>Assignee</a></li>
                                                    <li><a className="dropdown-item" data-type="Project" href="#" onClick={sortDropdown}>Project</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </PopoverBody>
                        </Popover>
                    </div>

                </div>
            </div>
            

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="list-group list-group-flush" {...provided.droppableProps} ref={provided.innerRef}>

                            {queryResult["tasks"] && queryResult["tasks"].map((element, index) => {
                            return (
                                <TaskElement 
                                    key={index} 
                                    index={index} 
                                    element={element}
                                    toggleRefreshTasklist = {toggleRefreshTasklist}
                                />
                            );
                            })}
                            {provided.placeholder}

                            {
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

                            }       
                    </ul>
                    )}
                </Droppable>
            </DragDropContext> 
      
        </section>

    )
}



export default TodoDashboard;