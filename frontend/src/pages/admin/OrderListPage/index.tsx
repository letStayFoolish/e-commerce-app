import { Button, Table } from "react-bootstrap";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { useGetAllOrdersQuery } from "../../../redux/slices/apiSlices/ordersApi";
import { handleErrorMessage } from "../../../utils/handleErrorMessageFromRTK";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { addDecimals } from "../../../utils";
import Paginate from "../../../components/Paginate";
import { useParams } from "react-router-dom";

const OrderListPage = () => {
  let { pageNumber } = useParams();

  if (!pageNumber) {
    pageNumber = "";
  }

  const { data, isLoading, error } = useGetAllOrdersQuery({ pageNumber });

  if (!data) return;

  const errorMessage = handleErrorMessage(error!);

  return (
    <>
      <h1>Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        data.orders && (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATA</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((order) => (
                  <tr key={order._id!.toString()}>
                    <td>{order._id!.toString()}</td>
                    <td>{order.user.toString()}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>${addDecimals(Number(order.totalPrice))}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt?.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt?.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {data && (
              <Paginate
                pathname="admin/orderlist"
                page={data.page}
                pages={data.pages}
                keyword=""
              />
            )}
          </>
        )
      )}
    </>
  );
};

export default OrderListPage;
