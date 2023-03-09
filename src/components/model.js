import React from 'react'
import './model.css'
import * as TIicons from 'react-icons/ti'

const Model = (props) => {
    if (!props.open) {
        return null
    }
    const formData=props.data
    return (
        <>
            <div className='overlay' />
            <div className='model'>
                <div className='model-element'>
                    <div id='cancel' type='button' onClick={props.onClick}>X</div>
                    <div className='ok'><TIicons.TiTick /></div>
                    <p>Success!</p>
                    <div className='model_child'>
                        <p>payment 362545789541258-4548485 of {formData.amount} {formData.amount_type} </p>
                        <p> to {formData.pay} </p>
                        <p>has been sent for verification to</p>
                        <p>multiple people</p>
                    </div>
                    <span>What do you want next?</span>
                    <p>create a template from this payment</p>
                    <div className='success-footer'>
                        <a href='/payment-form'>Go back to payments</a>
                        <button>Make an another payment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Model