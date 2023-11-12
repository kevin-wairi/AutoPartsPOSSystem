  import React,{ useRef, useState, useEffect} from 'react'
  import { NavLink } from 'react-router-dom'
  import heart from "../../Assets/icons/heart.png"
  import cart from "../../Assets/icons/cart.png"
  import avatar from "../../Assets/icons/avatar.png"
  import search from "../../Assets/icons/search.png"
  import login from "../../Assets/icons/login.png"
  import logout from "../../Assets/icons/logout.png"
  import signin from "../../Assets/icons/signin.png"
  import profile25 from "../../Assets/icons/profile25.png"
  import messages from "../../Assets/icons/messages.png"
  import burger from '../../Assets/icons/burger-menu.png'
  import './Navbar.css'
  import { useNavigate } from 'react-router-dom'
  
  

  function Navbar({onSignup,onLogin,cartCount}) {

    
    const navigate = useNavigate();
    const[business,setBusiness] = useState("")
    const[username,setUsername] = useState("")
    const[fullname,setFullname] = useState("")
    const[phoneNumber,setPhoneNumber] = useState("")
    const[password,setPassword] = useState("")
    const[passwordConfirmation,setPasswordConfirmation] = useState("")
    const[error,setError] = useState('')
    let formRef = useRef()
    const [showFormSignup,setShowFormSignup] = useState(false);
    const [showFormLogin,setShowFormLogin] = useState(false);
    const [isLogged,setIsLogged] = useState(false);
    const[currentUser,setCurrentUser] = useState('')

    
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
                onSignup(data)
                setCurrentUser(data.username)
                setIsLogged(true)
                setShowFormSignup(false)
                
                navigate('/')
                
            }   
    }
        function handleClose(){
          setShowFormSignup(false)
          setShowFormLogin(false)
    }
    useEffect(()=>{
        let handler = (e)=>{
          if(formRef.current && !formRef.current.contains(e.target)){
            setShowFormSignup(false)
            setShowFormLogin(false)
          }
        }
        document.addEventListener('mousedown',handler)
        return()=>{
            document.removeEventListener('mousedown',handler)
        }
      })
      function handleLoginForm(){
        setShowFormLogin(true)
        setShowFormSignup(false)
      }
      function openSignUpForm(){
        setShowFormLogin(false)
        setShowFormSignup(true)
      }
 
      
      async function submitLoginForm(e){
        e.preventDefault()
        if (username.trim() === '' || password.trim() === '') {
          setError('Please enter username and password');
          return;
      } 
      setError('');
      const response = await fetch('http://localhost:3000/users')
    const data = await response.json();
    if (response.ok) {
      const user = data.find(user => user.username === username);
      
      if (user) {
        if (user.password === password) {
          onLogin(user);
          setCurrentUser(user)
          setIsLogged(true);
          setShowFormLogin(false);
          navigate('/');
          console.log(user);
        } else {
          setError('Invalid password');
        }
      } else {
        setError('User not found');
      }
    } else {
      setError('Failed to login');
    }
      }
