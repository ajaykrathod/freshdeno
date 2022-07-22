
/** @jsx h */
import { h } from 'preact'
import {useEffect, useState} from 'preact/hooks'

const Index = () => {
    const [error, setError] = useState("")
    const [user, setUser] = useState({})
    const [token, setToken] = useState()
    useEffect(async() => {
        if(localStorage.getItem("Token") && localStorage.getItem("EMail") && localStorage.getItem("Public")){
            const token = localStorage.getItem("Token")
            setToken(localStorage.getItem("Token"))
            const email = localStorage.getItem("EMail")
            const publicKey = localStorage.getItem("Public")
    
            const body = {token,email,publicKey}
            const resp = await fetch(window.location.href+"api/verify",{
                method: "post",
                body: JSON.stringify(body)
            })
    
            setUser({email:email})
            const result =  await resp.body?.getReader().read();
            const items = JSON.parse(new TextDecoder().decode(result?.value))
    
            if(!(items.expiry > 0)){
                setError("Your session expired, You will need to login again")
            }
            
            if(items.expired){
                setError("Your session expired, You will need to login again")
            }
        }
        else{
            setError("Your session expired, You will need to login again")
        }
        
    },[])

    const handleTakeLogin = () => {
        localStorage.clear()
        window.location.href = "/login"
    }
  return (
    <div>
        {error && token && <div class="errorDiv">
        <h2>{error}</h2>
                <button onClick={handleTakeLogin}>Take Me to Login</button>
            </div>}
        {error && !token && <div class="errorDiv">
                <h2>{error}</h2>
                <button onClick={handleTakeLogin}>Take Me to Login</button>
            </div>}
            {!error && token && <div class="userDiv">
                    <h2>
                        Hey, {user.email}
                    </h2>
                </div>}
    </div>
  )
}

export default Index