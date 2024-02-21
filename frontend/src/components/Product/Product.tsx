import { Image, Col, Row, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/slices/apiSlices/productApi";

export const Product = () => {
  const { productId: productId } = useParams();

  const { data: product } = useGetProductDetailsQuery(productId!);

  if (!product) {
    return;
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};
