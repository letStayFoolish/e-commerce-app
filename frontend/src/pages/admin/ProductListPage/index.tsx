import { Button, Col, Row, Table } from "react-bootstrap";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { handleErrorMessage } from "../../../utils/handleErrorMessageFromRTK";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { addDecimals } from "../../../utils";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/slices/apiSlices/productApi";
import { ObjectId } from "mongoose";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../../components/Paginate";
import { useSelector } from "react-redux";
import { type RootState } from "../../../redux/store";

const ProductListPage = () => {
  let { pageNumber } = useParams();

  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  if (!pageNumber) {
    pageNumber = "1";
  }
  // API Query:
  const { data, refetch, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });
  // API Mutation:
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductMutation();

  const errorMessage = handleErrorMessage(error!);

  const deleteHandler = async (productId: ObjectId): Promise<void> => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(productId);
        refetch();
        toast.success("Product deleted");
      } catch (err) {
        toast.error(handleErrorMessage(err!));
      }
    }
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

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            onClick={createProductHandler}
            type="button"
            className="btn-sm m-3"
          >
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDeleteProduct && <Loader />}

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
                <th>IN STOCK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.products &&
                data.products.map((product) => (
                  <tr key={product._id.toString()}>
                    <td>{product._id.toString()}</td>
                    <td>{product.name}</td>
                    <td>${addDecimals(Number(product.price))}</td>
                    <td>{product.origin}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button onClick={() => deleteHandler(product._id)}>
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          {data && userInfo && (
            <Paginate
              pages={data.pages}
              page={data.page}
              pathname="admin/productlist"
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductListPage;
