import axios from 'axios';
import {setAlert} from './alert';


// Get Posts
export const getPosts=()=>{
    return async (dispatch)=>{
        try {
            
            const res=await axios.get('/api/posts');

            dispatch({type:'GET_POSTS',payload:res.data});

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
}


// Add Like
export const addLike=(postId)=>{
    return async (dispatch)=>{
        try {
            
            const res=await axios.put(`/api/posts/like/${postId}`);

            dispatch({type:'UPDATE_LIKES',payload:{postId,likes:res.data}});

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
}


// Remove Like
export const removeLike=(postId)=>{
    return async (dispatch)=>{
        try {
            
            const res=await axios.put(`/api/posts/unlike/${postId}`);

            dispatch({type:'UPDATE_LIKES',payload:{postId,likes:res.data}});

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
} 


// Delete Post
export const deletePost=(postId)=>{
    return async (dispatch)=>{
        try {
            
            await axios.delete(`/api/posts/${postId}`);

            dispatch({type:'DELETE_POST',payload:postId});

            dispatch(setAlert('Post Removed','success'));

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
}


// Add Post
export const addPost=(formData)=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    return async (dispatch)=>{
        try {
            
            const res=await axios.post('/api/posts/',formData,config);

            dispatch({type:'ADD_POST',payload:res.data});

            dispatch(setAlert('Post Created!','success'));

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
}


// Get Post
export const getPost=(postId)=>{
    return async (dispatch)=>{
        try {
            
            const res=await axios.get(`/api/posts/${postId}`);

            dispatch({type:'GET_POST',payload:res.data});

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
}


// Add Comment
export const addComment=(postId,formData)=>{

    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    return async (dispatch)=>{
        try {
            
            const res=await axios.post(`/api/posts/comment/${postId}`,formData,config);

            dispatch({type:'ADD_COMMENT',payload:res.data});

            dispatch(setAlert('Comment Added!','success'));

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
}


// Delete Comment
export const deleteComment=(postId,commentId)=>{

    return async (dispatch)=>{
        try {
            
            const res=await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

            dispatch({type:'REMOVE_COMMENT',payload:commentId});

            dispatch(setAlert('Comment Removed!','success'));

        } catch (error) {
            
            dispatch({type:'POST_ERROR',payload:{msg:error.response.statusText,status:error.response.status}});

        }
    }
}