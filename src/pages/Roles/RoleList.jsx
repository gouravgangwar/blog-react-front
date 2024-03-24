import React, { useState, useEffect } from "react";
import "./RoleList.css";
import Table from "react-bootstrap/Table";
import {base_url} from "../../services/api.service";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { useNavigate } from "react-router-dom";
function RoleList() {
  const [roles, setroles] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchroles();
  }, [page, searchQuery]);

  const fetchroles = async () => {
    try {
      const response = await fetch(
        `${base_url}roleList?page=${page}&limit=10&search=${searchQuery}`
      );
      const data = await response.json();
      setroles(data.items);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const deletePost = async (value) => {
    try {
      await fetch(`${base_url}deleteRole/${value}`, { method: "DELETE" });
      // Refetch roles after deletion
      fetchroles();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  function editPage(value) {
    navigate(`/editrole/${value}`);
  }

  function addRole(){
    navigate(`/addrole`);
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Card className="cardName">
        <Card.Body>
          <div className="row">
            <div className="col-md-10 ">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            </div>
            <div className="col-md-2 ">
            <Button variant="primary" onClick={() => addRole()}>
                      Add Role
                    </Button>
            </div>

          </div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Role Name</th>
                <th>Publish date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={role._id}>
                  <td>{index + 1}</td>
                  <td
                    style={{
                      maxWidth: "300px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {role.role.length > 100
                      ? `${role.role.substring(0, 100)}...`
                      : role.role}
                  </td> 
                  <td>
                    {moment(role.created_at).format("DD-MM-YYYY : HH:mm")}{" "}
                  </td>
                  <td>
                    <Button variant="info" onClick={() => editPage(role._id)}>
                      Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="danger"
                      onClick={() => deletePost(role._id)}
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

export default RoleList;
