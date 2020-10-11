import React from 'react';



const Footer = () =>{

    return(
        <React.Fragment>
            <div className="container-fluid" id="footer">
                <div className="row">
                    <div className="col-sm-6">
                        <h4>Categories</h4>
                    </div>
                    <div className="col-sm-6">
                        <h4>Social Handles</h4>
                    </div>
                </div>
                <div className="text-center">
                    <p>Developed by Shelcia</p>
                </div>
            </div> 
        </React.Fragment>
    )
}

export default Footer;