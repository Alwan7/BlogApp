import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Typography, Button, Container, TextField } from "@material-ui/core";
import { PageVariants } from "../animation";
import { motion } from "framer-motion";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

function CreateItem() {
  const [input, setInput] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        history.push("/admin/ManageItems");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          Create a post
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={input.author}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={input.title}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Tags"
            name="tags"
            value={input.tags}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            label="Content"
            rows={5}
            name="content"
            value={input.content}
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
            Create
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

export default CreateItem;
