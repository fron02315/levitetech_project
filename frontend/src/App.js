import React, { Component} from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import TodoDashboard from "./pages/todo_dashboard";
import TodoAdminDashboard from "./pages/todo_dashboard_admin";
import Sidebar from "./elements/Sidebar";
import axiosInstance from "./axiosApi";




class App extends Component {
  constructor() {
      super();
      this.handleLogout = this.handleLogout.bind(this);

  }
  async handleLogout() {
    try {
        const response = await axiosInstance.post('/token/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        return response;
    }
    catch (e) {
        console.log(e);
    }
  };

  
  render() {

      return (
          
          <div className="site">
              <main>

                  <Routes>

                    <Route exact path={"/login/"} element={<Login/>}/>
                    <Route exact path={"/signup/"} element={<Signup/>}/>
                    <Route element={<Sidebar />}>
                        <Route exact path={"/todo/"} element={<TodoDashboard/>}/>
                        <Route exact path={"/todo_admin/:projectid"} element={<TodoAdminDashboard/>}/>
                        <Route exact path={"/home/"} element={<Home/>}/>
                    </Route>

                  </Routes>
              </main>
          </div>

          

      );
  }
}

export default App;