const handleDashboard = ()=>{
  navigate('/profile')
}
  
   
    return (
      <div className=" bg-white navbar-wrapper">
      <div className="Navbar-container container">
      <div className=" row d-flex  p-0 m-0">

        <nav className="navbar navbar-expand-lg  navbar-light  col-12" >
          <div className="container-fluid">
            <div className='col-md-4'>
            <a className="navbar-brand" href="/#"><img src={heart}  alt='buy'/></a>
            </div>
            <button className="navbar-toggler collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <div className='Nav-menu d-flex flex-wrap text-center  col-md-5 col-sm-12' id='menu'>
              
                        <div className="col-md-4 col-12 nav-item">
                              <NavLink  to="/"  >Home</NavLink>
                        </div>
                        <div className="col-md-4 col-12 nav-item">
                          <NavLink  to="/shop"  >Shop</NavLink>
                        </div>
                        <div className="col-md-4 col-12 nav-item">
                          <NavLink  to="/pages"  >Pages</NavLink>
                        </div>
                </div>
                    <div className=" col-md-4 col-sm-12">
                      <div className="menu-content">
                      <div className=" d-flex justify-content-center">
                        <div className='col-md-4 col-sm-10'><NavLink to="/#favorite"><img src={heart}  alt='buy'/></NavLink></div>
                        <div className='col-md-4 col-sm-10'>
                            <div className='gap-1'><NavLink to="/cart"><img src={cart}  alt='buy'/></NavLink> <span>{cartCount}</span></div>
                        </div>
                        
                        <div class="dropdown col-md-4 col-sm-10">
                          <div class="dropdown-toggle "  id="MenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className='col-6 d-flex align-items-center gap-1'><img src={avatar} alt="" /><h6 className='m-0'>{isLogged ? currentUser.username : 'Login'}</h6>
                            </div>
                          </div>
                          <ul class="dropdown-menu" aria-labelledby="MenuButton1">
                                {isLogged && currentUser.isAdmin &&
                                <>
                                <div className=' dropdown-item   pt-1' onClick={()=>handleDashboard()}><li>Dashboard </li></div>
                                <div className=' dropdown-item   pt-1'><li>Logout </li></div>
                                </>
                                }                
                                {!isLogged && !currentUser &&
                                  <>
                                  <div className='dropdown-item '><li onClick={()=>handleLoginForm()}>Login </li></div>
                                  <div className='dropdown-item '><li onClick={()=>openSignUpForm()}>signup </li></div>   
                                  </>
                                }
                                {isLogged && !currentUser.isAdmin &&
                                  <>
                                  <div className='d-flex gap-1  dropdown-item  align-items-center text-center  pt-1'><img src={signin}  alt="register" /><li onClick={()=>openSignUpForm()}>logout </li></div>   
                                  </>
                                }
                          </ul>
                        </div>
                      </div>
                      </div>
                </div>
            </div>
          </div>
        </nav>
        
       
        {showFormSignup && (
        <div className="overlay">
                < div className='signup-container  m-0 p-0 container-fluid'>
            <div className=" form-container rounded col-md-8 col-lg-6 col-xl-5 col-10 order-lg-1  mx-auto" ref={formRef}>
            <div className="row d-flex justify-content-end">
                <div className="col-1">
                    <button className="close-toggler border-0" onClick={()=>handleClose()}>
                        <span className='close-icon fw-bold fs-2'>&times;</span>
                    </button> </div>    
                    </div>  
                    <p className="text-center h4 fw-bold mb-2 mx-1 mx-md-4 mt-2 pt-2">Sign up</p>

                    <form className="mx-1 mx-md-4" onSubmit={(e)=>handleSignupForm(e)}>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="text" className="form-control" value={business} onChange={(e)=>setBusiness(e.target.value)}/>
                            <label className="form-label" >Business Name</label>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="text" className="form-control" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
                            <label className="form-label" >Full Name</label>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                            <div className="form-outline  mb-0 col-5">
                            <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                            <label className="form-label" >Username</label>
                            </div>
                            <div className="form-outline  mb-0 col-5">
                            <input type="text" className="form-control" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                            <label className="form-label" >Phone Number</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <label className="form-label" >Password</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" className="form-control" value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
                            <label className="form-label" >Repeat your password</label>
                            </div>
                        </div>
                        {/* 
                        <div className="form-check d-flex justify-content-center mb-5">
                            <label className="form-check-label" for="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                        </div> */}
                        
                        <div className="form-check d-flex justify-content-center mb-5">
                            <label className="form-check-label" for="form2Example3">
                            Already have an account,  <a href="#!" onClick={()=>handleLoginForm()}>Log in</a>
                            </label>
                        </div>
                        {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                            <button type="submit"  className="btn btn-primary ">Register</button>
                        </div>

                    </form>

                    </div>
            </div>
          </div>
      )}
      {showFormLogin && (
        <div className="overlay">
                < div className='signup-container  m-0 p-0 container-fluid'>
            <div className=" form-container rounded col-md-8 col-lg-6 col-xl-5 col-10 order-lg-1  mx-auto" ref={formRef}>
            <div className="row d-flex justify-content-end">
                <div className="col-1">
                    <button className="close-toggler border-0" onClick={()=>handleClose()}>
                        <span className='close-icon fw-bold fs-2'>&times;</span>
                    </button> </div>    
                    </div>  
                    <p className="text-center h4 fw-bold mb-2 mx-1 mx-md-4 mt-2 pt-2">Log in</p>

                    <form className="mx-1 mx-md-4" onSubmit={(e)=>submitLoginForm(e)}>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="text" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                            <label className="form-label" >Username</label>
                            </div>
                            
                        </div>
                        <div class="form-outline">
                            <input type="text" id="form12" class="form-control" />
                            <label class="form-label" for="form12">Example label</label>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                            <div className="form-outline flex-fill mb-0">
                            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <label className="form-label" >Password</label>
                            </div>
                        </div>
                        
                        <div className="form-check d-flex justify-content-center mb-5">
                            <label className="form-check-label" for="form2Example3">
                            Don't have an account,  <a href="#!" onClick={()=>openSignUpForm()}>signup</a>
                            </label>
                        </div>
                        {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                            <button type="submit"  className="btn btn-primary ">Submit</button>
                        </div>

                    </form>

                    </div>
            </div>
          </div>
      )}
      </div>
      </div>

      </div>
    )

  }

  export default Navbar