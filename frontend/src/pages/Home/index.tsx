import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../../redux/slices/apiSlices/productApi";
import Product from "../../components/Product";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div>
        <h2>Loading ...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>
          {error?.message || "Error while fetching data. Please try again."}
        </h2>
      </div>
    );
  }

  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {products?.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
