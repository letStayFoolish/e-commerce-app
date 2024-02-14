import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeItemFromCart } from "../../redux/slices/CartSlice";
import { IProduct } from "../../types";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleChangeQtyInCart(
    item: IProduct,
    qty: number
  ): Promise<void> {
    dispatch(addToCart({ ...item, qty }));
  }

  async function handleRemoveItemFromCart(itemId: string): Promise<void> {
    dispatch(removeItemFromCart(itemId));
  }

  function handleCheckout() {
    navigate("/login?redirect=/shipping");
  }

  const cart = useSelector((state: RootState) => state.cartReducer);
  const { cartItems } = cart;

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>

        <Button onClick={() => navigate(-1)} className="btn btn-light my-3">
          Go Back
        </Button>

        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id.toString()}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        handleChangeQtyInCart(item, Number(e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        handleRemoveItemFromCart(item._id.toString())
                      }
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty!, 0)})</h2>$
              {cartItems.reduce((acc, item) => {
                const result: string = (acc + item.qty! * item.price).toFixed(
                  2
                );

                return Number(result);
              }, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
