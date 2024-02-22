import FormLogin from "@/component/formLogin";
import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | blog CMS",
  description: "Login page of the blog CMS",
};

function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100%",
        pt: 20,
      }}
    >
      <Typography component="h1" variant="h3" sx={{ mb: 4 }}>
        Login
      </Typography>
      <FormLogin />
    </Box>
  );
}

export default LoginPage;
