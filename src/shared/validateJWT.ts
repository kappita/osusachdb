import { Client } from "@libsql/client/web";
import { dbQuery } from "./dbQuery";
import jwt from "@tsndr/cloudflare-worker-jwt"

interface googlePayload {
  iss: string,
  azp: string,
  aud: string,
  sub: string,
  hd: string,
  email: string,
  email_verified: boolean,
  nbf: number,
  name: string,
  picture: string,
  given_name: string,
  family_name: string,
  locale: string,
  iat: number,
  exp: number,
  jti: string
}

type user = {
  id: number,
  sub: string,
  profile_img: string,
  name: string,
}

type googleCert = {
  keys: JsonWebKey[]
}

const googleIss = [
  "accounts.google.com",
  "https://accounts.google.com"
]


type jwtValidation = {
  success: false,
  error: unknown
} | {
  success: true,
  data: googlePayload
}

export async function validateJWT(token: string, env: Bindings): Promise<jwtValidation> {
  const googleSecret = await (await fetch("https://www.googleapis.com/oauth2/v3/certs")).json() as googleCert

  const first_verification = await jwt.verify(token, googleSecret.keys[0], "RS256")

  if (!first_verification) {
    const second_verification = await jwt.verify(token, googleSecret.keys[1], "RS256")
    if (!second_verification) {
      return {
        success: false,
        error: "verificacion mal"
      }
    }
  }

  
  const payload = jwt.decode(token).payload as googlePayload

  if (!googleIss.includes(payload.iss)) {
    return {
      success: false,
      error: "iss mal"
    }
  }
  
  if (payload.aud != env.GOOGLE_CLIENT_ID) {
    return {
      success: false,
      error: "aud mal"
    }
  }


  return {
    success: true,
    data: payload
  }


  


}