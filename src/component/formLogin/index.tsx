"use client";

import { AppsContext } from "@/config/appProvider";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

function FormLogin() {
  const { authentication, cookie, fetchCurrentUser } = useContext(AppsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => !prev);
    const resp = await authentication!.login(email, password);
    if (resp.error) {
      setError(resp.error);
      setLoading((prev) => !prev);
      return;
    }
    cookie!.create(resp.userId?.toString() || "");
    await fetchCurrentUser!();
    setLoading((prev) => !prev);
    router.push("/");
  };

  return (
    <Box
      component="form"
      sx={{ maxWidth: "40rem", px: 3, py: 10, bgcolor: "#fff" }}
      onSubmit={handleSubmit}
    >
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        type="email"
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        sx={{ my: 2 }}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" type="submit" disabled={loading}>
        Login
      </Button>
    </Box>
  );
}

export default FormLogin;
