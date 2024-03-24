import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import blog_1 from "../../assets/blog_1.jpg";
import { base_url } from "../../services/api.service";
import { useNavigate, useParams } from "react-router-dom";
function AddRole() {
  let { id } = useParams();
  const initialData = {
    role: "",
  };

  const [inputData, setInputData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const handleInput1Change = (event) => {
    setInputData({ ...inputData, role: event.target.value });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${base_url}rolebyid/${id}`);
      const data = await response.json();
      setInputData(data.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoading(false);
    }
  };

  function handleFormData(event) {
    event.preventDefault();
    const errors = {};
    if (!inputData.role.trim()) {
      errors.role = "Role is required";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(inputData);
      console.log(id);
      if (id) {
        const requestOptions1 = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputData),
        };
        fetch(`${base_url}updaterole/${id}`, requestOptions1)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            navigate("/role");
          });
      } else {
        // Perform form submission here
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputData),
        };
        fetch(`${base_url}createRole`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            navigate("/role");
          });
      }
    }
  }

  return (
    <div>
      <div className="cardSetContainer">
        <div className="card1">
          <img src={blog_1} alt="Card" />
        </div>
        <div className="card">
          <Card.Body>
            <Card.Title>Add Role</Card.Title>
            <hr />
            <Form onSubmit={handleFormData}>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label>Role Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={inputData.role}
                  onChange={handleInput1Change}
                  isInvalid={!!errors.role}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="buttonSection">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}

export default AddRole;
