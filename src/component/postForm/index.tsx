"use client";

import { AppsContext } from "@/config/appProvider";
import { IPost } from "@/lib/post/interface";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Title from "./title";

interface IProps {
  data: IPost[];
  setData: (data: any) => void;
}

function PageForm({ data, setData }: IProps = { data: [], setData: () => {} }) {
  const { post, currentPost, page, userId, setPage } = useContext(AppsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(currentPost?.title || "");
  const [body, setBody] = useState(currentPost?.body || "");

  const handleUpdatePost = (payload: IPost) => {
    setData((prev: any) => {
      const data = prev.filter((item: IPost) => item.id !== payload.id);
      return [...data, { ...payload }] as IPost[];
    });
  };

  const handleAddPost = async (payload: IPost) => {
    const resp = await post?.addPost(payload);
    if (resp?.error) {
      setError(resp.error);
      setLoading(false);
      return;
    }
    setData((prev: any) => {
      return [...prev, { ...payload }] as IPost[];
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    if (!currentPost) {
      const id = data.slice(0, 1)[0].id + 1;
      handleAddPost({ title, body, id, userId: userId! });
    } else {
      handleUpdatePost({ ...currentPost, title, body });
    }
    setPage!(0);
  };

  return (
    <Box>
      <Title currentPost={currentPost} />

      <Box
        component="form"
        sx={{ maxWidth: "40rem", px: 3, py: 10, bgcolor: "#fff", mt: 3 }}
        onSubmit={handleSubmit}
      >
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          name="title"
          label="Title"
          variant="outlined"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          id="body"
          label="body"
          multiline
          rows={4}
          sx={{ my: 2 }}
          variant="outlined"
          fullWidth
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <Button variant="contained" type="submit" disabled={loading}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default PageForm;
