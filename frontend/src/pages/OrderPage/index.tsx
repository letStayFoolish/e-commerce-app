import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/slices/apiSlices/ordersApi";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { addDecimals } from "../../utils";
import { handleErrorMessage } from "../../utils/handleErrorMessageFromRTK";
import type { RootState } from "../../redux/store";

const OrderPage = () => {
  const navigate = useNavigate();
  const { id: orderID = "" } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderID as string);
  const errorMessage = handleErrorMessage(error!);

  // In order to achieve complete granular control over re-fetching data,
  // you can use the refetch function returned as a result property from a useQuery or useQuerySubscription hook.
  // Calling the refetch function will force refetch the associated query.

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );
  const [updateOrderDeliverStatus, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const onApproveTest = async () => {
    if (!orderID || !order) {
      return;
    }
    await payOrder({ orderID, details: order });
    refetch();
    toast.success("Payment successful");
  };

  const deliverOrderHandler = async () => {
    if (!orderID) {
      return;
    }

    try {
      await updateOrderDeliverStatus(orderID);

      refetch();
      toast.success("Order status updated to delivered");
    } catch (err) {
      toast.error(errorMessage);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{errorMessage}</Message>
  ) : (
    order && (
      <>
        <h1>Order {order._id && order._id.toString()}</h1>

        <Button onClick={() => navigate(-1)} className="btn btn-light my-3">
          Go Back
        </Button>

        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.postalCode}{" "}
                  {order.shippingAddress.city}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>

                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>

                {order.orderItems.map(
                  (item) =>
                    item && (
                      <ListGroup.Item key={item._id.toString()}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty!} x {item.price} ={" "}
                            {addDecimals(item.qty! * item.price)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${addDecimals(Number(order.itemsPrice))}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${addDecimals(Number(order.shippingPrice))}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${addDecimals(Number(order.taxPrice))}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${addDecimals(Number(order.totalPrice))}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Orders
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
                {/*  PAY ORDER PLACEHOLDER  */}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverOrderHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
};

export default OrderPage;
