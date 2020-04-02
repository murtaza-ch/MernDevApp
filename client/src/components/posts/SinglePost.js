import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getPost} from '../../actions/post';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const SinglePost = ({getPost,post:{post,loading},match}) => {

    useEffect(()=>{
        getPost(match.params.id);
    },[getPost])

    return (
        
            loading || post === null ? <Spinner/>:<Fragment>

                <Link to="/posts">
                Back To Posts
                </Link>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post._id}/>

                <div className="comments">
                    {post.comments.map((comment)=>{
                        return(
                        <CommentItem key={comment._id} comment={comment} postId={post._id}/>
                        )
                    })}
                </div>
            </Fragment>
        
    )
}

SinglePost.propTypes = {
getPost:PropTypes.func.isRequired,
post:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>{
    return{
        post:state.post
    }
}

export default connect(mapStateToProps,{getPost})(SinglePost)
