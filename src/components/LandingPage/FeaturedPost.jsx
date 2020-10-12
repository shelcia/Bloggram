import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import { Link } from 'react-router-dom';


const FeaturedPost = ()=>{

    return(
        <React.Fragment>
            <div className="container" id="container">
                <h1 className="pb-3">Featured Blog</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <img src="https://picsum.photos/id/31/500/300" alt="" className="img-fluid"/>
                    </div>
                    <div className="col-sm-6">
                        <h3>Romeo Juliet Love</h3>
                        <LinesEllipsis
                            text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                            maxLine='8'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                        <div className="text-right">
                            <Link to="/blog/1234455556" id="link">See more &#62;&#62;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FeaturedPost;