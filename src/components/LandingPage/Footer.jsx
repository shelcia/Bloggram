import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const Categories = [
    {
      id: "1",
      name: "Lifestyle",
      img: "https://picsum.photos/id/163/180/200",
      link: "lifestyle",
    },
    {
      id: "2",
      name: "Web Development",
      img: "https://picsum.photos/id/1/180/200",
      link: "webdev",
    },
    {
      id: "3",
      name: "Technology",
      img: "https://picsum.photos/id/160/180/200",
      link: "technology",
    },
    {
      id: "4",
      name: "Architecture",
      img: "https://picsum.photos/id/405/180/200",
      link: "architecture",
    },
    {
      id: "5",
      name: "Fashion Design",
      img: "https://picsum.photos/id/513/180/200",
      link: "fashiondesign",
    },
    {
      id: "6",
      name: "Automobile",
      img: "https://picsum.photos/id/514/180/200",
      link: "automobile",
    },
    {
      id: "7",
      name: "Others",
      img: "https://picsum.photos/id/528/180/200",
      link: "others",
    },
  ];

  const SocialApps = [
    { id: "1", name: "LinkedIn", link: "https://www.linkedin.com/in/shelcia/" },
    { id: "2", name: "Behance", link: "https://www.behance.net/shelcia" },
    { id: "3", name: "Github", link: "https://github.com/shelcia" },
  ];

  return (
    <React.Fragment>
      <div className="container-fluid pt-5" id="footer">
        <div className="row pb-5">
          <div className="col-sm-6">
            <h4 className="mb-3">Categories</h4>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              {Categories.map((category) => (
                <Link
                  to={`/category/${category.link}`}
                  key={category.id}
                  className="mb-0"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-sm-6">
            <h4 className="mb-3">Social Handles</h4>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              {SocialApps.map((category) => (
                <a href={`${category.link}`} key={category.id} className="mb-0">
                  {category.name}{" "}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container pt-4">
          <div className="text-center" id="footerTag">
            <p>Developed by Shelcia.</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
