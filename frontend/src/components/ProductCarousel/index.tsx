import { Carousel, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useGetTopProductsQuery } from "../../redux/slices/apiSlices/productApi";
import Message from "../Message";
import { handleErrorMessage } from "../../utils/handleErrorMessageFromRTK";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import "./styles.css";

const ProductCarousel = () => {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();

  if (!topProducts) {
    return <h2>No top products</h2>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{handleErrorMessage(error)}</Message>
      ) : (
        <Carousel pause="hover" className="bg-primary mb-4">
          {topProducts!.map((p) => (
            <Carousel.Item key={p._id.toString()}>
              <Link to={`/product/${p._id}`}>
                {/* <Row>
                  <Col md={5}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fluid
                      className="carousel-image"
                    />
                  </Col>
                  <Col md={4}>
                    <p className="carousel-description">
                      <strong>Description: </strong>
                      {p.description}
                    </p>
                  </Col>
                </Row> */}

                <Row style={{ backgroundColor: "white" }}>
                  <Col md={5}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fluid
                      className="carousel-image"
                    />
                  </Col>
                  <Col md={7}>
                    <ListGroup>
                      <ListGroup.Item style={{ border: "none" }}>
                        <h3>{p.name}</h3>
                        <p className="carousel-text">
                          <strong>Tasting notes: </strong>
                          {p.category}
                        </p>
                        <p className="carousel-text">
                          <strong>Description: </strong> {p.description}
                        </p>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {p.name} (${p.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
