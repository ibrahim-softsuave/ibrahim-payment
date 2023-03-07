import React, { useState } from 'react'
import './leftside.css'
import * as Aaicons from "react-icons/ai";
import * as BIicons from "react-icons/bi";
import * as HIicons from 'react-icons/hi'
import { IconContext } from "react-icons/lib";
import { useContext, useEffect } from 'react';
import AuthContext from './login/context/Authprovider';
import axios from './login/api/axios';
import { CurrencyType } from './CurreencyType';
const USER = '/intelletUsers'
const resentList = '/recentList'
export const Leftside = () => {
    const user = useContext(AuthContext);
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(true);
    const [recData, setRecData] = useState([]);
    const [usersNames, setUserNames] = useState([]);

    useEffect(() => {
        axios.get(resentList).then((response) => {
            setRecData(response.data);
        })
    }, []);

    const handleChange = async (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData(values => ({ ...values, [name]: value }))
        if (name === 'pay') {
            await axios.get(USER, { params: { searchItem: value, accountNo: user.auth.account_no } }).then((response) => {
                setUserNames(response.data.query);
            })
        }
    }
    const handleNext = (e) => {
        e.preventDefault();
        setSuccess(!success)
        console.log(formData);

    }
    const handleDraft = () => {
        console.log('hi')
    }
    const handleBack = () => {
        setSuccess(!success)
    }

    const PrograssiveBar = ()=>{

        return (
            <div className='prograss-bar'>
            <div className='bar-style'>
            <div className={success ? "step1":"step1_color"}  ></div>
            <div className={success ? "line":"line_color"} ></div>
            <div className='step2'></div>
            </div>
            <div className='bar-name'>
                <p>What</p>
                <p>Review</p>
            </div>
        </div>
        )
    }

    return (
        <div className='overAll'>
            {success ? (<>
            <div className='previous-next'>Back to previous</div>
            <div className='element'>
                <div className='left-element'>
                    <div className='top-elem'>
                        <IconContext.Provider value={{ color: 'Gold' }}>
                            <p style={{ fontSize: '35px' }}><Aaicons.AiOutlineDollar /></p></IconContext.Provider>
                        <p >Pay Someone</p>
                        <PrograssiveBar/>
                        <p >you can pay some one in 4 easy steps</p>
                    </div>
                    <form autoComplete='off' onSubmit={handleNext}>
                        <div className='in-but'>
                            <label >Pay : </label>
                            <input required placeholder='Enter or choose credit account' list='pay-list' name='pay' value={formData.pay} onChange={handleChange} ></input>
                            <datalist id='pay-list'>
                                {usersNames.map((items, index) => {
                                    return (
                                        <option id={index} value={items.userName} />
                                    )
                                })
                                }
                            </datalist>
                            <button type='button' className='right-button'><BIicons.BiRightArrow /></button>
                        </div>
                        <br></br>
                        <div className='in-but'>
                            <label >From : </label>
                            <input type="text" name='from' value={formData.from} onChange={handleChange} placeholder='Enter or choose debit account' required></input>
                            <button type='button' className='right-button'><BIicons.BiRightArrow /></button>
                        </div>
                        <br></br>
                        <div className='amount'>
                            <label >Amount :</label >
                            <input type="text" name='amount' value={formData.amount} onChange={handleChange} placeholder='payment amount' required></input>
                            <select name='amount_type' value={formData.amount_type} onChange={handleChange}>
                                {CurrencyType.map((items, index) => {
                                    return (
                                        <option id={index} value={items.value}>{items.type}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <label >Payment Reason :</label>
                        <input type="text" name='reason' value={formData.reason} onChange={handleChange} placeholder='Choose payment reason ' required ></input><br />
                        <div className='dis'>
                            <label htmlFor='desText'>Description for benificiary:</label>
                            <textarea id='desText  ' rows={4} cols={20} />
                            {/* <input type="text" name='benfi' value={formData.benifi} onChange={handleChange} placeholder='Enter description'></input><br /> */}
                        </div>
                        <div className='check-all'>
                            <label>Send advice to :</label>
                            <div className='check'>
                                <input type="checkbox" name='advice' onChange={handleChange}></input>Yes
                                <input style={{ marginLeft: '30px' }} type="checkbox" name='advice' onChange={handleChange}></input>No<br />
                            </div>
                        </div>
                        <label >withholding tax : </label>
                        <span style={{display:'inline-block',width:'275px',textAlign:'left'}}> <HIicons.HiOutlinePlusCircle />Add a withholding Tax </span><br/>
                        <label className='label'>supporting documents : </label>
                        <span style={{display:'inline-block',width:'275px',textAlign:'left'}}> <HIicons.HiOutlinePlusCircle />Add a Supporting Document </span><br/>
                        <div className='form-footer'>
                            <a href="/payment-form">cancel</a>
                            <button type='button' onClick={handleDraft}>save as draft</button>
                            <button >next</button>
                        </div>
                    </form>
                </div>
                <div className='right-elemnt'>
                    <div style={{ textAlign: 'left', fontSize: '25px', margin: '10px', padding: '10px' }}>
                        Recent Payments
                    </div>
                    {recData.map((item, index) => {
                        return (
                            <div id={index} className="recplace">
                                <p style={{ display: 'flex', justifyContent: 'space-between' }}>{item.entryTime}<p>{item.amount}{item.currencyType}</p></p>
                                <p>{item.pay}</p> <p>{item.place}</p> <p>{item.IFSCcode}</p> <p>{item.status}</p>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </>) : (
            <div className='review'>
                <p>Review and Continue</p>
                <PrograssiveBar/>
                <p>please review your payment all the details are correct</p>
                <br/> <br/> <br/>
                <div className='top-content'>
                    <p>{formData.pay}</p>will receive<p>{formData.amount}{formData.amount_type}</p>
                </div>
                <div className='review-container'>
                    <p></p>
                    <button onClick={handleBack}>back</button>
                </div>

            </div>
        )
        }
        </div>
    )
}
