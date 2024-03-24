import React, { useState, useEffect } from "react";
import { base_url } from "../services/api.service";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [blogsImage, setImageData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [page, searchQuery]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${base_url}blogList?page=${page}&limit=10&search=${searchQuery}`
      );
      const data = await response.json();
      console.log(data.items);
      setBlogs(data.items);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchAnotherData();
  }, []);

  const fetchAnotherData = async () => {
    try {
      const response = await fetch(`${base_url}blogList`);
      const data = await response.json();
      setImageData(data.items);
    } catch (error) {
      console.error("Error fetching another data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  function seePage(value) {
    console.log(value);
    navigate(`/seepost/${value}`);
  }

  return (
    <>
      <Carousel className="custom-carousel" pause="hover">
        {blogsImage.slice(0, 5).map((item) => (
          <Carousel.Item key={item.title}>
            <img
              className="d-block w-100"
              src={item.bannerImage}
              alt={item.title}
              onClick={() => seePage(item._id)}
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.owner}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="home-articles max-width-1 m-auto font2">
        <h2>Featured Articles</h2>
        <div className="year-box adjust-year">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div>
            <h3>Year </h3>
          </div>
          <div>
            <input type="radio" name="year" id="" /> 2020
          </div>
          <div>
            <input type="radio" name="year" id="" /> 2021
          </div>
        </div>

        {blogs.map((blog, index) => (
          <div className="home-article" key={index}>
            <div className="home-article-content font1">
              <a className="linkName" onClick={() => seePage(blog._id)}>
                <h3>{blog.title}</h3>
              </a>
              {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> */}
              <div>Author Name : {blog.owner}</div>
              <span>
                {moment(blog.created_at).format("DD-MM-YYYY : HH:mm")}
              </span>
            </div>
          </div>
        ))}
        <div>
          <Button
            variant="light"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="light"
            onClick={() => setPage(page + 1)}
            disabled={page === 1}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
