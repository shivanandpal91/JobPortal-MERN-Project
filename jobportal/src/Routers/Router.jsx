import {createBrowserRouter} from "react-router-dom";
import App from '../App';
import Home from '../Pages/Home';
import CreateJob from "../Pages/CreateJob";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/",element: <Home />},
        { path: "/post-job",element: <CreateJob />},
        { path: "/my-job",element: <MyJobs />},
       
      ]
    }
  ]);
  export default router;