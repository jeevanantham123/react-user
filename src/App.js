import React from "react";
import { Button,Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import history from "./History";
import axios from "axios";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      uname:"",
      password:""
    }
    this.validateForm=this.validateForm.bind(this);
    this.redirect=this.redirect.bind(this);
  }
  

  validateForm() {
    return this.state.uname.length > 0 && this.state.password.length > 0;
  }

  
  redirect(event){
    event.preventDefault();    
     axios.get("http://localhost:9090/login/?username="+this.state.uname+"&password="+this.state.password,
      ).then(
        (res) => {
          history.push('/home');
          console.log(res.data);
          window.localStorage.setItem('jwt',res.data.jwttoken);
          window.localStorage.setItem('ref',res.data.refreshtoken);
        }
      );
    this.setState(
      {
        uname:'',
        password:''
      }
    );
  }
  render(){
    return (
      
      <div className="Login">
        <header><h3>Login page</h3></header>
        <Form >
          <Form.Group controlId="username" >
            Username
            <Form.Control
              autoFocus
              type="text"
              value={this.state.uname}
              onChange={e => this.setState({uname:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="password">
            password
            <Form.Control
              value={this.state.password}
              onChange={e => this.setState({password:e.target.value})}
              type="password"
            />
          </Form.Group>
          <Button block  disabled={!this.validateForm()} onClick={(e) => {this.redirect(e)}} type="button">
            Login
          </Button>
          New user? Click on <a href="/Signup" onClick={()=>history.push("/Signup")}><b>sign up</b></a>
        </Form>
      </div>
    );
  }
}
export default App;
