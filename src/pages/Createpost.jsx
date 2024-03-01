import "./Createpost.css";
import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import blog_1 from "../assets/blog_1.jpg";
import JoditEditor from "jodit-react";
import base_url from "../services/api.service";
import { useNavigate, useParams } from "react-router-dom";
function Createpost() {
  let { id } = useParams();
  const editor = useRef(null);
  const initialData = {
    title: "",
    owner: "",
    type: "",
    category: "",
    content: "",
  };
  const [inputData, setInputData] = useState(initialData);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${base_url}blogbyid/${id}`);
      const data = await response.json();
      setInputData(data.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setInputData({ ...inputData, category: event.target.value });
  };

  const handleRadioChange = (e) => {
    setInputData({
      ...inputData,
      type: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleInput1Change = (event) => {
    setInputData({ ...inputData, title: event.target.value });
  };

  const handleInput2Change = (event) => {
    setInputData({ ...inputData, owner: event.target.value });
  };

  function handleFormData(event) {
    event.preventDefault();
    const errors = {};
    if (!inputData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!inputData.owner.trim()) {
      errors.owner = "Owner Name is required";
    }
    if (!inputData.category) {
      errors.category = "Category is required";
    }
    if (!inputData.content) {
      errors.content = "content is required";
    }
    const selectedType = Object.values(inputData.type).some((val) => val);
    if (!selectedType) {
      errors.type = "Select at least one type";
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
        fetch(`${base_url}updateblog/${id}`, requestOptions1)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            navigate("/listpost");
          });
      } else {
        // Perform form submission here
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputData),
        };
        fetch(`${base_url}createblog`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            navigate("/listpost");
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
            <Card.Title>Add Post</Card.Title>
            <hr />
            <Form onSubmit={handleFormData}>
              <Form.Group className="mb-3" controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={inputData.title}
                  onChange={handleInput1Change}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formGroupType">
                <Form.Label as="legend" column sm={2}>
                  Type
                </Form.Label>
                <Col sm={10} style={{ display: "inline-flex" }}>
                  <Form.Check
                    type="radio"
                    label="Reference"
                    name="type"
                    id="reference"
                    className="FormCheckMargin"
                    value="reference"
                    checked={inputData.type === "reference"}
                    onChange={handleRadioChange}
                    isInvalid={!!errors.type}
                  />
                  <Form.Check
                    type="radio"
                    label="Own"
                    name="type"
                    id="own"
                    className="FormCheckMargin"
                    value="own"
                    checked={inputData.type === "own"}
                    onChange={handleRadioChange}
                    isInvalid={!!errors.type}
                  />
                </Col>
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupCategory">
                <Form.Label>Category</Form.Label>

                <Form.Select
                  aria-label="Default select Category"
                  value={inputData.category}
                  onChange={handleSelectChange}
                  isInvalid={!!errors.category}
                >
                  <option>Open this select Category</option>
                  <option value="1">LifeStyle</option>
                  <option value="2">Travel</option>
                  <option value="3">Tech</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupContent">
                <Form.Label>Content</Form.Label>

                <JoditEditor
                  ref={editor}
                  value={inputData.content}
                  // config={config}
                  tabIndex={1} // tabIndex of textarea
                  onChange={(newContent) =>
                    setInputData({ ...inputData, content: newContent })
                  }
                  isInvalid={!!errors.category}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupowner">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={inputData.owner}
                  onChange={handleInput2Change}
                  isInvalid={!!errors.owner}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.owner}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="buttonSection">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                &nbsp;
                <Button variant="light" type="reset">
                  Clear
                </Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}

export default Createpost;
