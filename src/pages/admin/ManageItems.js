import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ButtonGroup, Container, Button, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { motion } from "framer-motion";
import { PageVariants } from "../animation";

function ManageItems() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts");
      if (!response.ok) {
        throw new Error("HTTP Error! status: " + response.status);
      }
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await fetch("http://localhost:5000/posts/" + postId, {
        method: "DELETE", // GET, POST, PATCH, DELETE
      });
    } catch (message) {
      throw new Error(message);
    }

    fetchPosts();
  };

  return (
    <motion.div initial={"start"} animate={"stop"} variants={PageVariants}>
      <Container>
        <ButtonGroup
          size="small"
          disableElevation
          color="secondary"
          textDecoration="none"
          color="secondary"
          variant="contained"
        >
          <Button>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/Items"
            >
              Posts
            </Link>
          </Button>
          <Button>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/CreateItem"
            >
              Create post
            </Link>
          </Button>
        </ButtonGroup>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Handle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>

                  <TableCell>{post.author}</TableCell>

                  <TableCell>{post.content}</TableCell>

                  <TableCell>{post.tags}</TableCell>

                  <TableCell align="center">
                    <ButtonGroup
                      size="small"
                      disableElevation
                      color="secondary"
                      textDecoration="none"
                      color="secondary"
                      variant="contained"
                    >
                      <Button>
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to={`/updateItem/${post["_id"]}`}
                        >
                          Update
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          deletePost(post._id);
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </motion.div>
  );
}

export default ManageItems;
