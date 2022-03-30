import React, { useEffect, useState } from "react";
import Avatar from "avataaars";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { apiUsers } from "../../../services/models/UserModel";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [avatar, setAvatar] = useState({
    topType: "LongHairMiaWallace",
    accessoriesType: "Prescription02",
    hairColor: "BrownDark",
    facialHairType: "Blank",
    clotheType: "Hoodie",
    clotheColor: "PastelBlue",
    eyeType: "Happy",
    eyebrowType: "Default",
    mouthType: "Smile",
    skinColor: "Light",
  });

  const handleAvatar = (e) => {
    setAvatar({ ...avatar, [e.target.name]: e.target.value });
  };

  const headStyles = [
    "No Hair",
    "Eyepatch",
    "Hat",
    "Hijab",
    "Turban",
    "WinterHat1",
    "WinterHat2",
    "WinterHat3",
    "WinterHat4",
    "LongHairBigHair",
    "LongHairBob",
    "LongHairBun",
    "LongHairCurly",
    "LongHairCurvy",
    "LongHairDreads",
    "LongHairFrida",
    "LongHairFro",
    "LongHairFroBand",
    "LongHairNotTooLong",
    "LongHairShavedSides",
    "LongHairMiaWallace",
    "LongHairStraight",
    "LongHairStraight2",
    "LongHairStraightStrand",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShaggyMullet",
    "ShortHairShortCurly",
    "ShortHairShortFlat",
    "ShortHairShortRound",
    "ShortHairShortWaved",
    "ShortHairSides",
    "ShortHairTheCaesar",
    "ShortHairTheCaesar",
    "SidePart",
  ];

  const accessories = [
    "Blank",
    "Kurt",
    "Prescription01",
    "Prescription02",
    "Round",
    "Sunglasses",
    "Wayfarers",
  ];

  const hairColors = [
    "Auburn",
    "Black",
    "Blonde",
    "BlondeGolden",
    "Brown",
    "BrownDark",
    "PastelPink",
    "Blue",
    "Platinum",
    "Red",
    "SilverGray",
  ];

  const facialHair = [
    "Blank",
    "BeardMedium",
    "BeardLight",
    "BeardMajestic",
    "MoustacheFancy",
    "MoustacheMagnum",
  ];

  //   const facialHairColor = [
  //     "Auburn",
  //     "Black",
  //     "Blonde",
  //     "BlondeGolden",
  //     "Brown",
  //     "BrownDark",
  //     "Platinum",
  //     "Red",
  //   ];

  const clothes = [
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck",
  ];

  const clotheColor = [
    "Black",
    "Blue01",
    "Blue02",
    "Blue03",
    "Gray01",
    "Gray02",
    "Heather",
    "PastelBlue",
    "PastelGreen",
    "PastelOrange",
    "PastelRed",
    "PastelYellow",
    "Pink",
    "Red",
    "White",
  ];

  const skin = [
    "Tanned",
    "Yellow",
    "Pale",
    "Light",
    "Brown",
    "DarkBrown",
    "Black",
  ];

  const selectMenu1 = [
    {
      name: "topType",
      label: "Hair Style",
      list: headStyles,
    },
    {
      name: "accessoriesType",
      label: "Accessories",
      list: accessories,
    },
    {
      name: "hairColor",
      label: "Hair Color",
      list: hairColors,
    },
    {
      name: "facialHairType",
      label: "Facial Hair",
      list: facialHair,
    },
  ];

  const selectMenu2 = [
    {
      name: "clotheType",
      label: "Clothe Type",
      list: clothes,
    },
    {
      name: "clotheColor",
      label: "Clothe Color",
      list: clotheColor,
    },
    {
      name: "skinColor",
      label: "Skin Color",
      list: skin,
    },
  ];

  const [user, setUser] = useState({
    name: "",
    date: "",
    email: "",
  });

  const _getProfile = (id, signal) => {
    apiUsers.getSingle(id, signal).then((res) => {
      if (res.status === "200") {
        setUser(res.message);
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();

    const userId = localStorage.getItem("BlogGram-UserId");

    _getProfile(userId, ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  const editProfile = () => {
    const userId = localStorage.getItem("BlogGram-UserId");

    const body = {
      name: user.name,
      avatar: avatar,
    };
    apiUsers.put(body, `edit/${userId}`).then((res) => {
      //   console.log(res);
      if (res.status === "200") {
        toast.success(res.message);
        _getProfile(userId);
      } else {
        toast.error("Edit failed");
      }
    });
  };

  return (
    <section className="container p-5">
      <div className="row">
        <div className="col-sm-6 d-flex flex-column align-items-center">
          <Avatar
            style={{ width: "200px", height: "200px", marginBottom: 8 }}
            avatarStyle="Circle"
            topType={avatar.topType}
            accessoriesType={avatar.accessoriesType}
            hairColor={avatar.hairColor}
            facialHairType={avatar.facialHairType}
            clotheType={avatar.clotheType}
            clotheColor={avatar.clotheColor}
            eyeType={avatar.eyeType}
            eyebrowType={avatar.eyebrowType}
            mouthType={avatar.mouthType}
            skinColor={avatar.skinColor}
          />
          <div className="row">
            <div className="col-md-6">
              <Stack spacing={2}>
                {selectMenu1.map((menu, index) => (
                  <FormControl
                    variant="standard"
                    sx={{ width: 180 }}
                    key={index}
                  >
                    <InputLabel>{menu.label}</InputLabel>
                    <Select
                      value={avatar[menu.name]}
                      name={menu.name}
                      onChange={handleAvatar}
                      size="small"
                    >
                      {menu.list?.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Stack>
            </div>
            <div className="col-md-6">
              <Stack spacing={2}>
                {selectMenu2.map((menu, index) => (
                  <FormControl
                    variant="standard"
                    sx={{ width: 180 }}
                    key={index}
                  >
                    <InputLabel>{menu.label}</InputLabel>
                    <Select
                      value={avatar[menu.name]}
                      name={menu.name}
                      onChange={handleAvatar}
                      size="small"
                    >
                      {menu.list?.map((item, index) => (
                        <MenuItem value={item} key={index}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </Stack>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <h3 className="text mb-4">Edit Profile</h3>
          <TextField
            label="Name"
            variant="standard"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Email"
            variant="standard"
            value={user.email}
            fullWidth
            disabled
            className="mb-4"
          />
          Joined {user.date}
          <div className="mt-4">
            <Button variant="outlined" onClick={editProfile}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
