import { AppsContext } from "@/config/appProvider";
import { IComment } from "@/lib/comment/interface";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

function PostComment() {
  const { currentPost, comment } = useContext(AppsContext);
  const [data, setData] = useState<IComment[]>([]);

  useEffect(() => {
    async function getComment() {
      if (!currentPost) return;
      const resp = await comment!.getComments(currentPost.id);
      if (resp.data) {
        setData(resp.data as IComment[]);
      }
    }
    getComment();
  }, [comment, currentPost]);

  if (!currentPost) return <></>;
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        {" "}
        Comments{" "}
      </Typography>
      {data.map((item, index) => (
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
