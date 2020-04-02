import axios from "axios";
import { setAlert } from "./alert";

// Get current user profile
export const getCurrentProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch({ type: "GET_PROFILE", payload: res.data });
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};


// Get all profiles
export const getProfiles = () => {
  
  return async dispatch => {
    dispatch({type:'CLEAR_PROFILE'});
    try {
      const res = await axios.get("/api/profile");
      dispatch({ type: "GET_PROFILES", payload: res.data });
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};


// Get profile by id

export const getProfileById = (userId) => {
  
  return async dispatch => {

    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      dispatch({ type: "GET_PROFILE", payload: res.data });
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

// Get github repos
export const getGithubRepos = (username) => {
  
  return async dispatch => {
    
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      dispatch({ type: "GET_REPOS", payload: res.data });
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};


//Create Profile
export const createProfile = (formData, history, edit = false) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.post("/api/profile", formData, config);
      dispatch({ type: "GET_PROFILE", payload: res.data });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: "PROFILE_ERROR",
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

// Add Experience
export const addExperience = (formData, history) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.put("/api/profile/experience", formData, config);
      dispatch({ type: "UPDATE_PROFILE", payload: res.data });
      dispatch(setAlert("Experience Added", "success"));

      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: "PROFILE_ERROR",
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

// Add Education
export const addEducation = (formData, history) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const res = await axios.put("/api/profile/education", formData, config);
      dispatch({ type: "UPDATE_PROFILE", payload: res.data });
      dispatch(setAlert("Education Added", "success"));

      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: "PROFILE_ERROR",
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};


// Delete Experience 
export const deleteExperience=(id)=>{
  return async (dispatch)=>{
    try {
      
      const res =await axios.delete(`/api/profile/experience/${id}`);

      dispatch({type:'UPDATE_PROFILE',payload:res.data});

      dispatch(setAlert('Experience Removed','success'));
    } catch (error) {
      
      dispatch({type:'PROFILE_ERROR',
      payload:{msg:error.response.statusText,status:error.response.status}
    })

    }
  }
}

// Delete Education 
export const deleteEducation=(id)=>{
  return async (dispatch)=>{
    try {
      
      const res =await axios.delete(`/api/profile/education/${id}`);

      dispatch({type:'UPDATE_PROFILE',payload:res.data});

      dispatch(setAlert('Education Removed','success'));
    } catch (error) {
      
      dispatch({type:'PROFILE_ERROR',
      payload:{msg:error.response.statusText,status:error.response.status}
    })

    }
  }
}

// Delete account and profile
export const deleteAccount=()=>{

  if (window.confirm('Are you sure? This can not be undone!')) {
    
  
  return async (dispatch)=>{
    try {
      
      await axios.delete('/api/profile');

      dispatch({type:'CLEAR_PROFILE'});
      dispatch({type:'ACCOUNT_DELETED'});

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (error) {
      
      dispatch({type:'PROFILE_ERROR',
      payload:{msg:error.response.statusText,status:error.response.status}
    })

    }
  }
}
}
