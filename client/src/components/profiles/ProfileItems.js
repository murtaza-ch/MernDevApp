import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const ProfileItems = ({profile:{user:{_id,name,avatar},status,company,location,skills}}) => {
    

    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                View Profile
                </Link>
            </div>

            <ul>
                {skills.slice(0,4).map((skill,index)=>{
                    return(
                        <li className="text-primary" key={index}>
                            <i className="fas fa-check"></i>{' '}
                            {skill}
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

ProfileItems.propTypes = {
profile:PropTypes.object.isRequired
}

export default ProfileItems
