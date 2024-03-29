import { useSelector, useDispatch } from "react-redux";
import { useProfileApiSliceMutation } from "../../redux/slices/apiSlices/usersApi";
import { RootState } from "../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/slices/UserSlice/authSlice";
import { useGetMyOrdersQueryQuery } from "../../redux/slices/apiSlices/ordersApi";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { handleErrorMessage } from "../../utils/handleErrorMessageFromRTK";
import { addDecimals } from "../../utils";

const ProfilePage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  const [updateProfile, { isLoading: loadingProfileProfile }] =
    useProfileApiSliceMutation();
  const {
    data: orders,
    refetch,
    isLoading,
    error,
  } = useGetMyOrdersQueryQuery(undefined);
  const errorMessage = handleErrorMessage(error!);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, setName, setEmail]);

  useEffect(() => {
    if (!orders) {
      return;
    }
    refetch();
  }, [orders, refetch]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   toast.error("Password do not match");
    // }

    try {
      const res = await updateProfile({
        _id: userInfo?._id,
        name,
        email,
      }).unwrap();
      dispatch(setCredentials(res));
      refetch();
      toast.success("Profile updated successful");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name" // text ??
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value || "")}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value || "")}
            ></Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value || "")}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value || "")}
            ></Form.Control>
          </Form.Group> */}

          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>

          {loadingProfileProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders!.map((order) => (
                <tr key={order._id!.toString()}>
                  <td>{order._id!.toString()}</td>
                  <td>{order.createdAt!.substring(0, 10)}</td>
                  <td>${addDecimals(Number(order.totalPrice))}</td>
                  <td>
                    {order.isPaid ? (
                      <div>{order.paidAt!.substring(0, 10)}</div>
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <div>{order.deliveredAt!.substring(0, 10)}</div>
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
