import React, { lazy, Suspense } from "react"; // , { lazy, Suspense }
import AuthGuard from "./common/AuthGuard";
import DashboardLayout from "./layout/DashboardLayout";
import LoadingPage from "./pages/common/LoadingPage";

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
  {
    path: "blog/:id",
    element: <BlogPage />,
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
    element: <DashboardLayout></DashboardLayout>,

    children: [
      {
        path: "profile/:name",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
