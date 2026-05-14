import jwt from 'jsonwebtoken'

export const generatToken =  (userId)=>{
    const token = jwt.sign(
        {userId},
        process.env.JWT_KEY,
        {expiresIn: '7d'}
    )
    return token
}