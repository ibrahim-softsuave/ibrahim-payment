import React from 'react'
import './login.css'
import { useRef,useState,useEffect,useContext} from 'react'
import AuthContext from '../login/context/Authprovider'
import axios from './api/axios'
import { useNavigate } from "react-router-dom";

const LOGIN_URL='/login'


const Login  = () => {
  const navigate=useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef =useRef();
  const errRef = useRef();

  const [user,setUser]=useState('');
  const [pwd,setPwd]=useState('');
  const [errmsg,setErrMsg]=useState('');  
  useEffect(()=>{
    userRef.current.focus()
  },[])
  
  useEffect(()=>{
    setErrMsg('')
  },[user,pwd])
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const response = await axios.post(LOGIN_URL,{userName:user,password:pwd});
    const account_no=response.data.data[0].accountNo
    setAuth({ user:user, pwd:pwd,account_no:account_no});
    setUser('');
    setPwd('');
    navigate('/payment-form');
    } 
  catch (err) {
    if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg('Login Failed');
    }
    errRef.current.focus();
  }

}

  return (
    <>
    <div className='outer'>
            <section className='sec'>
              <p ref={errRef} className={errmsg ? "errmsg":"offscreen"} aria-live="assertive">{errmsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}  className='frm'>
                  <label className='labe'>
                    User Name :
                    <input type="text"
                          id='username'
                          ref={userRef}
                          autoComplete='off'
                          value={user}
                          required
                          onChange={(e)=>setUser(e.target.value)}
                         ></input>
                  </label>
                  <label className='labe'>
                    Password :
                    <input type="password"
                     id='password'
                     value={pwd}
                     required
                     onChange={(e)=>setPwd(e.target.value)}></input>
                  </label>
                  <button>SiginIn</button>
                </form>
            </section>
            {/* {success?<Navigate to="/home" replace={true} />:<Navigate to="/" replace={true} />} */}
            </div>
            </>
  
  )
}

export default Login 