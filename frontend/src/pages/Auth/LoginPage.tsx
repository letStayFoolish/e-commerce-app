import { FormEvent, useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slices/apiSlices/usersApi";
import { setCredentials } from "../../redux/slices/UserSlice/authSlice";
import { toast } from "react-toastify";
import { IUser } from "../../types";
import { type RootState } from "../../redux/store";
import Loader from "../../components/Loader";
import { type ErrorApiSLice } from "../../redux/slices/apiSlices/types";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }

    console.log("USERINFO: ", userInfo);
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: IUser = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...response }));

      navigate(redirect);

      toast.success("You have logged in successfully");
    } catch (err) {
      console.log(err);

      const errorData = err as ErrorApiSLice;
      toast.error(
        errorData.data.message ||
          "Something went wong. Please check your email and password, and try again."
      );
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Your Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>
      </Form>
      <Row>
        <Col>
          New Customer?&nbsp;
          <Link to={redirect ? `/register?redirect=${redirect}` : "/"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
