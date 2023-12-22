import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductProps } from "./types";
import { useSelector } from "react-redux";
import Rating from "../Rating";
import { type RootState } from "../../redux/slices";

export const Product = ({ product }: ProductProps): JSX.Element => {
  const { isError, isLoading } = useSelector(
    (state: RootState) => state.productsReducer
  );

  if (isLoading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error while fetching data. Please try again.</h1>
      </div>
    );
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} alt={product.description} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="product-text">
          <p>{product.description}</p>
        </Card.Text>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
