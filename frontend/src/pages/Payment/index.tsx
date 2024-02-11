import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import { RootState } from "../../redux/store";
import FormContainer from "../../components/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { savePaymentMethod } from "../../redux/slices/CartSlice";
import { type ICartState } from "../../redux/slices/CartSlice/types";

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
  }, [paymentMethod, shippingAddress, navigate]);

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
              className="my-2"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={paymentMethod === ""}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
