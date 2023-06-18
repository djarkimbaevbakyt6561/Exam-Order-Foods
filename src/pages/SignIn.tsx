import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../store";
import { signIn } from "../store/auth/auth.thunk";
import { snackBarActions } from "../store/snackBar";
import { ISignIn } from "../types/interfaces";
export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  function getEmailValue(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes("@"));
    setFormValid(passwordValid && emailValid ? true : false);
  }
  function getPasswordValue(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.trim().length > 6);
    setFormValid(passwordValid && emailValid ? true : false);
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e?.preventDefault();
      if (formValid === true) {
        const data: ISignIn = {
          email,
          password,
        };
        await dispatch(signIn(data)).unwrap();
        console.log("HI");
        dispatch(snackBarActions.successHandler("Successfully Logged In"));
      }
    } catch (error: any) {
      dispatch(snackBarActions.errorHandler(error.message));
    }
  }
  return (
    <Container>
      <Box
        onSubmit={submitHandler}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            width: "93%",
            marginTop: "20px",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: `${emailValid === false ? "red" : "green"}`,
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused ": {
                color: `${emailValid === false ? "red" : "green"}`,
              },
            },
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={getEmailValue}
          type="email"
        />
        <TextField
          sx={{
            width: "93%",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: `${passwordValid === false ? "red" : "green"}`,
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused ": {
                color: `${passwordValid === false ? "red" : "green"}`,
              },
            },
          }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={getPasswordValue}
          type="password"
        />

        <Button
          sx={{
            borderRadius: "30px",
            width: "120px",
            height: "46px",
            border: "1px solid #b1abab",
            background: "white",
            color: "grey",
            fontSize: "16px",
            textTransform: "none",
            "&:active": {
              color: "white",
              border: "none",
            },
            "&:hover": {
              color: "white",
              border: "none",
            },
          }}
          variant="contained"
          type="submit"
        >
          Sign In
        </Button>
        <StyledLink to="/signup">Create an account?</StyledLink>
      </Box>
    </Container>
  );
};
const Container = styled.div`
  background-color: white;
  width: 30%;
  height: 30vh;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 10px;
`;
const StyledLink = styled(Link)`
  color: #b1abab;
  margin-bottom: 30px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #1976d2;
  }

  &:active {
    outline: none;
    text-decoration: underline;
    color: #1976d2;
  }
`;
