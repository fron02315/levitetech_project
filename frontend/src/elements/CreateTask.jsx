import React, {Fragment} from "react";
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
    const handleSubmit= (event)=>{
        try {
            event.preventDefault();
            const axios = axiosInstance.post('/project/', {
                sequence:100000000,
                description: event.target.description.value,
                flag: event.target.flag.value,
                created_by: localStorage.getItem("userid")
            });
            axios.then(res => {
                const data = {type:"project",message:"The new Project is created"};
                //props.handleAlert(data);
               // props.toggle();
                //props.toggleProject([...props.project, res.data]);
                // event.preventDefault();
            }).catch(({response}) => {
                
                //props.handleAlert(response.data.detail);
            });
            
        } catch (error) {
            throw error;
        }
    }
    
        return (

            <Form id="create_project_form" onSubmit={handleSubmit}>
                <div className="border rounded p-3 m-2">

                        <FormGroup>
                            <Input 
                                className="editable-textarea"
                                type="text" 
                                name="description" 
                                placeholder = "description"
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
                                        style={{ width: 120 }} 
                                        placeholder="Tag"
                                    ></Select>

                            </div>
                            <div className="ps-1">
                                <Select style={{ width: 120 }} name="task_priority" placeholder="Priority">
                                    <Select.Option value="1">
                                        <i class="bi bi-circle-fill text-danger pe-1"></i>
                                        High
                                    </Select.Option>
                                    <Select.Option value="2">
                                        <i class="bi bi-circle-fill text-warning pe-1"></i>
                                        Medium
                                    </Select.Option>
                                    <Select.Option value="3">
                                        <i class="bi bi-circle-fill text-success pe-1"></i>
                                        Low
                                    </Select.Option>
                                </Select>
                            </div>
                            <div className="ps-1">
                                <Select style={{ width: 120 }} name="task_priority" placeholder="User">
                                    <Select.Option value="1">
                                        
                                    </Select.Option>
                                    
                                </Select>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                </div>
                <Button color="primary" type="submit" form="create_project_form">Submit</Button>{' '}
                <Button color="secondary" onClick={()=>props.toggleClose(false)}>Cancel</Button>
            </Form>
        )

}

export default CreateTask;