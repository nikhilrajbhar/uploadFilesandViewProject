import React from 'react'
import { useSelector } from "react-redux";
import Uploadfile from './uploadfile';
import Login from './auth/login';

export default function Dashboard() {

  const logindata = useSelector((state) => state.user);
  let islogged = logindata?.islogged;

  return (
    <>
      {islogged ? <Uploadfile /> : <Login />}
    </>
  )
}
