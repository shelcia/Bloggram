import React from "react";

const ProfileTable = ({ profile, isEdit, setName, setImage }) => {
  //   console.log(profile.date);

  return (
    <React.Fragment>
        {!isEdit ? (
            <img src={profile.profile} alt={profile.name} style={{ borderRadius:"50em", height:"100px"}}/>
        ):(
            <input
                className="form-control"
                placeholder="enter valid image url"
                onChange={(event) => setImage(event.target.value)}
            ></input>
        )}
      
      <table className="table table-borderless mt-5 border">
        <tbody>
          <tr>
            <th className="text-right">Name:</th>
            <td className="text-left">
              {!isEdit ? (
                profile.name
              ) : (
                <input
                  className="form-control"
                  placeholder="enter name"
                  onChange={(event) => setName(event.target.value)}
                ></input>
              )}
            </td>
          </tr>
          <tr>
            <th className="text-right">Email:</th>
            <td className="text-left">{profile.email}</td>
          </tr>
          <tr>
            <th className="text-right">Account Created At:</th>
            <td className="text-left">
              {profile.date ? Date(profile.date).toString() : profile.date}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ProfileTable;