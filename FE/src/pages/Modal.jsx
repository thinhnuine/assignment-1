import React from 'react'
import './Home/Home.css'

const Modal = (props) => {
    
  return (
    <>
    {props.handleModal && 
        <div className='modal'>
            <div className="modal-content">
                {props.children}
            </div>
        </div>
    }
    </>
  )
}

export default Modal