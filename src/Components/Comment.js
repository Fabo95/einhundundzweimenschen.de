import React from 'react'
import Moment from 'react-moment';
import 'moment/locale/de';

export default function Comment (props) {


    return (
        <div className='comment'>
            <div className='comment--flex'>
                <p className='comment--name'>{props.name}</p>
                <p className='comment--date'><Moment fromNow date={props.date} /></p>
            </div>
            <p className='comment--body'>{props.text}</p>
        </div>
    )
} 