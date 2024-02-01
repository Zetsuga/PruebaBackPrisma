import { userDAO } from "../interfaces/user.interface";

export async function deleteSensitiveData(users:userDAO[] | userDAO){
    try{
        if(Array.isArray(users)){
            return users.map((user)=>{
                delete user.id
                return user
            })
        }else{
            delete users.id
            return users
        }
    }catch(error:any){
        throw new Error('Impossible to treat data')
    }
}