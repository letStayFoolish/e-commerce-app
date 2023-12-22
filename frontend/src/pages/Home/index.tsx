import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
// import { useProducts } from "../../hooks/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../redux/slices";
import { useEffect } from "react";
import { getAllProductsSliceStart } from "../../redux/slices/ProductsSlice";

const Home = () => {
  // const [products, loading] = useProducts();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsSliceStart());
  }, [dispatch]);

  const { isError, isLoading, products } = useSelector(
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
