import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
const Workspace = () => {
    //const [user, setUser] = useState(null);
    const nav=useNavigate();
    useEffect(()=>{
        const callwspage= async () =>{
            try{
                const res=await fetch('/ws',{
                    method:'GET',
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json"
                    },
                    credentials:"include"            
                });
                const data=await res.json();
                console.log(data);
                if(!res.status===200){
                    const err=new Error(res.error);
                    throw err;
                }
                else{
                    nav('/ws');
                }
            }
            catch(err){
                console.log('Error: ', err)
                nav('/login');
            }
        };
        callwspage()
    }, [nav]);
  return (
    <>
          
    </>
  )
}

export default Workspace