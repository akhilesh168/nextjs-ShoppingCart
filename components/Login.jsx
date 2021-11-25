import { Button, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    console.log(data);
  };
  return (
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
            <input className="form-control" {...register("email")} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              {...register("password")}
              type="password"
            />
          </div>
          <Button
            color="error"
            variant="contained"
            className="btn btn-primary btn-lg btn-block w-100 mt-4"
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
