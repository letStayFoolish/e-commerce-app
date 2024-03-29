import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Col, ListGroup, Row, Image, Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/slices/apiSlices/ordersApi";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { clearCartItems } from "../../redux/slices/CartSlice";
import { toast } from "react-toastify";
import { addDecimals } from "../../utils";
import { handleErrorMessage } from "../../utils/handleErrorMessageFromRTK";
import { IOrderItem } from "../../types";

export interface IError {
  status: number;
  data: {
    message: string;
    stack: string;
  };
}
const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cartReducer);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  const errorMessage = handleErrorMessage(error!);

  function handleClearInputFieldsWithDelay(delay = 500) {
    const id = setTimeout(() => {
      dispatch(clearCartItems());
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    if (!userInfo) return;

    try {
      const orderItems: IOrderItem[] = cart.cartItems.map((item) => ({
        _id: item._id,
        image: item.image,
        name: item.name,
        price: item.price,
        product: item._id,
        qty: item.qty,
      }));

      const result = await createOrder({
        orderItems: orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        user: userInfo, // TODO: Add user information along with new order
      }).unwrap(); // --> since this return Promise, we do want to unwrap

      handleClearInputFieldsWithDelay();

      navigate(`/order/${result._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
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
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty!} x {item.price} ={" "}
                          {addDecimals(item.qty! * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
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
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{errorMessage}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  onClick={placeOrderHandler}
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </Button>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
