import { HandlerContext } from "$fresh/server.ts";
import * as jose from 'https://deno.land/x/jose/index.ts'


export const handler = async(_req: Request, _ctx: HandlerContext) => {
    let items,verification;
    
    if(_req.method === "POST"){
        const formData = await _req.body?.getReader().read()
        if(formData?.value){
            items = JSON.parse(new TextDecoder().decode(formData?.value))
        }
        const publicKey = await jose.importSPKI(items.publicKey,'ES256')
        
        try {
                verification = await jose.jwtVerify(items.token, publicKey, {
                issuer: 'freshdeno',
                audience: items.email,
              })
        } catch (error) {
            return new Response(JSON.stringify({expired:true}))
        }
        return new Response(JSON.stringify({expiry:verification.payload.exp}))
    }
    return new Response("Forbidden",{status:403});
};
