import { useParams, Link } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/slices/apiSlices/ordersApi";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { addDecimals } from "../../utils";

const OrderPage = () => {
  const { id: orderID = "" } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderID as string);
  // In order to achieve complete granular control over re-fetching data,
  // you can use the refetch function returned as a result property from a useQuery or useQuerySubscription hook.
  // Calling the refetch function will force refetch the associated query.

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const onApproveTest = async () => {
    if (!orderID || !order) {
      return;
    }
    await payOrder({ orderID, details: order });
    refetch();
    toast.success("Payment successful");
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error}</Message>
  ) : (
    order && (
      <>
        <h1>Order {order._id.toString()}</h1>

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

                {order.orderItems.map((item, index: number) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty!} x {item.price} ={" "}
                        {addDecimals(item.qty! * item.price)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
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
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
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
                {/*  MARK AS DELIVERED PLACEHOLDER */}
                {!order.isDelivered && <ListGroup.Item></ListGroup.Item>}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
};

export default OrderPage;
