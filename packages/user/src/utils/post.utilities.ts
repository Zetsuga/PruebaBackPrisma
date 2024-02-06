import { postDAO, postWithoutIdDAO } from "../interfaces/post.interface"
import moment from "moment"

export async function formatPostUser(post: postDAO[] | postDAO){
    try{
        if(Array.isArray(post)){
            return post.map((post)=>{
                return treatDataPost(post)
            })
        }else{
            return treatDataPost(post)
        }
    }catch(error : any ){
        throw new Error('Impossible to treat data')
    }
}

function treatDataPost(post : postDAO){
    try {
        delete post.id
        delete post.id_user
        post.datetime = moment(post.datetime).format("DD/MM/YYYY")
        
        return post
    } catch (error) {
        throw new Error('Impossible to treat data')
    }
}