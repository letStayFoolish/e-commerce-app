import {
  Navbar,
  Nav,
  Container,
  NavLink,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/UserSlice/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogoutApiSliceMutation } from "../../redux/slices/apiSlices/usersApi";

const Header = () => {
  const [logoutApiCall] = useLogoutApiSliceMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const { userInfo } = useSelector(
    (state: RootState) => state.authSliceReducer
  );

  const logoutHandler = async () => {
    try {
      await logoutApiCall(undefined).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong while logging out");
      }
    }
  };

  return (
    <header>
      <Navbar expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <NavLink>
              <img src={logo} alt="ProShop" width={"80px"} />
              Coffee Shop
            </NavLink>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <NavLink>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty!, 0)}
                    </Badge>
                  )}
                </NavLink>
              </LinkContainer>
              {userInfo?.name ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <NavLink>
                    <FaUser /> Sign in
                  </NavLink>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
