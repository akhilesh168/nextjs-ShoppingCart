import { nanoid } from "nanoid";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    const userId = nanoid();
    console.log(data);
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
              <input className="form-control" {...register("firstName")} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">LastName</label>
              <input className="form-control" {...register("lastName")} />
            </div>
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
            <div className="form-group">
              <label htmlFor="cPassword">Confirm Password</label>
              <input
                className="form-control"
                {...register("cPassword")}
                type="password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block w-100 mt-4"
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
