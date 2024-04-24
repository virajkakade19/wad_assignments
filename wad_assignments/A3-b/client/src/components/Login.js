import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate=useNavigate();
    const [Email, setName]= useState(); 
    const [Password, setPwd] = useState() ; 
    const loginUser=async(e)=>{
        e.preventDefault();
        const res=await fetch('/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Email:Email,
                Password:Password
            })
        });
        const data=await res.json();
        if(res.status===400 || !data){
            window.alert("Invalid Credentials");
        }
        else{
            window.alert("Login Successful");
            navigate('/profile');
        }
    } 
  return (
    <>
         <section className='sign-up'>
            <div className='container mt-5'>
                <div className='signup'>
                    <h1 className='text-center mb-4 '>Sign In</h1>
                <form>
                    <div className="mb-3">
                    <label for="Email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="Email" name="Email"
                        value={Email}
                        onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label for="Password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="Password" name="Password"
                        value={Password}
                        onChange={(e)=>setPwd(e.target.value)} />
                    </div>
                    <div className=' mb-3 d-flex justify-content-center'>
                        <input type="submit" name="signin" id="signin" className="form-submit" value="Sign In"
                        onClick={(loginUser)}/>
                    </div>
                </form>
                </div>
        </div>
    </section>
    </>
  )
}

export default Login