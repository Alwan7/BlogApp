import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Typography, Button, Container, TextField } from "@material-ui/core";
import { PageVariants } from "../animation";
import { motion } from "framer-motion";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

function UpdateItem({ match }) {
  console.log(match);

  const [post, setPost] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchPost();
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/posts/" + match.params.id
      );
      if (!response.ok) {
        throw new Error("HTTP Error! status: " + response.status);
      }
      const data = await response.json();
      console.log(data);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/posts/" + post["_id"], {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      history.push("/admin/ManageItems");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div initial={"start"} animate={"stop"} variants={PageVariants}>
      <Container align="center">
        <Typography
          variant="h4"
          color="secondary"
          align="center"
          gutterTop
          gutterBottom
        >
          Update post
        </Typography>
        <form noValidate autoComplete="off" onSubmit={updatePost}>
          <TextField
            fullWidth
            name="author"
            style={{ margin: 8 }}
            InputLabelProps={{
              shrink: true,
            }}
            label="Author"
            variant="filled"
            value={post.author}
            onChange={handleChange}
          />
          <br />

          <TextField
            label="Title"
            name="title"
            variant="filled"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{ margin: 8 }}
            value={post.title}
            onChange={handleChange}
          />
          <br />

          <TextField
            label="Tags"
            variant="filled"
            name="tags"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{ margin: 8 }}
            value={post.tags}
            onChange={handleChange}
          />
          <br />

          <TextField
            fullWidth
            multiline
            name="content"
            rows={5}
            label="Content"
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ margin: 8 }}
            value={post.content}
            onChange={handleChange}
          />

          <br />
          <br />
          <Button
            size="medium"
            type="submit"
            textDecoration="none"
            color="secondary"
            variant="contained"
          >
            Update
          </Button>
          <br />
          <br />
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            size="small"
            disableElevation
            color="secondary"
            textDecoration="none"
            color="secondary"
            variant="contained"
          >
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/ManageItems"
            >
              Back
            </Link>
          </Button>
        </form>
      </Container>
    </motion.div>
  );
}

export default UpdateItem;
