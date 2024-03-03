import { ListGroup, Row, Col, Image, Button } from "react-bootstrap";
import { IProduct } from "../../types";
import { addDecimals } from "../../utils";
import { NavigateFunction } from "react-router-dom";

export const addToCartToast = (
  product: IProduct,
  navigate: NavigateFunction,
  qty: number
) => (
  <ListGroup variant="flush">
    <h3>Added to Cart</h3>
    <hr />
    <Row>
      <Col>
        <Image
          src={product.image}
          alt={product.name}
          fluid
          style={{ height: "80px" }}
        />
      </Col>
      <Col>
        <strong>{product.name}</strong>
        <p>${product.price}</p>
      </Col>
    </Row>

    <hr />
    <p>
      You have add {qty} {qty > 1 ? "items" : "item"} to your cart
    </p>
    <hr />
    <p>
      <strong>Total: </strong> ${addDecimals(qty * product.price)}
    </p>
    <Button className="btn my-3" onClick={() => navigate("/cart")}>
      Checkout
    </Button>
  </ListGroup>
);
