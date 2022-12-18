import React from "react";
import { useDispatch } from "react-redux";
import { AuthForm } from "../../components";
import { register } from "../../actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hangleRegistration = async (user) => {
    try {
      const data = await dispatch(register(user))
        .then(() => navigate("/login"))
        .catch(() => {});
    } catch (err) {
      toast.error("Something went wrong ,Sign in Failed !!!");
    }
  };

  return <AuthForm type="SIGNUP" authFunction={hangleRegistration} />;
};

export default SigninPage;
