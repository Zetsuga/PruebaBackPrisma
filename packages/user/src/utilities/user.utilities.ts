import { userDAO } from "../interfaces/user.interface";

export async function deleteSensitiveData(users:userDAO[] | userDAO){
    try{
        if(Array.isArray(users)){
            return users.map((user)=>{
                return treatDataUser(user)
            })
        }else{
            return treatDataUser(users)
        }
    }catch(error:any){
        throw new Error('Impossible to treat data')
    }
}

function treatDataUser(user : userDAO){
    try {
        delete user.id
        delete user.pass
        delete user.role
        return user
    } catch (error) {
        throw new Error('Impossible to treat data')
    }
}

