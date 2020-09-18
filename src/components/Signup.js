import React from 'react';
import {Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import history from '../History';
import axios from 'axios';
class Signup extends React.Component{
 constructor(props){
     super(props);
     this.state={
         user_name:'',
         user_pass:''
     }
     this.handleSubmit=this.handleSubmit.bind(this);

 }
 handleSubmit(e)
 {  
   e.preventDefault();
   axios.interceptors.request.use(config => {
    // perform a task before the request is sent
    console.log('Request was sent');
  
    return config;
  }, error => {
    // handle the error
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    // do something with the response data
    console.log('Response was received');
  
    return response;
  }, error => {
    // handle the response error
    return Promise.reject(error);
  });


   axios.get("http://localhost:9090/signup/?username="+this.state.user_name+"&password="+this.state.user_pass,
    ).then(
      (res) => {
        console.log(res.data);
      }
    );

   this.setState(
     {
         user_name:'',
         user_pass:''
     }
 ) ;
 }
 
 validateForm() {
    return this.state.user_name.length > 0 && this.state.user_pass.length > 0 ;
  }
    render(){
    return(
        <div className="signup">
        <header><h3>Signup page</h3></header>
        <Form >
          <Form.Group controlId="name">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.user_name}
              onChange={e => this.setState({user_name:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
            <Form.Control
              autoFocus
              type="password"
              value={this.state.user_pass}
              onChange={e => this.setState({user_pass:e.target.value})}
            />
          </Form.Group>
          <Button block  disabled={!this.validateForm()}  onClick={(e) => {this.handleSubmit(e)}} type="button">
            Sign up
          </Button>
          Already a user? Click on <a href="/" onClick={()=>history.push("/")}><b>sign in</b></a>

          </Form>            
        </div>
    )
}
}
export default Signup;