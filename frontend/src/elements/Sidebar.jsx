import React, { useState, useEffect } from "react";
import { Link , Outlet} from "react-router-dom";
import CreateProject from "./CreateProject";
import CustomModal from "./CustomModal";
import axiosInstance from "../axiosApi";
import AlertMessage from "./AlertMessage"

const Sidebar = () => {
    const [modalProject, toggleProjectAdd]= useState(false);
    const [project, toggleProject]= useState([]);
    const [refreshProjectlist, toggleRefreshProjectlist]= useState(true);
    const [alertContent, toggleAlertContent]= useState("");
    const [visible, toggleVisible]= useState(true);

    useEffect(() => {
        if(!refreshProjectlist) return;
        const axios = axiosInstance.get('/project/');
        axios.then(res => {
            toggleProject(res.data);
        }).catch(({response}) => {
            
        });
        toggleRefreshProjectlist(false);
    }, [refreshProjectlist]);

    
    const handleclose=()=>{
        toggleVisible(!visible)
    }

    const handleCreateClick=()=>{
        toggleProjectAdd(!modalProject);
    }


    const handleAlert=(target)=>{
        toggleVisible(true)
        toggleAlertContent(target.message);
        // if(target.type=="project"){
            
        // }
    }
    
    return (
        <div className="container-fluid">
            

            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">My Project</span>
                        </a>
                        <ul className="nav nav-pills nav-justified flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link px-0 text-decoration-none"><i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline ">Home</span> </Link>
                            </li>
                            <li >
                                <Link to="/todo" className="nav-link px-0 text-decoration-none"><i className="bi bi-window-dock"></i> <span className="ms-1 d-none d-sm-inline ">My Console</span> </Link>
                            </li>
                            <li>
                                <div className="d-flex">
                                    <div>
                                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                            <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">To-Do Admin</span>
                                        </a>
                                    </div>
                                    <div className="align-middle d-none d-sm-inline pt-2 ps-1">
                                        <button className="btn p-0 m-0 text-primary fs-4" type="button" onClick={handleCreateClick}> <i  className="bi bi-plus"></i></button>
                                    </div>
                                </div>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    
                                    {
                                        
                                       project && project.map((each) => {
                                            return (
                                                <li key={each.id}>
                                                    <Link  to={`/todo_admin/${each.id}`} className="text-decoration-none"> <span className="ms-1 d-none d-sm-inline ">{each.description}</span> </Link>
                                                </li>
                                            );
                                        })
                                    }

                                </ul>
                            </li>
                        </ul>
                        <hr/>
                        <div className="dropdown pb-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1">loser</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                {/* <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                    {modalProject && (
                        <CustomModal
                        isOpen = {modalProject}
                        toggle={handleCreateClick}
                        width={800}
                        renderContent={ <CreateProject  toggle={handleCreateClick} handleAlert = {handleAlert} project={project} toggleProject={toggleProject} />}
                        />
                    )}
                    {
                        alertContent.length > 0 && (
                            <AlertMessage content={alertContent} handleclose={handleclose} visible={visible}/> 
                        )
                    }
                    
                    <Outlet 
                        context={[toggleRefreshProjectlist]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;