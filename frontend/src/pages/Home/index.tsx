import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../../redux/slices/apiSlices/productApi";
import Product from "../../components/Product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const Home = () => {
  let { keyword, pageNumber } = useParams();

  if (!keyword) {
    keyword = "";
  }

  if (!pageNumber) {
    pageNumber = "";
  }

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

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
      {!keyword && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      <Row>
        {data &&
          data.products?.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id.toString()}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      {data && (
        <Paginate
          pages={data.pages}
          page={data.page}
          pathname="page"
          keyword={keyword ? keyword : ""}
        />
      )}
    </>
  );
};

export default Home;
