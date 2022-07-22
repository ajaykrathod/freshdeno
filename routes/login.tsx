/** @jsx h */
/** @jsxFrag Fragment */
import {h, Fragment} from 'preact'
import LoginComponent from '../islands/Login.tsx'
import { Head, asset } from "$fresh/runtime.ts";
import Header from '../islands/Header.tsx';


export default function Login() {

  return (
    <>
      <Head>
        <title>FreshDeno | Login</title>
        <link rel="stylesheet" href={asset("/login.css")} />
      </Head>
      <body>
        <Header/>
        <LoginComponent/>
      </body>
    </>
  )
}
