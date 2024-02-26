import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import Rating from "../../components/Rating";
import {
  useCreateProductReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/slices/apiSlices/productApi";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { IProduct } from "../../types";
import { FormEvent, useState } from "react";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { handleErrorMessage } from "../../utils/handleErrorMessageFromRTK";

const ProductDetails = (): JSX.Element => {
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const navigate = useNavigate();

  const { productId: productId } = useParams();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId!);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateProductReviewMutation();

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

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createReview({
        _id: productId!,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
    } catch (err) {
      console.log(err);
      toast.error(handleErrorMessage(err!));
    } finally {
      setComment("");
      setRating(0);
    }
  };

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
              <p>
                <strong>Tasting notes: </strong>
                {product?.category}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product!.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product!.price}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Description: </strong> {product?.description}
            </ListGroup.Item>
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
              {product && product.countInStock > 0 && (
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
                  onClick={() => handleAddToCart(product!)}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <h2>Reviews</h2>

          {product?.reviews.length === 0 && <Message>No Reviews</Message>}

          <ListGroup variant="flush">
            {product!.reviews.map((review) => (
              <ListGroup.Item key={review._id.toString()}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} text="" />
                <p>{review.createdAt && review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}

            <ListGroup.Item>
              <h2>Write a Customer Review</h2>

              {loadingProductReview && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <FormGroup controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </FormGroup>
                  <FormGroup controlId="comment" className="my-2">
                    <FormLabel>Comment</FormLabel>
                    <FormControl
                      as="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(String(e.target.value))}
                    ></FormControl>
                  </FormGroup>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loadingProductReview}
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
