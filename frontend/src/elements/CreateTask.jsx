import React, {useState, useEffect} from "react";
import axiosInstance from "../axiosApi";
import { 
    DatePicker,
    Select,
    Option
} from 'antd';
import {
    Button,
    Form,
    FormGroup,
    Input
} from "reactstrap";

const CreateTask = (props) =>{
    const [userlist, toggleUserlist] = useState([]);
    const handleSubmit= (event)=>{
        try {
            event.preventDefault();
            
            
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        const axios = axiosInstance.get('/authentication/user/list/');
        axios.then(res => {
            console.log(res);
            toggleUserlist(res.data);
        }).catch(({response}) => {
            
        });

    }, []);

    
        return (

            <Form id="create_project_form" onSubmit={handleSubmit}>
                <div className="border rounded p-3 m-2">

                        <FormGroup>
                            <Input 
                                className="editable-textarea"
                                type="text" 
                                name="description" 
                                placeholder = "Description"
                            />
                        </FormGroup>
                        
                        <div className="d-flex">
                            <div >
                                <DatePicker
                                    name="task_deadline"
                                    placeholder = "Deadline"
                                    style={{ width: 130 }} 
                                />
                            </div >

                            <div className="ps-1">

                                    <Select 
                                        mode="tags" 
                                        name="task_tag" 
                                        style={{ minWidth: 120 }} 
                                        placeholder="Tag"
                                    ></Select>

                            </div>
                            <div className="ps-1">
                                <Select style={{ width: 120 }} name="task_priority" placeholder="Priority">
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
                            </div>
                            <div className="ps-1">
                                <Select
                                    showSearch
                                    name="task_user"
                                    placeholder="Select User"
                                    optionFilterProp="children"
                                    style={{ width: 120 }}
                                >
                                    {
                                        userlist && userlist.map((user) => {
                                            console.log(user);
                                            return (
                                            <Select.Option value={user[0]} key={"user"+user[0]}>{user[1]}</Select.Option>
                                            );
                                        })
                                    }

                                </Select>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                </div>
                <div className="rounded ps-3 m-2">
                    <Button color="primary" type="submit" form="create_project_form">Submit</Button>{' '}
                    <Button color="secondary" onClick={()=>props.toggleClose(false)}>Cancel</Button>
                </div>

            </Form>
        )

}

export default CreateTask;