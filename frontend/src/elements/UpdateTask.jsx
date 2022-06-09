import React, { Fragment, useEffect, useState} from "react";
import axiosInstance from "../axiosApi";
import SubtaskList from "../pages/SubtaskList";
import CreateSubTask from "../elements/CreateSubTask";
import CreateComment from "../elements/CreateComment";
import { taskPriorityColorsClass } from "../style/todo";
import { TaskPriority } from "../constant/todo";

import moment from 'moment'
import { 
    DatePicker,
    Select,
    Form,
    Collapse,
    DatePickerProps
} from 'antd';

const UpdateTask = (props) =>{
    const [userlist, toggleUserlist] = useState([]);
    const [SubTaskAdd,toggleSubTaskAdd] = useState(false);
    const [commentAdd,toggleCommentAdd] = useState(false);
    useEffect(() => {
        const axios = axiosInstance.get('/authentication/user/list/');
        axios.then(res => {
            toggleUserlist(res.data);
        }).catch(({response}) => {
            
        });

    }, []);

    const UpdateElement= (field, value)=>{
        console.log(value);
        var field_arr = new FormData();
        //Todo: apply ALL to backend
        
        field_arr.append(field,value);


        try {
            const axios = axiosInstance.patch(`/task/${props.element.id}`, field_arr);
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
            <div className="p-2">
                <div className="row">
                    <div className=" col-md-9 col-sm-12">
                        <button onClick={(event)=>UpdateElement("task_status", false)} type="button" className="btn btn-light">
                            <i className="bi bi-trash"></i>
                        </button>
                        Task : 
                        <span>{props.element.task_id}</span>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className=" col-md-8 col-sm-12">
                        <div className="row">
                            <div className="col">
                                <input 
                                    className="editable-textarea" 
                                    placeholder="Task Name"
                                    defaultValue={props.element.description}
                                    name="description"
                                    onBlur={(event)=>UpdateElement("description",event.target.value)}
                                    onKeyDown={event => {
                                        if (event.keyCode === 13) {
                                            event.target.blur();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {props.element.subtask && (
                                    <Collapse defaultActiveKey={['1']} ghost>
                                        <Collapse.Panel header="SubTask" key="1">
                                                <SubtaskList 
                                                    subtask= {props.element.subtask}
                                                />
                                            </Collapse.Panel>
                                    </Collapse>
                                )}

                                {SubTaskAdd && !props.element.subtask ? (
                                    <CreateSubTask
                                        toggleSubTaskAdd = {toggleSubTaskAdd} 
                                        task_id = {props.element.id}
                                    />
                                ):(
                                    <ul className="list-group list-group-flush" >
                                        <li  role="button" className="list-group-item hover-text-red border-bottom">
                                            <div className="p-2 pe-auto" onClick={() => toggleSubTaskAdd(!SubTaskAdd)}>
                                                <i className="bi bi-plus-lg"></i> Add new SubTask  
                                            </div>
                                        </li>
                                    </ul>
                                )}

                                {!props.element.comment && (
                                    <CreateComment
                                        toggleCommentAdd = {toggleCommentAdd} 
                                    />
                                )}


                            </div>
                        </div>
                    </div>
                    <div className="pt-2 col-md-4 col-sm-12 bg-light text-end">
                        <Form 
                            initialValues ={{
                                task_deadline: props.element.task_deadline ? moment(new Date(props.element.task_deadline), 'DD/MM/YYYY'): undefined,
                                task_tag:props.element.task_tag ? props.element.task_tag.split(",") : undefined,
                                task_priority: props.element.task_priority,
                                task_user:props.element.task_user ? props.element.task_user : undefined,
                            }}
                        >
                            <div className="row">
                                <div className="col text-start text-secondary">Deadline</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Form.Item name="task_deadline" >
                                        <DatePicker
                                            name="task_deadline"
                                            placeholder = "Deadline"
                                            format={'DD/MM/YYYY'} 
                                            style={{ width: "100%" }} 
                                            onChange={(value)=>UpdateElement("task_deadline",value && value.format("YYYY-MM-DD 00:00:00"))}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-start text-secondary">Tag</div>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <Form.Item name="task_tag">
                                        <Select 
                                            mode="tags" 
                                            data-name="task_tag" 
                                            placeholder="Tag"
                                            
                                            onChange={(value)=>UpdateElement("task_tag",value)}
                                            
                                        ></Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-start text-secondary">Priority</div>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <Form.Item 
                                        name="task_priority" 
                                        rules={[{ required: true }]} 
                                    >
                                        <Select 
                                            placeholder="Priority" 
                                            onChange={(value)=>UpdateElement("task_priority",value)}
                                            required 
                                        >
                                            <Select.Option value="1">
                                                <i className="bi bi-circle-fill text-danger pe-1"></i>
                                                High
                                            </Select.Option>
                                            <Select.Option value="2">
                                                <i className="bi bi-circle-fill text-warning pe-1"></i>
                                                Medium
                                            </Select.Option>
                                            <Select.Option value="3">
                                                <i className="bi bi-circle-fill text-success pe-1"></i>
                                                Low
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>    
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-start text-secondary">User</div>
                            </div>
                            <div className="row text-start">
                                <div className="col">
                                    <Form.Item name="task_user">
                                        <Select
                                            showSearch
                                            data-name="task_user"
                                            placeholder="Select User"
                                            optionFilterProp="children"

                                            onChange={(value)=>UpdateElement("task_user",value)}
                                        >
                                            {
                                                userlist && userlist.map((user) => {
                                                    return (
                                                    <Select.Option value={user[0]} key={"user"+user[0]}>{user[1]}</Select.Option>
                                                    );
                                                })
                                            }

                                        </Select>
                                    </Form.Item>    
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )

}

export default UpdateTask;