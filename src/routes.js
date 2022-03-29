import React, { lazy, Suspense } from "react"; // , { lazy, Suspense }
import AuthGuard from "./components/AuthGuard";
import DashboardLayout from "./components/DashboardLayout";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<p>mrmr</p>}>
      <Component {...props} />
    </Suspense>
  );

const LandingPage = Loadable(lazy(() => import("./pages/home/LandingPage")));
const Login = Loadable(lazy(() => import("./pages/auth/Login")));
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
    path: "feed",
    element: <Login />,
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
        path: "edit-blog",
        element: <EditBlog />,
      },
    ],
  },
];

export default routes;
