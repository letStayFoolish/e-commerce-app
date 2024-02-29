import { FormEvent, useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginApiSliceMutation } from "../../redux/slices/apiSlices/usersApi";
import { setCredentials } from "../../redux/slices/UserSlice/authSlice";
import { toast } from "react-toastify";
import { IUser } from "../../types";
import { type RootState } from "../../redux/store";
import Loader from "../../components/Loader";
import { type ErrorApiSLice } from "../../redux/slices/apiSlices/types";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginApiSliceMutation();

  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const resetFields = () => {
    setPassword("");
    setEmail("");
    setIsValid(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const validateEmail = (value: string): boolean => {
    // Implement your email validation logic here
    // Example: Check if the email follows a certain pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string): boolean => {
    // Implement your password validation logic here
    // Example: Check if the password is at least 8 characters long
    return value.length >= 8;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setEmail(newValue);
    setIsValid(validateEmail(newValue) && validatePassword(password));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPassword(newValue);
    setIsValid(validateEmail(email) && validatePassword(newValue));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response: IUser = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...response }));

      navigate(redirect);

      toast.success("You have logged in successfully");
      resetFields();
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
            required
            style={
              !validateEmail(email)
                ? { borderColor: "red" }
                : { borderColor: "" }
            }
          ></Form.Control>
          {!validateEmail(email) && (
            <span style={{ color: "red" }}>Enter your email</span>
          )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            style={
              !validatePassword(password)
                ? { borderColor: "red" }
                : { borderColor: "" }
            }
          ></Form.Control>
          {!validatePassword(password) && (
            <span style={{ color: "red" }}>Enter your password</span>
          )}
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading && !isValid}
          style={!isValid ? { cursor: "not-allowed" } : { cursor: "pointer" }}
        >
          Sign In
        </Button>
      </Form>
      <Row className="my-3">
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
