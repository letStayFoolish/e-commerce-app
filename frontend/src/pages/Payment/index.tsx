import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { RootState } from "../../redux/store";
import { type ICartState } from "../../redux/slices/CartSlice/types";
import { Button, Col, Form } from "react-bootstrap";
import { savePaymentMethod } from "../../redux/slices/CartSlice";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart: ICartState = useSelector((state: RootState) => state.cartReducer);

  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <h1>Payment</h1>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            ></Form.Check>
            <Form.Check
              type="radio"
              className="my-2"
              label="Second Variant"
              id="Var2"
              name="paymentMethod"
              value="Variant 2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
