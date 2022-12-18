import React from "react";
import { AuthForm } from "../../components";
import { useDispatch } from "react-redux";
import { login } from "../../actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    const resp = dispatch(login(user))
      .then(() => navigate("/"))
      .catch(() => {});

    toast.promise(resp, {
      pending: "Login in",
    });
  };
  return <AuthForm type="LOGIN" authFunction={handleLogin} />;
};

export default LoginPage;
