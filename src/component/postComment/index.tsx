import { AppsContext } from "@/config/appProvider";
import { comment } from "@/config/bootsrap";
import { IComment } from "@/lib/comment/interface";
import { IPost } from "@/lib/post/interface";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

function PostComment({ comments }: { comments: IComment[] }) {
  if (!comments) return <></>;

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        {" "}
        Comments{" "}
      </Typography>
      {comments.map((item, index) => (
        <Card variant="outlined" key={index}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {item.id}
            </Typography>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.email}
            </Typography>
            <Typography variant="body2">{item.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default PostComment;
