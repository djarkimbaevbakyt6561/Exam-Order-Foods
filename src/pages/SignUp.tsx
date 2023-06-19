import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { signUp } from "../store/auth/auth.thunk";
import { snackBarActions } from "../store/snack.bar";
import { ISignUp } from "../types/interfaces";
import { ROLES } from "../utils/constants";
export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordValid, setConfirmPasswordValid] =
    useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  function getNameValue(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }
  function getEmailValue(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
    setEmailValid(e.target.value.includes("@"));
    setFormValid(
      passwordValid && emailValid && confirmPasswordValid ? true : false
    );
  }
  function getPasswordValue(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.trim().length > 6);
    setFormValid(
      passwordValid && emailValid && confirmPasswordValid ? true : false
    );
  }
  const getConfirmPasswordValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordValid(password === e.target.value);
    setFormValid(
      passwordValid && emailValid && confirmPasswordValid ? true : false
    );
  };
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e?.preventDefault();
      if (formValid === true) {
        const data: ISignUp = {
          email,
          password,
          role: ROLES.USER,
          name,
        };
        dispatch(signUp(data)).unwrap();
        dispatch(snackBarActions.successHandler("Successfully Logged In"));
        navigate("/signin");
      }
    } catch (error: any) {
      dispatch(snackBarActions.errorHandler(error.message));
    }
  }

  return (
    <Container>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          paddingTop: "20px",
        }}
        onSubmit={submitHandler}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            width: "93%",
          }}
          id="outlined-basic"
          value={name}
          onChange={getNameValue}
          label="Name"
          variant="outlined"
          type="text"
        />
        <TextField
          sx={{
            width: "93%",
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
          value={email}
          onChange={getEmailValue}
          variant="outlined"
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
          value={password}
          onChange={getPasswordValue}
          variant="outlined"
          type="password"
        />

        <TextField
          sx={{
            width: "93%",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: `${
                  confirmPasswordValid === false ? "red" : "green"
                }`,
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused ": {
                color: `${confirmPasswordValid === false ? "red" : "green"}`,
              },
            },
          }}
          id="outlined-basic"
          label="Confirm password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={getConfirmPasswordValue}
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
          Sign Up
        </Button>
        <StyledLink to="/signin">Have an account</StyledLink>
      </Box>
    </Container>
  );
};
const Container = styled.div`
  background-color: rgb(255, 255, 255);
  width: 30%;
  height: 45.2vh;
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
