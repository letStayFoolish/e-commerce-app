import { Image, Col, Row, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/slices/apiSlices/productApi";

export const Product = () => {
  const { productId: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log("productId: ", productId);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <h2>Loading ...</h2>
  //     </div>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div>
  //       <h2>Error while fetching data. Please try again.</h2>
  //     </div>
  //   );
  // }
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
          <ListGroup variant={flush}>
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
    // <Card className="my-3 p-3 rounded">
    //   <Link to={`/product/${product._id}`}>
    //     <Card.Img src={product.image} alt={product.description} variant="top" />
    //   </Link>
    //   <Card.Body>
    //     <Link to={`/product/${product._id}`}>
    //       <Card.Title as="div" className="product-title">
    //         <strong>{product.name}</strong>
    //       </Card.Title>
    //     </Link>
    //     <Card.Text as="div" className="product-text">
    //       <p>{product.description}</p>
    //     </Card.Text>
    //     <Card.Text as="div">
    //       <Rating
    //         value={product.rating}
    //         text={`${product.numReviews} reviews`}
    //       />
    //     </Card.Text>
    //     <Card.Text as="h3">${product.price}</Card.Text>
    //   </Card.Body>
    // </Card>
  );
};
