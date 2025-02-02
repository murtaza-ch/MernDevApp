import { v4 as uuidv4 } from 'uuid';

export const setAlert=(msg,alertType,timeout=5000)=>{
    const id=uuidv4();
    return (dispatch)=>{
        dispatch({type:'SET_ALERT',payload:{msg,alertType,id}})

        setTimeout(()=>{
            dispatch({type:'REMOVE_ALERT',payload:id})
        },timeout)
    }
};