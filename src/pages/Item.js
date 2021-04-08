import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@material-ui/core";
import { motion } from "framer-motion";
import { PageVariants } from "./animation";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const Item = ({ match }) => {
  console.log("PostId:", match.params.id);
  const [post, setPost] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/posts/" + match.params.id
      );
      if (!response.ok) {
        throw new Error("HTTP Error! status: " + response.status);
      }
      const data = await response.json();
      setPost(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div initial={"start"} animate={"stop"} variants={PageVariants}>
      <Container align="center">
        <Box m={2} width={3 / 4}>
          <Typography
            variant="h4"
            color="secondary"
            align="center"
            gutterBottom
          >
            Blogpost
          </Typography>
          {
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body1" component="h2">
                  {post.content}
                  <CardActions
                    style={{ justifyContent: "center" }}
                  ></CardActions>
                </Typography>
                Author
                <Typography color="caption" gutterBottom>
                  {post.author}
                </Typography>
                Tags
                <Typography color="textSecondary" gutterBottom>
                  {post.tags}
                </Typography>
              </CardContent>

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
                  to="/Items"
                >
                  Back
                </Link>
              </Button>
            </Card>
          }
        </Box>
      </Container>
    </motion.div>
  );
};

export default Item;
