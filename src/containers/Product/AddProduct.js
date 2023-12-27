import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

export const AddProduct = () => {
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`/products/${productId}`);
      const product = response.data;

      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
      setType(product.type);
      setImageUrl(product.imageUrl);
    } catch (error) {
      toast.error("Failed to fetch product details!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        price,
        quantity,
        type,
        imageUrl,
      };
      if (productId) {
        await axios.put(`/products/${productId}`, payload);
        toast.success("Product updated successfully!");
      } else {
        await axios.post("/products", payload);
        toast.success("Product added successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error("Operation failed! Try Again!");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Add a New Product
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={quantity}
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {productId ? "Update" : "Submit"}
        </Button>
      </form>
    </Container>
  );
};
