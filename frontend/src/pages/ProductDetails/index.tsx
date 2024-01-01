import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating";
import { useGetProductDetailsQuery } from "../../redux/slices/apiSlices/productApi";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { IProduct } from "../../types";

const ProductDetails = (): JSX.Element => {
  const { productId: productId } = useParams();

  const dispatch = useDispatch();

  function handleAddToCart(product: IProduct) {
    dispatch(addToCart(product));
    // console.log("PRODUCT: ", product);
  }

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">
        {error?.message || "Error while fetching data. Please try again."}
      </Message>
    );
  }

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
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
