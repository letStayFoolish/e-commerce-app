import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../../components/Rating";
import { useGetProductDetailsQuery } from "../../redux/slices/apiSlices/productApi";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { IProduct } from "../../types";
import { useState } from "react";

const ProductDetails = (): JSX.Element => {
  const [qty, setQty] = useState<number>(1);
  const navigate = useNavigate();

  const { productId: productId } = useParams();

  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading) {
    return <Loader />;
  }

  if (error && error instanceof Error) {
    return (
      <Message variant="danger">
        {error.message || "Error while fetching data. Please try again."}
      </Message>
    );
  }

  function handleAddToCart(product: IProduct) {
    dispatch(addToCart({ ...product, qty })); // so later on in slice you can do: item.qty or item.price etc...
    navigate("/cart");
  }

  return (
    <>
      <Link
        to={".."}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="btn btn-light my-3"
      >
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.description} fluid />
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product!.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product!.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    <strong>
                      {product!.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty: </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn btn-block"
                  type="button"
                  disabled={product?.countInStock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
