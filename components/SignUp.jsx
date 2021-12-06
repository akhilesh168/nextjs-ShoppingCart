import cookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { API_HANDLER } from "../lib/util/apiUtil";
import { API_SIGNUP } from "../lib/util/apiRouteConstants";
import { useDispatch } from "react-redux";
import { setUserLoggedIn } from "../redux/auth.slice";

function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [signupError, setSignupError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const submitHandler = async (formVal) => {
    setLoader(true);
    let requestBody = JSON.stringify({
      email: formVal?.email,
      password: formVal?.password,
      lastName: formVal?.lastName,
      firstName: formVal?.firstName,
    });

    const { data } = await API_HANDLER.postRequest(API_SIGNUP, formVal);
    if (data && data.error) {
      setLoader(false);
      setSignupError(data.message);
    }
    if (data && data.token) {
      //set cookie
      cookie.set("token", data.token, { expires: 2 });
      dispatch(setUserLoggedIn({ isLoggedIn: true, userName: formVal.email }));
      router.push("/");
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <Row>
        <Col xs={6}>
          <div>
            <h2>SignUp</h2>
            <p>We do not share your personal details with anyone</p>
          </div>
        </Col>
        <Col xs={4}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <label htmlFor="firstName">FirstName</label>
              <input
                className="form-control"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">LastName</label>
              <input
                className="form-control"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                {...register("email", { required: "This field is required" })}
              />
              {signupError && <p style={{ color: "red" }}>{signupError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                {...register("password", {
                  required: "This field is required",
                })}
                type="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cPassword">Confirm Password</label>
              <input
                className="form-control"
                {...register("cPassword", {
                  required: "This field is required",
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || "Passwords should match!";
                    },
                  },
                })}
                type="password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block w-100 mt-4"
              disabled={loader}
            >
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
