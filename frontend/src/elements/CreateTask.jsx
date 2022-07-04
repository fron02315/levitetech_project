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

const CreateTask = (props) =>{
    const [userlist, toggleUserlist] = useState([]);
    const handleSubmit= (values)=>{
        try {
            const axios = axiosInstance.post('/task/', { 
                project_id:props.projectid,
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
                
                <div className="border rounded p-3 m-2">
                    <Form.Item name="description" rules={[{ required: true }]}>                 
                        <Input 
                            className="editable-textarea"
                            type="text" 
                            placeholder = "Description"
                        />
                    </Form.Item>
                    <div className="d-flex">
                        <div className="ps-1">
                            <Form.Item name="task_deadline">
                                <DatePicker
                                    name="task_deadline"
                                    placeholder = "Deadline"
                                    style={{ width: 130 }} 
                                    format={'DD/MM/YYYY'}
                                />
                            </Form.Item>
                        </div >

                        <div className="ps-1">
                            <Form.Item name="task_tag">
                                <Select 
                                    mode="tags" 
                                    data-name="task_tag" 
                                    style={{ minWidth: 120 }} 
                                    placeholder="Tag"
                                ></Select>
                            </Form.Item>
                        </div>
                        <div className="ps-1">
                            <Form.Item name="task_priority" rules={[{ required: true }]}>
                                <Select style={{ width: 120 }} placeholder="Priority" required >
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
                        <div className="ps-1">
                            <Form.Item name="task_user">
                                <Select
                                    showSearch
                                    data-name="task_user"
                                    placeholder="Select User"
                                    optionFilterProp="children"
                                    style={{ width: 120 }}
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
                <div className="rounded ps-3 m-2">
                    <Form.Item >
                        <Button color="primary" type="submit" form="create_project_form">Submit</Button>{' '}
                        <Button color="secondary" onClick={()=>props.toggleClose(false)}>Cancel</Button>
                    </Form.Item>   
                </div>

            </Form>
        )

}

export default CreateTask;