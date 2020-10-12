import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import axios from "axios";
import ProfileTable from "./PorfileTable";
import Loading from "../Loading";
import { useHistory } from "react-router-dom";

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const LINK = process.env.REACT_APP_HEROKU_LINK;

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        profile:"",
        date: "",
    });

    const history = useHistory();

    useEffect(() => {
        const userid = localStorage.getItem("BlogGram-UserId");
        axios
            .get(`${LINK}userdetails/${userid}`)
            .then((response) => {
            setProfile(response.data);
        })
        .catch((error) => console.log(error));
    }, [LINK, isEdit]);

    const editUser = (event) => {
    
        event.preventDefault();
        setIsLoading(true);
        const userid = localStorage.getItem("BlogGram-UserId");

        const response = { name: name, image:image };
        axios
            .put(`${LINK}userdetails/edit/${userid}`, response)
            .then((res) => {
                setIsLoading(false);
                setIsEdit(false);
                history.push('/dashboard/myprofile');
            })
            .catch((error) => console.log(error));
    };

    return(
        <React.Fragment>
            { isLoading ? <Loading/> : 
            <React.Fragment> 
            <Navbar/>
            <div className="container" id="container">
                <div className="text-center mt-5">
                    <ProfileTable
                        profile={profile}
                        isEdit={isEdit}
                        setName={setName}
                        setImage={setImage}
                    />
                    {!isEdit ? (
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit Profile Details
                    </button>
                    
                    ) : (
                    <button
                        className="btn btn-primary"
                        onClick={(event) => {
                        editUser(event);
                        // setIsEdit(false);
                    }}
                >
                Confirm
              </button>
            )}
          </div>
          </div>
        </React.Fragment> 
                
        }
            
        </React.Fragment>
    )
}


export default MyProfile;