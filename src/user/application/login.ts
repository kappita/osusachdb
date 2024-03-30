import { Client } from "@libsql/client/web";
import { validateJWT } from "../../shared/validateJWT";
import { getUserBySub } from "./getUserBySub";
import { register } from "./register";
import { updateUserBySub } from "./updateUserBySub";



export async function login(jwt: string, db: Client, env: Bindings) {
  const jwtValidation = await validateJWT(jwt, env)
  if (!jwtValidation.success) {
    return {
      payload: null,
      success: false,
      message: jwtValidation.error,
      status: 401
    }
  }

  const response = {
    name: jwtValidation.data.name,
    profile_img: jwtValidation.data.picture
  }

  const user = await getUserBySub(jwtValidation.data.sub, db)

  if (!user.success) {
    return {
      payload: null,
      message: "Error accediendo a la base de datos",
      success: false,
      status: 500
    }
  }
  
  if (user.data.length === 0) {
    const username = jwtValidation.data.name
    const userimg = jwtValidation.data.picture
    const usersub = jwtValidation.data.sub
    const registration = await register(username, userimg, usersub, db)
    if (!registration.success) {
      return {
        payload: null,
        success: false,
        message: "Error al registrar al usuario",
        status: 401
      }
    }
    return {
      payload: response,
      success: true,
      message: "Usuario creado con éxito",
      status: 200
    }
  }

  const nameCheck = user.data[0].name === jwtValidation.data.name
  const photoCheck = user.data[0].profile_img === jwtValidation.data.picture

  if (nameCheck || photoCheck) {
    const username = jwtValidation.data.name
    const userimg = jwtValidation.data.picture
    const usersub = jwtValidation.data.sub
    await updateUserBySub(username, userimg, usersub, db)
  }

  

  return {
    payload: response,
    success: true,
    message: "Sesión iniciada con éxito",
    status: 200
  }
  

}