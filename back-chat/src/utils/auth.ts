import bcrypt from "bcrypt"

export const hashPassword = async ( pass  : string ) => {
    const genSalt = await bcrypt.genSalt(10)
    return await bcrypt.hash(pass , genSalt)
}

export const verifyPassword = async ( pass : string , hash : string )  => {
    
    const result = await bcrypt.compare(pass , hash)
    return result
}