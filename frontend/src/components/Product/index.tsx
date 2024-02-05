import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { type ProductProps } from "./types";

export const Product = ({ product }: ProductProps): JSX.Element => {
  return (
    <Card className="my-3 p-3 card">
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
