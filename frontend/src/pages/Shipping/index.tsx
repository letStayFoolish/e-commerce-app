import { FormEvent, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const ShippingPage = () => {
  const { shippingAddress } = useSelector(
    (state: RootState) => state.cartReducer
  );
  const [address, setAddress] = useState<string>(shippingAddress.address || "");
  const [city, setCity] = useState<string>(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState<string>(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    navigate("/payment");
  };
  return (
    <>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default ShippingPage;
