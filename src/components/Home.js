import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from '../History';
import '../App.css';
import axios from  'axios';
function Home(props){
  axios.interceptors.response.use((response) => {
    // do something with the response data
    console.log('Response was received');
    return response;
  }, error => {
    // handle the response error
    if(error.response !== undefined){
      refreshFunc();
    }
    return Promise.reject(error);
  });

  //checkfunc
    async function checkFunc() {      
         const jwtToken = window.localStorage.getItem('jwt');
         await axios.get("http://localhost:9090/home/",{
           headers:{
            'Authorization':'Bearer '+jwtToken
           }
         }
          ).then(
            (res) => {
              console.log(res.data);
            }
          );
    }


    //logout
    async function logout(e) {     
      e.preventDefault(); 
      const jwtToken = window.localStorage.getItem('jwt');
      await axios.get("http://localhost:9090/logout/",{
        headers:{
         'Authorization':'Bearer '+jwtToken
        }
      }
       ).then(
         (res) => {
           console.log(res.data);
           window.localStorage.clear();
           history.push('/');
         }
       );
    }


    //refreshfunc
    async function refreshFunc() {
      console.log('refreshing');
      const body = {
        "refresh_token" : window.localStorage.getItem('ref')
      }
      await axios.post("http://localhost:9090/token/refresh",
      body
      ).then(
        (res) => {
          console.log(res.data);
          if (res.data.jwttoken){
          window.localStorage.setItem('jwt',res.data.jwttoken);
          window.localStorage.setItem('ref',res.data.refreshtoken);
          checkFunc();
          }
          if(res.data.Error){
            history.push('/');
          }
        }
      );
    }
    return(
        <div className="success">
              <Button variant="danger" className="logout" type="button" onClick={(e) => {logout(e)}}> logout </Button>
              <Button variant="success" className="logout" type="button" onClick={(e) => {e.preventDefault(); checkFunc();}}> check </Button>
            <h5>You are now successfully logged in</h5>
          
        </div>
    )
}
export default Home;