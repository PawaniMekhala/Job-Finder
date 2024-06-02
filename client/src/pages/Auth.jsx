// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { Office } from "../assets";
// import { SignUp } from "../components";

// const Auth = () => {
//   const { user } = useSelector((state) => state.user);
//   const [open, setOpen] = useState(true);
//   const location = useLocation();

//   let from = location?.state?.from?.pathname || "/";

//   if (user.token) {
//     return window.location.replace(from);
//   }
//   return (
//     <div className='w-full '>
//       <img src={Office} alt='Office' className='object-contain ' />

//       <SignUp open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Auth;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Office } from "../assets";
import { SignUp } from "../components";

const Auth = () => {
  const user = useSelector((state) => state.user.user); // Ensure proper path to user state
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (user && user.token) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <div className='w-full'>
      <img src={Office} alt='Office' className='object-contain' />
      <SignUp open={open} setOpen={setOpen} />
    </div>
  );
};

export default Auth;

