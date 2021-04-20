import axios from 'axios'
export function addPost (post){
return axios.post("/create-post", post)
}
