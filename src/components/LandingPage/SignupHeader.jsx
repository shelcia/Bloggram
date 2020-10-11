import React from 'react';


const SignupHeader = ()=>{

    return(
        <React.Fragment>
            <div className="container-fluid border" style={{ marginTop:"2rem" , backgroundColor:"rgba(255,255,255,0.89)"}}>
                <div className="text-center">
                    <h1> Want to write your own story ? </h1>
                    <button type="button" className="btn btn-primary">Signup Now</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SignupHeader;