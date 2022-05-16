import React, { Component, useState } from "react";
import {Alert} from "reactstrap";

const ErrorMessage = (props) => {
    
    return (
        <div>
             <Alert className="position-absolute w-25 right-15" color="primary"  isOpen={props.visible} toggle={props.handleclose} fade={false}>
                {props.content}
            </Alert>
         </div>
    )

}

export default ErrorMessage;