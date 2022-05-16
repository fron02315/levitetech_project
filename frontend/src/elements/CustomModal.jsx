import React, { Component } from "react";
import {Modal} from "reactstrap";

const CustomModal = (props) => {

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} >
            
            {props.renderContent}
            
        </Modal>
    )

}

export default CustomModal;