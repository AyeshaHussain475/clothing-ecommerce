import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  TextField,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [clothesData, setClothesData] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust the number of items per page as needed

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      toast.success("Product deleted successfully!");
      // Refresh the clothesData after deleting the product
      const result = await axios.get("/products");
      setClothesData(result.data);
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing the filter
  };

  const filteredClothesData = clothesData.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalItems = filteredClothesData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClothesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const getClothes = async () => {
      try {
        const result = await axios.get("/products");
        setClothesData(result.data);
        console.log(result.data);
      } catch (err) {
        toast.error("Failed to fetch clothes!");
      }
    };
    getClothes();
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hussain's Clothing Brand
          </Typography>
          <Button component={Link} to="/arrival" color="inherit">
            Arrival
          </Button>
          <Button component={Link} to="/men" color="inherit">
            Men
          </Button>
          <Button component={Link} to="/women" color="inherit">
            Women
          </Button>
          {/* Add more links as needed */}
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ marginTop: "20px" }}>
          Welcome to Our Clothing Brand
        </Typography>

        <TextField
          label="Filter by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filter}
          onChange={handleFilterChange}
        />

        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          {currentItems.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link to={`/product/${item._id}`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ fontSize: "24px", color: "blue" }}
                    />
                  </Link>

                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ fontSize: "24px", color: "red" }}
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalItems > itemsPerPage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => paginate(value)}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
