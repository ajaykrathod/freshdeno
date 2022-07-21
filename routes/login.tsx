/** @jsx h */
/** @jsxFrag Fragment */
import {h, Fragment} from 'preact'
import LoginComponent from '../islands/Login.tsx'
import { Head, asset } from "$fresh/runtime.ts";
import Header from '../islands/Header.tsx';

// export const handler: Handlers = {
//     async POST(_req,ctx) {
//         let email;
//         const formData = await _req.body?.getReader().read()
//         if(formData?.value){
//             email =  decodeURIComponent(new TextDecoder().decode(formData?.value))
//         }
//         const resp = await fetch("http://localhost:8000/api/login",{
//             method: "post",
//             body: email,
//         })
//         const body =  await resp.body?.getReader().read();

//         localStorage.setItem("Token",decodeURIComponent(new TextDecoder().decode(body?.value)))
//         console.log("body",decodeURIComponent(new TextDecoder().decode(body?.value)));
//     }
// }
export default function Login() {

  return (
    <>
      <Head>
        <title>FreshDeno</title>
        <link rel="stylesheet" href={asset("/login.css")} />
      </Head>
      <body>
        <Header/>
        <LoginComponent/>
      </body>
    </>
  )
}
