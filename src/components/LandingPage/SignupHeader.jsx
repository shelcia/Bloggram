import React from 'react';
import { Link } from 'react-router-dom';


const SignupHeader = ()=>{

    return(
        <React.Fragment>
            <div className="container-fluid" style={{ marginTop:"2rem" , backgroundColor:"rgba(255,255,255,0.89)"}}>
                <div className="text-center">
                    <h1> Want to write your own story ? </h1>
                    <Link to="/signup">
                        <button type="button" className="btn btn-primary mt-5">Signup Now</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SignupHeader;