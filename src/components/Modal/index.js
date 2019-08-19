import React from 'react'

import { ModalContainer } from './styles'

const Modal = (props) => {
  if(props.show)
    return (
      <ModalContainer>
        <div className="box">
          <button type="button" onClick={props.close} className="close">X</button>
          {props.children && props.children}
        </div>
      </ModalContainer>
    )
  else return null
}

export default Modal