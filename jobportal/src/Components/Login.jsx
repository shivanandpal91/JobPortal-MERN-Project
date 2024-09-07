// import React from 'react'

// import { GoogleAuthProvider ,signInWithPopup} from "firebase/auth";
//  import app from '../firbase/firebase.config';

// import { getAuth } from "firebase/auth";



// const Login = () => {
//   const auth = getAuth();
//   const googleProvider = new GoogleAuthProvider();
  
//   const handleLogin = () => {
    
//     signInWithPopup(auth, googleProvider)
//     .then((result) => {

//       // The signed-in user info.
//       const user = result.user;
      
//     }).catch((error) => {
      
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
//   }
//   return (
//     <div className="h-screen w-full flex items-center justify-center bg-blue px-8 py-2 text-white">
//         <button className="bg-slate-600 px-8 py-2 text-white" onClick={handleLogin}>   Login  </button>
//     </div>
//   )
// }

// export default Login;


//using useNavigate
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firbase/firebase.config';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info
        const user = result.user;

        // Navigate to the home page after successful login
        navigate("/home");  // Redirect to the home page

      }).catch((error) => {
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage, email, credential);  // Log the error
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-200 px-10 py-4 text-white">
      <button className="bg-slate-600 px-10 py-4 text-white" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;

