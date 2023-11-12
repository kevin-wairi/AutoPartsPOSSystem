import React,{useState} from 'react'
import {  toast } from 'react-toastify';

function AddUsers() {

    const[business,setBusiness] = useState("")
    const[username,setUsername] = useState("")
    const[fullname,setFullname] = useState("")
    const[phoneNumber,setPhoneNumber] = useState("")
    const[password,setPassword] = useState("")
    const[passwordConfirmation,setPasswordConfirmation] = useState("")
    const[error,setError] = useState('')


    async function handleSignupForm(e){
        e.preventDefault()
        if (business === '' || username === '' || fullname === '' || phoneNumber === '' || password === '' || passwordConfirmation === '') {
            setError('Please fill out all fields');
            
            return;
          } else if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
          }
        setError('');

          const resp = await fetch('http://localhost:3000/users');
          const registeredUsers = await resp.json();

          if (resp.ok) {
            // Check if the username already exists
            const existingUser = registeredUsers.find(user => user.username === username);

            if (existingUser) {
              setError('Username already exists');
              return;
            }
          }
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accepts: 'application/json',
                },
                body: JSON.stringify({
                    business,
                    username,
                    fullname,
                    phoneNumber,
                    password,
                    passwordConfirmation,
                    isAdmin: false,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('userData signup',data);
                toast("Added succesfully")

                
                
            }   
    }

  return (
    <div>
        <div className="row">
        <div className="col-10 mx-auto"><h3>Add Users</h3></div>
        <form className="col-11 mx-auto border" onSubmit={(e)=>handleSignupForm(e)}>
        <div className="d-flex flex-row align-items-center justify-content-between mb-2">
        <div className="form-outline  mb-0 col-5">
                <label className="form-label" >Business Name</label>
                <input type="text" className="form-control" value={business} onChange={(e)=>setBusiness(e.target.value)}/>
            </div>
            <div className="form-outline  mb-0 col-5">
                <label className="form-label" >Username</label>
                <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
        </div>
            
            
            <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                <div className="form-outline  mb-0 col-5">
                    <div className="form-outline flex-fill mb-0">
                    <label className="form-label" >Full Name</label>
                    <input type="text" className="form-control" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                    </div>
                </div>
                <div className="form-outline  mb-0 col-5">
                <label className="form-label" >Phone Number</label>
                <input type="text" className="form-control" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-2">
                <div className="form-outline mb-0">
                <label className="form-label" >Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-2">
                <div className="form-outline  mb-0">
                <label className="form-label" >Repeat your password</label>
                <input type="password" className="form-control" value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
                </div>
            </div>
            {/* 
            <div className="form-check d-flex justify-content-center mb-5">
                <label className="form-check-label" for="form2Example3">
                I agree all statements in <a href="#!">Terms of service</a>
                </label>
            </div> */}

            {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                <button type="submit"  className="btn btn-primary ">Register</button>
            </div>

</form>
        </div>
    </div>
  )
}

export default AddUsers