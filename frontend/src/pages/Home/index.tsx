import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import { useProducts } from "../../hooks/useProducts";

const Home = () => {
  const [products, loading] = useProducts();

  if (loading) {
    return <div>Loading...</div>;
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
