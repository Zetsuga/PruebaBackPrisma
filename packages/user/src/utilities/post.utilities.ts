import moment from "moment"
import { postDAO } from "../interfaces/post.interface"

export async function formatPostUser(post: postDAO[] | postDAO){
    console.log(post)
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
        console.log(post);
        
        return post
    } catch (error) {
        throw new Error('Impossible to treat data')
    }
}