import { Box, Button, TextField } from "@mui/material";

interface IProps {}

function FormLogin() {
  return (
    <Box
      component="form"
      sx={{ width: "100%", px: 3, py: 10, bgcolor: "#fff" }}
    >
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        fullWidth
      />
      <TextField
        id="outlined-basic"
        label="password"
        variant="outlined"
        type="password"
        fullWidth
        sx={{ my: 2 }}
      />

      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
}

export default FormLogin;
