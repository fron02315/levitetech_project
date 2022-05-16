import React, {Fragment} from "react";
import axiosInstance from "../axiosApi";
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";

const CreateProject = (props) =>{
    const handleSubmit= (event)=>{
        try {
            event.preventDefault();
            const axios = axiosInstance.post('/project/', {
                sequence:100000000,
                description: event.target.description.value,
                flag: event.target.flag.checked,
                created_by: localStorage.getItem("userid")
            });
            axios.then(res => {
                const data = {type:"project",message:"The new Project is created"};
                props.handleAlert(data);
                props.toggle();
                props.toggleProject([...props.project, res.data]);
                // event.preventDefault();
            }).catch(({response}) => {
                
                //props.handleAlert(response.data.detail);
            });
            
        } catch (error) {
            throw error;
        }
    }
    
        return (
            <Fragment>
                <ModalHeader toggle={props.toggle}>Create New Project</ModalHeader>
                <ModalBody>
                    <Form id="create_project_form" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label >Name</Label>
                            <Input type="text" name="description" />
                        </FormGroup>
                        <FormGroup className="form-switch">
                            <Input type="checkbox" name="flag" />
                            <Label className="ps-2">Flag the project </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" form="create_project_form">Submit</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>Cancel</Button>
                </ModalFooter>
            </Fragment>
        )

}

export default CreateProject;