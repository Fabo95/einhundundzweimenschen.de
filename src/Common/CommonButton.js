import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function CommonButton (props) {

const navigate = useNavigate()

  return (
    <Button
        className={props.className}
        onClick={()=> { 
            props.handleRead && props.handleRead()
            props.to && setTimeout(() => navigate(props.to, {state: props.state }), props.delay)
            props.handleCancelSubmit && setTimeout(() => props.handleCancelSubmit(), props.delay)
          }}
        type={props.type}
        variant={props.variant}
        sx={props.sx}
    >
        {props.children}
    </Button>
  )
}

export default CommonButton