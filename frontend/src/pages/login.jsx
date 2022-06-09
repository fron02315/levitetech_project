import React, { useState } from "react";
import axiosInstance from "../axiosApi";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    UncontrolledAlert
} from 'reactstrap'


// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {username: "", password: ""};

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({[event.target.name]: event.target.value});
//     }


//     async handleSubmit(event) {
//         event.preventDefault();
//         try {
//             const data = await axiosInstance.post('/authentication/token/obtain/', {
//                 username: this.state.username,
//                 password: this.state.password
//             });
//             axiosInstance.defaults.headers['Authorization'] = "JWT " + data.access;
//             localStorage.setItem('access_token', data.access);
//             localStorage.setItem('refresh_token', data.refresh);
//             window.location.href = "/";
//         } catch (error) {
//             throw error;
//         }
//     }

//     render() {
//         return (
            // <section className="vh-100 gradient-custom">

            //     <div className="container py-5 h-100">
            //         <div className="row d-flex justify-content-center align-items-center h-100">
            //         <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            //             <div className="card bg-dark text-white" >
            //             <div className="card-body p-5 text-center">

            //                 <div className="mb-md-5 mt-md-4 pb-5">

            //                     <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
            //                     <p className="text-white-50 mb-5">Please enter your login and password!</p>

            //                     <Form onSubmit={this.handleSubmit}>
            //                         <FormGroup className="mb-3">
            //                             <Label>Username</Label>
            //                             <Input type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleChange} />
            //                         </FormGroup>

            //                         <FormGroup className="mb-3" >
            //                             <Label>Password</Label>
            //                             <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
            //                         </FormGroup>

            //                         <Button variant="primary" type="submit">
            //                             Submit
            //                         </Button>
            //                     </Form>

            //                 </div>

            //                 <div>
            //                 <p className="mb-0">Don't have an account? <a href="#" className="text-white-50 fw-bold">Sign Up</a></p>
            //                 </div>

            //             </div>
            //             </div>
            //         </div>
            //         </div>
            //     </div>
            // </section>

//         )
//     }
// }
// export default Login;

const Login = () => {
    const [username, setusername] = useState('fon');
    // TODO : Dont'pass the text string password
    const [password, setpassword] = useState('ThisIsFon55');
    const [errormsg, seterrormsg] = useState('');

    const handleChange = ({target}) => {
        if(target.name == "username"){
            setusername(target.value); 
        }else{
            setpassword(target.value);
        }

    }


    const handleSubmit = event => {
        event.preventDefault();
        const axios = axiosInstance.post('/authentication/token/obtain/', {
            username: username,
            password: password
        });
        axios.then(res => {
            axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            localStorage.setItem('user', res.data.user);
            localStorage.setItem('userid', res.data.id);

            window.location.href = "/home";
            // event.preventDefault();
        }).catch(({response}) => {
            seterrormsg(response.data.detail);
        });
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" >
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                {errormsg != "" && (
                                    <UncontrolledAlert color="danger" className="text-start">
                                        {errormsg}
                                    </UncontrolledAlert>

                                )}
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup className="mb-3">
                                        <Label>Username</Label>
                                        {/* <Input type="text" placeholder="Enter Username" name="username" value={username} oncChange={handleChange} /> */}
                                        <Input type="text" placeholder="Enter Username" name="username" value={username} onChange={handleChange} />
                                    </FormGroup>

                                    <FormGroup className="mb-3" >
                                        <Label>Password</Label>
                                        <Input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
                                    </FormGroup>

                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>

                            </div>

                            <div>
                            <p className="mb-0">Don't have an account? <a href="#" className="text-white-50 fw-bold">Sign Up</a></p>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;