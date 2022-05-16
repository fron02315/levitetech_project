import React from "react";
import axiosInstance from "../axiosApi";
import {
    ListGroup,
    ListGroupItem,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap'

const TodoDashboard = () => {
    return (
        <section className="vh-100 bg-light p-3">
            <div className="row">
                <div className="col-12">
                    <h4>Hello { localStorage.getItem('user')}!</h4>
                </div>
            </div>
            <div className="row gx-5 p-3">
                <div className="col border p-3">
                    <div className="d-flex ">
                        <div>
                            <h5> Today</h5>
                        </div>
                        <div className="ps-2">
                            <span className="badge bg-secondary">5</span>
                        </div>
                    </div>
                    <ListGroup>
                        <ListGroupItem action  href="#" tag="a" >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <i className="bi bi-check-circle pe-2"></i>
                                    Fon's asshole itchy :D
                                    <span className="badge bg-danger ms-2">High</span>
                                </div>
                                <div className="onhover-wrap">
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-card-text"></i></button>
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-calendar-event"></i></button>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <i className="bi bi-check-circle pe-2"></i>
                                    Mybababy has a big dick
                                    <span className="badge bg-warning ms-2">Medium</span>
                                </div>
                                <div className="onhover-wrap">
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-card-text"></i></button>
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-calendar-event"></i></button>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <i className="bi bi-circle"></i>  Panda shit on the macbook
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <i className="bi bi-circle"></i> Grizz want to slap panda ass
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <i className="bi bi-check-circle"></i> Ice bear is a good guy
                        </ListGroupItem>
                    </ListGroup>

                </div>
            </div>
            <div className="row gx-5 p-3">
                <div className="col border p-3">
                    <div className="d-flex ">
                        <div>
                            <h5> Upcoming</h5>
                        </div>
                        <div className="ps-2">
                            <span className="badge bg-secondary">5</span>
                        </div>
                    </div>
                    <ListGroup>
                        <ListGroupItem action  href="#" tag="a" >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <i className="bi bi-check-circle pe-2"></i>
                                    Fon's asshole itchy :D
                                    <span className="badge bg-danger ms-2">High</span>
                                </div>
                                <div className="onhover-wrap">
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-card-text"></i></button>
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-calendar-event"></i></button>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <i className="bi bi-check-circle pe-2"></i>
                                    Mybababy has a big dick
                                    <span className="badge bg-warning ms-2">Medium</span>
                                </div>
                                <div className="onhover-wrap">
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-card-text"></i></button>
                                    <button type="button" className="btn btn-light onhover-button"><i className="bi bi-calendar-event"></i></button>
                                </div>
                            </div>
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <i className="bi bi-circle"></i>  Panda shit on the macbook
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <i className="bi bi-circle"></i> Grizz want to slap panda ass
                        </ListGroupItem>
                        <ListGroupItem action  href="#" tag="a">
                            <i className="bi bi-check-circle"></i> Ice bear is a good guy
                        </ListGroupItem>
                    </ListGroup>

                </div>
            </div>
        </section>

    )
}


export default TodoDashboard;