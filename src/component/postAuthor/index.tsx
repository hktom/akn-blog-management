"use client";

import { AppsContext } from "@/config/appProvider";
import { IUser } from "@/lib/user/interface";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

function PostAuthor() {
  const { currentPost, user } = useContext(AppsContext);
  const [author, setAuthor] = useState<IUser | null>(null);

  useEffect(() => {
    async function getAuthor() {
      if (!currentPost || !user) return;
      const resp = await user!.getUserById(currentPost!.userId);
      if (resp.data) {
        setAuthor(resp.data as IUser);
      }
    }
    getAuthor();
  }, [currentPost, user]);

  if (!currentPost || !author) return <></>;
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Author
      </Typography>
      <Typography variant="body1" component="p">
        {author.name}, <br /> {author.email} - {author.phone}, {author.website},{" "}
        <br />
        {author.company.name}, {author.company.catchPhrase}, {author.company.bs}
        , {author.address.city}, {author.address.street}, {author.address.suite}
        , {author.address.zipcode}
      </Typography>
    </Box>
  );
}

export default PostAuthor;
