import { HandlerContext } from "$fresh/server.ts";
import * as jose from 'https://deno.land/x/jose/index.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts";


export const handler = async(_req: Request, _ctx: HandlerContext) => {
    let email;
    // let privateKey = Deno.env.get('PRIVATE_KEY');
    const { publicKey, privateKey } = await jose.generateKeyPair('ES256')
    
    const spkiPem = await jose.exportSPKI(publicKey)
    // const key = new SubtleCrypto().exportKey("raw",publicKey)
    
    

    
    if(_req.method === "POST"){
        let email;
        const formData = await _req.body?.getReader().read()
        if(formData?.value){
            email =  decodeURIComponent(new TextDecoder().decode(formData?.value))?.replace("email=","")
        }

        
        
        const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
        .setProtectedHeader({ alg: 'ES256' })
        .setIssuedAt()
        .setIssuer('freshdeno')
        .setAudience(email)
        .setExpirationTime('30s')
        .sign(privateKey)
        
        const body = JSON.stringify({jwt,email,publicKey:spkiPem})
        return new Response(body, {
            headers: { "content-type": "application/json; charset=utf-8" },
        })
    }
    return new Response("Forbidden",{status:403});
};
