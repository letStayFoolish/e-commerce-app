import { FormEvent, useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterApiSliceMutation } from "../../redux/slices/apiSlices/usersApi";
import { setCredentials } from "../../redux/slices/UserSlice/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { IUser } from "../../types";
import { type ErrorApiSLice } from "../../redux/slices/apiSlices/types";
import "./style.css";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmationPassword, setConfirmationPassword] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterApiSliceMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (confirmationPassword !== password) {
      toast.error("Passwords are not matching. Please try again");
    } else {
      try {
        const response: IUser = await register({
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials({ ...response }));

        navigate(redirect);

        toast.success("Registered successfully");
      } catch (err) {
        console.log(err);

        const errorData = err as ErrorApiSLice;
        toast.error(
          errorData.data.message ||
            "Something went wong, user registration failed. Please try again"
        );
      }
    }
  }

  useEffect(() => {
    const inputElement = document.getElementById("password");
    if (!inputElement) return; // Exit if the element doesn't exist

    const onInput = (e: Event) => {
      const currentPassword = (e.target as HTMLInputElement).value;
      const guidelines = document
        .getElementById("password-guidelines")
        ?.getElementsByTagName("p");
      if (!guidelines) return; // Exit if guidelines don't exist

      guidelines[1].style.color = currentPassword.length >= 6 ? "green" : "red";
      guidelines[2].style.color = /[A-Z]/.test(currentPassword)
        ? "green"
        : "red";
      guidelines[3].style.color = /\d/.test(currentPassword) ? "green" : "red";
    };

    inputElement.addEventListener("input", onInput);

    // Cleanup function to remove the event listener
    return () => {
      inputElement.removeEventListener("input", onInput);
    };
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Choose Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Choose Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setActive(true)}
            required
          ></Form.Control>
        </Form.Group>
        <div
          id="password-guidelines"
          className={`guidelines ${active ? "guidelines-active" : null}`}
        >
          <p>Your password must contain:</p>
          <p>* At least 6 symbols</p>
          <p>* One uppercase letter</p>
          <p>* Numbers</p>
        </div>

        <Form.Group controlId="confirmationPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Register
        </Button>
      </Form>
      <Row className="my-3">
        <Col>
          Already have an account?&nbsp;
          <Link to={redirect ? `/login?redirect=${redirect}` : "/"}>
            Sing In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
