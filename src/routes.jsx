import React, { lazy, Suspense } from "react"; // , { lazy, Suspense }
import AuthGuard from "./common/AuthGuard";
import DashboardLayout from "./layout/DashboardLayout";
import LoadingPage from "./pages/common/LoadingPage";

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
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
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
];

export default routes;
