import {createBrowserRouter,Navigate} from "react-router-dom";
import App from '../App';
import Home from '../Pages/Home';
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import JobDescription from "../Pages/JobDescription";
import ProfileNew from "../Pages/ProfileNew";

import PrivateRoute from "../PrivateRoute";
import Profile from "../Pages/ProfileNew";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/",element: <Navigate to="/home" />},
        { path: "/login",element: <Login />},
        { path: "/signup",element: <Signup />},
        { path: "/profile",element:(<PrivateRoute><ProfileNew /></PrivateRoute>)},

  //       {path: "/job/:_id",element:(<PrivateRoute><JobDescription /></PrivateRoute>),loader: async ({ params }) => {
  //   const res = await fetch("http://localhost:3000/alljobs");
  //   const data = await res.json();
  //   return data.find(job => String(job._id) === String(params._id));
  // }},

  {
  path: "/job/:_id",
  element: (
    <PrivateRoute>
      <JobDescription />
    </PrivateRoute>
  ),
  loader: async ({ params }) => {
    const res = await fetch("https://job-portal-server-api.vercel.app/alljobs");
    const data = await res.json();

    return data.find(job => String(job._id) === String(params._id));
  }
},

        { path: "/home", element:(<PrivateRoute><Home /></PrivateRoute>)}, 
        { path: "/post-job",element:(<PrivateRoute><CreateJob /></PrivateRoute>) },
        { path: "/my-job",element:(<PrivateRoute><MyJobs /></PrivateRoute>) },
        { path: "/salary",element: <SalaryPage />},
        { path: "/edit-job/:_id",element:(<PrivateRoute><UpdateJob /></PrivateRoute>) ,loader:({params})=>fetch(`https://job-portal-server-api.vercel.app/alljobs/${params._id}`) },
      ]
    }
   
    
  ]);
  export default router;
