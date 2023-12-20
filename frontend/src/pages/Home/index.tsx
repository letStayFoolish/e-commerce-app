import { Row, Col } from "react-bootstrap";
// import products from "../../products";
import Product from "../../components/Product";
import { useEffect, useState } from "react";
import { type IProduct } from "../../types";
import { getProductsAPI } from "../../apis/getProducts";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  console.log("products: ", products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsAPI();

        console.log(fetchedProducts);

        if (fetchedProducts && !(fetchedProducts instanceof Error)) {
          setProducts(fetchedProducts);
        } else {
          console.error("Error while fetching products");
        }

        console.log("fetchedProducts: ", fetchedProducts);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
