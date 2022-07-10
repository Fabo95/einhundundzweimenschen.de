import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import {useSelector, useDispatch} from 'react-redux';

import {postCommentByArticle} from "../redux/commentData"
import {selectIsCommentDataPostingFailed} from "../redux/commentData"

import {setIsCommentDataPostingFailed} from "../redux/commentData"

import CommonButton from '../Common/CommonButton';

export default function Form(props) {

  const dispatch = useDispatch()

  const isCommentDataPostingFailed = useSelector(selectIsCommentDataPostingFailed)

  const [isSubmitShown, setIsSubmitShown] = useState(false)
  const submitClass = isSubmitShown? "showSubmit" : "hideSubmit"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  /* Funktion die bei Submit des Forms ausgeführt wird */
  function onSubmit (data, e) {
    e.preventDefault()

    const mutations = [{
      create: {
        _type: 'comment',
        data: {
          _type: 'reference',
          _ref: props._id,
        },
        name: data.name,
        text: data.text,
        id: props._id
      }
    }]

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_SANITY_API_TOKEN}`
      },
      body: JSON.stringify({mutations})
    }

    dispatch(postCommentByArticle({
      requestOptions: requestOptions,
      resetForm: reset,
    }))
    };
  
  function handleIsSubmitShown () {
    setIsSubmitShown(true)
  }

  function handleCancelSubmit () {
    setIsSubmitShown(false)
    reset() 
    dispatch(setIsCommentDataPostingFailed(false))
  }

  return (
    <form className='input--form' onSubmit={handleSubmit(onSubmit)}>
      <div className='input--box'>
        {errors.name && <p className='input--error'>Bitte gib hier deinen Namen an.</p>}
        <input placeholder='Dein Name' className='input' {...register('name', { required: true })} />
      </div>
      <div className='input--box'>
        {errors.text && <p className='input--error'>Bitte gib hier deinen Kommentar an.</p>}
        <TextareaAutosize onFocus={handleIsSubmitShown} placeholder='Dein Kommentar' className='input input--text' {...register('text', { required: true })} />
      </div>
      <div className='input--box--submit'>
        <div className='input--box'>
          {isCommentDataPostingFailed && <p className='input--error'>Da lief etwas schief...</p>}
          <CommonButton  
                      className={submitClass}
                      delay={200} 
                      variant="outlined"
                      type = "submit"
                      >
                      Kommentieren
          </CommonButton>
          <CommonButton  
                      className={`${submitClass} input--submit--cancel`}
                      sx={{
                        marginLeft: "1em",
                        color: "#6E6E6E",
                        background: "#fff",
                        border: "1px solid #6E6E6E",
                        '&:hover': {
                          border:"1px solid #6E6E6E"  
                      }
                      }} 
                      delay={200} 
                      variant="outlined"
                      handleCancelSubmit = {handleCancelSubmit}
                      >
                      Abbrechen
          </CommonButton>
        </div>
      </div>
    </form>
  );
}