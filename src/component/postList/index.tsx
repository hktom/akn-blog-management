"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IPost } from "@/lib/post/interface";
import { Box } from "@mui/material";
import { AppsContext } from "@/config/appProvider";
import { useContext } from "react";

interface IProps {
  posts: IPost[];
}

export default function PostList({ posts }: IProps = { posts: [] }) {
  const { setCurrentPost, setPage } = useContext(AppsContext);
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "primary" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .sort((a, b) => b.id - a.id)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: index % 2 === 0 ? "#F5F5F5" : "white",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                    },
                  }}
                  onClick={() => {
                    setCurrentPost!(row);
                    setPage!(1);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
