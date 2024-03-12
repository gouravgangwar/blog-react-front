import React, { useState, useEffect } from "react";
import base_url from "../services/api.service";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import { Carousel  } from "react-responsive-carousel";
import blog_1 from "../assets/blog_1.jpg";

function Home() {
  const [blogs, setBlogs] = useState([]);
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  function editPage(value) {
    navigate(`/seepost/${value}`);
  }

  const redirectionBlogDetails = (blog) => {
    console.log(blog);
  }

  return (
    <>
    <Carousel autoPlay:true>
    {blogs.map((blog, index) => (
      <div key={index} onClick={()=>redirectionBlogDetails(blog)}> 
        <img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  />
      </div>
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
              <a className="linkName" onClick={() => editPage(blog._id)}>
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
