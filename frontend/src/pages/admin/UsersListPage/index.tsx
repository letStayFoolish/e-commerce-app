import { Button, Table } from "react-bootstrap";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux/slices/apiSlices/usersApi";
import { handleErrorMessage } from "../../../utils/handleErrorMessageFromRTK";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../../components/Paginate";

const UsersListPage = () => {
  let { pageNumber } = useParams();

  if (!pageNumber) {
    pageNumber = "";
  }

  const { data, refetch, isLoading, error } = useGetUsersQuery({ pageNumber });

  const errorMessage = handleErrorMessage(error!);
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete user")) {
      try {
        await deleteUser(userId);
        refetch();
        toast.success(`User ${userId} deleted`);
      } catch (error) {
        toast.error(handleErrorMessage(error!));
      }
    }
  };

  if (!data) {
    return;
  }

  return (
    <>
      <h1>Users</h1>

      {deleteLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        data &&
        data.users && (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id.toString()}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {data && (
              <Paginate
                page={data.page}
                pages={data.pages}
                pathname="admin/userlist"
                keyword=""
              />
            )}
          </>
        )
      )}
    </>
  );
};

export default UsersListPage;
