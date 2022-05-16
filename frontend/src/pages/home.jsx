import React from "react";
import axiosInstance from "../axiosApi";
import {
    Button,
    Section,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap'

const Home = () => {
    return (
        <section className="vh-100">
            <div className="row">
                <div className="col-12">
                    Hello { localStorage.getItem('user')}!
                </div>
            </div>
        </section>

    )
}


export default Home;