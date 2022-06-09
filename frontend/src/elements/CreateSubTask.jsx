

import React, {useState, useEffect} from "react";
import axiosInstance from "../axiosApi";
import { 
    DatePicker,
    Select,
    Form,
    Input
} from 'antd';
import {
    Button
} from "reactstrap";

const CreateComment = (props) =>{
    const [userlist, toggleUserlist] = useState([]);
    const handleSubmit= (values)=>{
        //Todo: finish this api
        try {
            console.log(props.task_id);
            const axios = axiosInstance.post('/subtask/', { 
                task_id:props.task_id,
                sequence:100000000,
                description: values.description,
                task_user: values.task_user,
                flag: 0,
                task_priority: values.task_priority,
                task_tag: values.task_tag && values.task_tag.join(),
                task_deadline: values.task_deadline && values.task_deadline.format("YYYY-MM-DD 00:00:00"),
                created_by: localStorage.getItem("userid")
            });
            axios.then(res => {
                //refresh list
                props.toggleRefreshTasklist((prevState) => (!prevState));
                props.toggleClose(false);
            }).catch(({response}) => {

            });
            
            
        } catch (error) {
            throw error;
        }
    }
    

    useEffect(() => {
        const axios = axiosInstance.get('/authentication/user/list/');
        axios.then(res => {
            toggleUserlist(res.data);
        }).catch(({response}) => {
            
        });

    }, []);

        return (

            <Form id="create_project_form" onSubmit={e => e.preventDefault()} onFinish={handleSubmit} >
                
                <div className="border rounded p-3 pb-0">
                    <Form.Item name="description" rules={[{ required: true }]}>                 
                        <Input 
                            className="editable-textarea"
                            type="text" 
                            placeholder = "Description"
                        />
                    </Form.Item>
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <Form.Item name="subtask_deadline">
                                <DatePicker
                                    name="subtask_deadline"
                                    placeholder = "Deadline"
                                    style={{ width: "100%" }} 
                                    format={'DD/MM/YYYY'}
                                />
                            </Form.Item>
                        </div >

                        <div className="col-md-3 col-sm-12">
                            <Form.Item name="subtask_tag">
                                <Select 
                                    mode="tags" 
                                    data-name="subtask_tag" 
                                    placeholder="Tag"
                                ></Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <Form.Item name="subtask_priority" rules={[{ required: true }]}>
                                <Select placeholder="Priority" required >
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
                        <div className="col-md-3 col-sm-12">
                            <Form.Item name="subtask_user">
                                <Select
                                    showSearch
                                    data-name="subtask_user"
                                    placeholder="Select User"
                                    optionFilterProp="children"
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
                </div>
                <div className="rounded ps-3 m-2 text-right">
                    <Form.Item >
                        <Button color="primary" type="submit" form="create_project_form">Submit</Button>{' '}
                        <Button color="secondary" onClick={()=>props.toggleSubTaskAdd(false)}>Cancel</Button>
                    </Form.Item>   
                </div>

            </Form>
        )

}

export default CreateComment;