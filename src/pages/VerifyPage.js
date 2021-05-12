import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { authActions } from "../redux/actions/auth.action";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const query = useQuery();
  const codeQuery = query.get("code");
  console.log("Your code is:", codeQuery);
  const dispatch = useDispatch();
  dispatch(authActions.verifyEmail(codeQuery));
  return <div>This is the Email Verification Page.</div>;
};

export default VerifyPage;
