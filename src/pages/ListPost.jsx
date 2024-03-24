import React, { useState, useEffect } from "react";
import "./ListPost.css";
import Table from "react-bootstrap/Table";
import {base_url,blogTypes} from "../services/api.service";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { useNavigate } from "react-router-dom";
function Listpost() {
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

      const mappedObj2 = data.items.map((entry) => {
        const blogType = blogTypes.find((type) => type.id == entry.category);
        console.log(blogType);
        return {
          ...entry,
          category: blogType ? blogType.name : "Unknown",
        };
      });

      console.log(data,blogTypes);
      setBlogs(mappedObj2);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const deletePost = async (value) => {
    try {
      await fetch(`${base_url}deleteblog/${value}`, { method: "DELETE" });
      // Refetch blogs after deletion
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  function editPage(value) {
    navigate(`/editpost/${value}`);
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Card className="cardName">
        <Card.Body>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Content</th>
                 <th>Image</th>
                <th>Category</th>
                <th>Publish date</th>
                <th>Publised by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>

                  <td
                    style={{
                      maxWidth: "300px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {blog.title.length > 100
                      ? `${blog.title.substring(0, 100)}...`
                      : blog.title}
                  </td>
                  <td>{blog.type}</td>

                  <td
                    style={{
                      maxWidth: "300px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {blog.content.length > 100
                      ? `${blog.content.substring(0, 100)}...`
                      : blog.content}
                  </td>
                  <td    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}>
                      {/* {blog.bannerImage?.length > 100
                      ? `${blog.bannerImage?.substring(0, 100)}...`
                      : blog.bannerImage} */}
                      <img className="bannerImage1N" src={blog.bannerImage}/>
                      </td>

                  <td>{blog.category}</td>
                  <td>
                    {moment(blog.created_at).format("DD-MM-YYYY : HH:mm")}{" "}
                  </td>
                  <td>{blog.owner}</td>
                  <td>
                    <Button variant="info" onClick={() => editPage(blog._id)}>
                      Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => deletePost(blog._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        </Card.Body>
      </Card>
    </>
  );
}

export default Listpost;
