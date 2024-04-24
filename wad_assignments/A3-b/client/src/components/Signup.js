import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./style.css";
const Signup = () => {
    const history=useNavigate();
    const [user,  setUser] = useState({Name: "", Password:"", Email:"", Profession:"", Conpwd:""
});
let name, value;
const handleip=(e)=>{
    console.log(e);
    name=e.target.name;
    value=e.target.value;
    setUser({...user, [name]:value});
}
const PostData=async(e)=>{
    e.preventDefault();
    const{Name,Password,Email,Profession,Conpwd}=user;
    const res=await fetch("/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({Name,Profession,Email,Password,Conpwd
        })
    });
    const data=await res.json();
    if(data.status===422 || !data){
        window.alert("Invalid Registartion");
        console.log("Invalid Registration");
    }
    else{
        window.alert("Successful Registartion");
        console.log("Successful Registration");
        history('/login');
    }

}
  return (
    <>
        <section className='sign-up'>
            <div className='container mt-5'>
                <div className='signup'>
                    <h1 className='text-center mb-4 '>Sign Up</h1>
                <form method='POST' onSubmit={PostData}>
                    <div className="mb-3">
                        <label for="Name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="Name" name="Name"
                        value={user.Name} onChange={handleip}/>
                    </div>
                    <div className="mb-3">
                        <label for="Profession" class="form-label">Profession</label>
                        <input type="text" class="form-control" id="Profession"  name="Profession"
                        value={user.Profession}
                        onChange={handleip}/>
                    </div>
                    <div className="mb-3">
                        <label for="Email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="Email" name="Email"
                        value={user.Email}
                        onChange={handleip}/>
                    </div>
                    <div className="mb-3">
                        <label for="Password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="Password"  name="Password" 
                        value={user.Password}
                        onChange={handleip}/>
                    </div>
                    <div className="mb-3">
                        <label for="Conpwd" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="Conpwd"  name="Conpwd" 
                        value={user.Conpwd}
                        onChange={handleip}
                        />
                    </div>
                    <div className=' mb-3 d-flex justify-content-center'>
                        <input type="submit" name="signup" id="signup" className="form-submit" value="Sign Up"/>
                    </div>
                </form>
                <a className="text-center mb-3 nav-link text-primary" href="/login">Already Registered?</a>
                </div>
        </div>
    </section>

    </>
  )
}

export default Signup