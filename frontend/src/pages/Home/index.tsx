import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../../redux/slices/apiSlices/productApi";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import { type RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  let { pageNumber } = useParams();
  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  if (!pageNumber) {
    pageNumber = "1";
  }

  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

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

  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {data &&
          data.products?.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id.toString()}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      {data && userInfo && (
        <Paginate pages={data.pages} page={data.page} pathname="page" />
      )}
    </>
  );
};

export default Home;
