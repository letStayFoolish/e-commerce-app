import { Button, Col, Row, Table } from "react-bootstrap";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { handleErrorMessage } from "../../../utils/handleErrorMessageFromRTK";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { addDecimals } from "../../../utils";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../../redux/slices/apiSlices/productApi";
import { ObjectId } from "mongoose";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingNewProduct }] =
    useCreateProductMutation();

  const errorMessage = handleErrorMessage(error!);

  const deleteHandler = (productId: ObjectId): void => {
    console.log(productId);
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Product successfully created");
      } catch (err) {
        toast.error(errorMessage);
      }
    }
  };

  console.log("Product: ", products);

  return (
    <>
      <Row>
        <Col md={4}>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button
            onClick={createProductHandler}
            type="button"
            className="btn-sm m-3"
          >
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingNewProduct && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>ORIGIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id.toString()}>
                    <td>{product._id.toString()}</td>
                    <td>{product.name}</td>
                    <td>${addDecimals(Number(product.price))}</td>
                    <td>{product.origin}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button onClick={() => deleteHandler(product._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductPage;
