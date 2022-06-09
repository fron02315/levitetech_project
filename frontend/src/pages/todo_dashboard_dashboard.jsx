import React, {useState, useRef} from "react";
import axiosInstance from "../axiosApi";
import {
    ListGroup,
    ListGroupItem,
    Dropdown,
    Popover,
    DropdownMenu,
    PopoverBody,
    DropdownToggle,
    DropdownItem
} from 'reactstrap'

const TodoDashboard = () => {
    const [popoverOpen, togglePopover] = useState(false);
    const [sortResult, setSortResult] = useState("default");
    const [groupByResult, setGroupByResult] = useState("default");
    
   
    const haddlePopover=()=>{
        togglePopover(!popoverOpen);
    }
    const sortDropdown=(event)=>{
        setSortResult(event.target.getAttribute("data-type"));
    }
    const groupByDropdown=(event)=>{
        setGroupByResult(event.target.getAttribute("data-type"));
    }
    
    return (
        <section className="vh-100 bg-light p-3">
            
            <div className="container px-4">
                <h4> Administration Board</h4>
                <div className="row gx-3">
                    <div className="col">
                        <div className="p-3 border bg-light">
                            <h5>100</h5>
                            <div>
                                Critical Task
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-3 border bg-light">
                            <h5>20</h5>
                            <div>
                                Deadline passed
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-3 border bg-light">
                            <h5>50</h5>
                            <div>
                                In progress
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-3 border bg-light">
                            <h5>500</h5>
                            <div>
                                Completed
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="row gx-5 p-5">
                <div className="col border p-3">
                    <div className="d-flex  justify-content-between pb-2">
                        <div>
                            <h5> All Task </h5>
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
                                    toggle={haddlePopover}
                                    
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
                                            <li className="list-group-item border-0 w-100 p-0 m-0">
                                                <div className="d-flex   w-100 justify-content-between">
                                                    <div className="p-2"><i className="bi bi-menu-up"></i> Group By  </div>
                                                    
                                                    <div className="dropdown  p-1 m-0">
                                                         
                                                        <button className="btn dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {groupByResult}
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            <li><a className="dropdown-item" data-type="Priority" href="#" onClick={groupByDropdown}>Priority</a></li>
                                                            <li><a className="dropdown-item" data-type="Assignee" href="#" onClick={groupByDropdown}>Assignee</a></li>
                                                            <li><a className="dropdown-item" data-type="Project" href="#" onClick={groupByDropdown}>Project</a></li>
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
                    <ListGroup>
                        <ListGroupItem color="success">
                            <div className="d-flex justify-content-between">
                                <div>
                                    Family Project
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action href="#" tag="a"  >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <i className="bi bi-check-circle pe-2"></i>
                                    Clear up tax
                                    <span className="badge bg-danger ms-2">High</span>
                                </div>
                                <div className="onhover-wrap">
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-card-text"></i></button>
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-calendar-event"></i></button>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action href="#" tag="a" >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <i className="bi bi-check-circle pe-2"></i>
                                    Throw garbage
                                    <span className="badge bg-warning ms-2">Medium</span>
                                </div>
                                <div className="onhover-wrap">
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-card-text"></i></button>
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-calendar-event"></i></button>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action href="#" tag="a" >
                            <i className="bi bi-circle"></i>  Panda shit on the macbook
                        </ListGroupItem>
                        <ListGroupItem action href="#" tag="a" >
                            <i className="bi bi-circle"></i> Grizz want to slap panda ass
                        </ListGroupItem>
                        <ListGroupItem color="success">
                            <div className="d-flex justify-content-between">
                                <div>
                                    Get package from SF box
                                </div>
                                <div>
                                    +
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action href="#" tag="a" >
                            <i className="bi bi-check-circle"></i> Cook the dinner
                        </ListGroupItem>
                    </ListGroup>

                </div>
            </div>
        </section>

    )
}

export default TodoDashboard;