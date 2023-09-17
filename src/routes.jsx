import React, { lazy, Suspense } from "react"; // , { lazy, Suspense }
import AuthGuard from "./common/AuthGuard";
import DashboardLayout from "./layout/DashboardLayout";
import HomeLayout from "./layout/HomeLayout";
import LoadingPage from "./pages/common/LoadingPage";
import { isCookieExist } from "./helpers/isValidToken";

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingPage />}>
      <Component {...props} />
    </Suspense>
  );

const LandingPage = Loadable(lazy(() => import("./pages/home/LandingPage")));
const Login = Loadable(lazy(() => import("./pages/auth/Login")));
const Signup = Loadable(lazy(() => import("./pages/auth/Signup")));
const BlogPage = Loadable(lazy(() => import("./pages/common/BlogPage")));
const Dashboard = Loadable(
  lazy(() => import("./pages/dashboard/dashboard/Dashboard"))
);
const Profile = Loadable(
  lazy(() => import("./pages/dashboard/dashboard/Profile"))
);
const EditProfile = Loadable(
  lazy(() => import("./pages/dashboard/dashboard/EditProfile"))
);
const AddBlog = Loadable(lazy(() => import("./pages/dashboard/blog/AddBlog")));
const EditBlog = Loadable(
  lazy(() => import("./pages/dashboard/blog/EditBlog"))
);

const routes = [
  {
    path: "",
    element: isCookieExist() ? <DashboardLayout /> : <HomeLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile/:name/edit",
        element: <EditProfile />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "edit-blog/:id",
        element: <EditBlog />,
      },
    ],
  },
  {
    path: "",
    element: isCookieExist() ? <DashboardLayout /> : <HomeLayout />,
    children: [
      {
        path: "profile/:name",
        element: <Profile />,
      },
      {
        path: "blog/:id",
        element: <BlogPage />,
      },
    ],
  },
];

export default routes;
