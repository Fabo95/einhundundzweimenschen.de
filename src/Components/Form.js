import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

export default function Form(props) {

  const [isSubmitShown, setIsSubmitShown] = useState(false)
  const [rejectedMsg, setRejectedMsg] = useState(null)
  const submitClass = isSubmitShown? "input--submit--shown" : "input--submit--hidden"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  /* Funktion die bei Submit des Forms ausgeführt wird */
  function onSubmit (data) {
  const mutations = [{
    create: {
      _type: 'comment',
      data: {
        _type: 'reference',
        _ref: props._id,
      },
      name: data.name,
      text: data.text
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
      {errors.name && <p className='input--error'>Bitte gib hier deinen Namen an.</p>}
      <input placeholder='Dein Name' className='input' {...register('name', { required: true })} />
      {errors.text && <p className='input--error'>Bitte gib hier deinen Kommentar an.</p>}
      <TextareaAutosize onFocus={handleIsSubmitShown} placeholder='Dein Kommentar' className='input' {...register('text', { required: true })} />
      {rejectedMsg && <p className='input--error'>{rejectedMsg}</p>}
      <div className='input--flex'>
        <input className={submitClass} type="submit" value={"Kommentieren"}/>
        <div onClick={handleCancelSubmit} className={`${submitClass} input--submit--cancel`}>Abbrechen</div>
      </div>
    </form>
  );
}