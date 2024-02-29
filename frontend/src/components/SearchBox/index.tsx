import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "../../utils";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const debouncedValue = useDebounce<string>(keyword, 300);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      navigate(`/search/${debouncedValue.trim()}`);
    } else {
      navigate("/");
    }
  }, [debouncedValue, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search Product..."
        name="q"
        value={keyword}
        onChange={handleChange}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
