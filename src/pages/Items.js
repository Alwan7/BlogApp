import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
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
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

function Items({ deletePost }) {
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

  return (
    <motion.div initial={"start"} animate={"stop"} variants={PageVariants}>
      <Box m={1}>
        <Container align="center">
          <Button
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
              Manage posts
            </Link>
          </Button>
          <Typography
            variant="h4"
            color="secondary"
            align="center"
            gutterBottom
          >
            Blog
          </Typography>
          {posts.map((post) => (
            <Box m={2} width={3 / 4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h4" component="h2">
                    {post.title}
                  </Typography>
                  <Typography noWrap variant="body1" component="h2">
                    {post.content}
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        endIcon={<KeyboardArrowRightIcon />}
                        color="secondary"
                        variant="outlined"
                      >
                        <Link
                          style={{ color: "#f50057", textDecoration: "none" }}
                          to={`/Item/${post["_id"]}`}
                        >
                          Read more
                        </Link>
                      </Button>
                    </CardActions>
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
              </Card>
            </Box>
          ))}
        </Container>
      </Box>
    </motion.div>
  );
}

export default Items;
