/**@jsx h */
/** @jsxFrag Fragment */
import {h, Fragment} from 'preact'
import { useState } from "preact/hooks";
import { Head, asset } from "$fresh/runtime.ts";

function Login() {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState()
  const handleClick = async(event) => {
    
    if(!emailRegex.test(email)){
      setError("Enter Valid Email")
      return
    }
    if(!error){
        const url = window.location.origin + "/api/login"
        
        const resp = await fetch(url,{
            method:"post",
            body: email
        })
        setMessage("Login Successfull")
        
        const body =  await resp.body?.getReader().read();
        const items = JSON.parse(new TextDecoder().decode(body?.value))

        
        localStorage.setItem("Token",items.jwt)
        localStorage.setItem("EMail",items.email)
        localStorage.setItem("Public",items.publicKey)

        
        setTimeout(() => {
          window.location.href = "/"
        }, 4000)
        // Let us open our database
        // const request = window.indexedDB.open("Selective", 1);
        // request.onsuccess = event => {
        //   let db = event.target.result;
        //   const transaction = db.transaction(["users"], "readwrite");
        //   const objectStore = transaction.objectStore("users");

        //   const request = objectStore.add({token:items.jwt,email:items.email,publickey:items.publicKey})
        
        // }

    
    }
  }
return (
  <>
    <Head>
      <title>Login</title>
      <link rel="stylesheet" href={asset("/login.css")} />
    </Head>
    <div class="loginContainer">
            <h2>Login</h2>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value);setError()}} name="email" id="email" placeholder="Enter Your mail"/>
            <div className="emailError">{error}</div>
            <button onClick={handleClick}>Login</button>
    </div>
    <div className={message && "message"}>{message}</div>
  </>
)
}

export default Login