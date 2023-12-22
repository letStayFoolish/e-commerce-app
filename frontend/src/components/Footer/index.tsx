import { Container, Row, Col } from "react-bootstrap";
import { getFullYear } from "../../utils";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Coffee Shop &copy; {getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
