import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import CommonButton from '../Common/CommonButton';

export default function Form(props) {

  const [isSubmitShown, setIsSubmitShown] = useState(false)
  const [rejectedMsg, setRejectedMsg] = useState(null)
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

    fetch(`https://${process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_SANITY_API_TOKEN}`
      },
      body: JSON.stringify({mutations})
    })
      .then(response => response.json())
      .then(result => {
        reset()
        setIsSubmitShown(false)
        props.handleNewData()
        })
      .catch(error => {
        setRejectedMsg("Das hat leider nicht funktioniert...")})
    };

  function handleIsSubmitShown () {
    setIsSubmitShown(true)
  }

  function handleCancelSubmit () {
    setIsSubmitShown(false)
    setRejectedMsg(null)
    reset()
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
          {rejectedMsg && <p className='input--error'>{rejectedMsg}</p>}
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