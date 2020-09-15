import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from '../History';
import '../App.css';
function Home(props){
   
    var user_name=props.location.state.jsonData[0].user_name;
    return(
        <div className="success">
              <Button variant="danger" className="logout" type="button" onClick={() => {history.push("/")}}> logout </Button>
            <h5>You are now successfully logged in {user_name}</h5>
          
        </div>
    )
}
export default Home;