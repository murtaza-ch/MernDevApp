import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/post'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = ({deleteComment,postId,comment:{_id,text,name,avatar,user,date},auth}) => {

    return (
                <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>

            {!auth.loading && user === auth.user._id && (
                <button onClick={(e)=>deleteComment(postId,_id)} type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>
            )}

          </div>
        </div>
    )
}

CommentItem.propTypes = {
deleteComment:PropTypes.func.isRequired,
auth:PropTypes.object.isRequired,
comment:PropTypes.object.isRequired,
postId:PropTypes.number.isRequired,
}

const mapStateToProps=(state)=>{
    return{
        auth:state.auth
    }
}

export default connect(mapStateToProps,{deleteComment})(CommentItem)
