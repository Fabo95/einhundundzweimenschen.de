import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function CommonButton (props) {

const navigate = useNavigate()

  return (
    <Button
        onClick={()=> { 
            props.handleRead && props.handleRead()
            setTimeout(() => navigate(props.to, {state: props.state }), props.delay)}}
        variant={props.variant}
        sx={props.sx}
    >
        {props.children}
    </Button>
  )
}

export default CommonButton