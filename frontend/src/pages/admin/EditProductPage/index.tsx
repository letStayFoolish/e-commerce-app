import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../redux/slices/apiSlices/productApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { handleErrorMessage } from "../../../utils/handleErrorMessageFromRTK";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer";
import { toast } from "react-toastify";
import type { IUpdatedProduct } from "../../../types";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId!);

  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: uploadImageLoading }] =
    useUploadProductImageMutation();

  const errorMessage = handleErrorMessage(error!);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [countInStock, setCountInStock] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setOrigin(product.origin);
      setCategory(product.category);
      setImage(product.image);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const updatedProduct: IUpdatedProduct = {
      _id: productId!,
      name,
      description,
      origin,
      category,
      image,
      price,
      countInStock,
    };

    try {
      await updateProduct(updatedProduct);
      refetch();
      navigate(-1);
      toast.success(`Product: ${updatedProduct._id} have been updated`);
    } catch (err) {
      toast.error(err);
    }
  };

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("image", e.target.files![0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log("RES: ", res);
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(handleErrorMessage(err!));
    }
  };

  return (
    <>
      <Link to={"/admin/productlist"} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {uploadImageLoading && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* // TODO: USE DEBOUNCE ON INPUT CHANGE */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="origin">
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(parseFloat(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                // label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {updateProductLoading && <Loader />}
            </Form.Group>
            <Button variant="primary" type="submit" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditProductPage;
