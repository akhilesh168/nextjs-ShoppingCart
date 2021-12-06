import { Button, Grid } from "@mui/material";
import cookie from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { setUserLoggedIn } from "../redux/auth.slice.js";
import { useDispatch } from "react-redux";
import { API_HANDLER } from "../lib/util/apiUtil.js";
import { API_LOGIN } from "../lib/util/apiRouteConstants.js";
import xyz from "../components/xyz";
const Alert = dynamic(() => import("./Alert.jsx"));

export default function Login() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const [error, setError] = useState({ error: false, message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (formVal) => {
    const requestBody = JSON.stringify({
      email: formVal.email,
      password: formVal.password,
    });
    const { data } = await API_HANDLER.postRequest(API_LOGIN, requestBody);
    if (data && data.error) {
      setError(data);
    }
    if (data && data.token) {
      cookie.set("token", data.token, { expires: 2 });
      dispatch(setUserLoggedIn({ isLoggedIn: true, userName: formVal.email }));
      router.push("/");
    }
  };
  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={12} md={6}>
          <div>
            <h2>Login</h2>
            <p>Get Access to your Orders, WishList and Recommendations</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                {...register("password", { required: "password is required" })}
                type="password"
              />
            </div>
            <Button
              color="error"
              variant="contained"
              className="btn btn-primary btn-lg btn-block w-100 mt-4"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
      {error.error ? (
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error.message}
        </Alert>
      ) : null}
    </>
  );
}
