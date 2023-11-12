import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Shop from './pages/Shop/Shop'
import Contact from './pages/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import SingleItem from './pages/SIngleItem/SingleItem';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import { ToastContainer,toast } from 'react-toastify';


import './App.css';
import React,{useEffect,useState} from 'react';
import ItemCard from './pages/ItemCard/ItemCard';
import Item from './pages/Item/Item';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const[spares,setSpares]=useState([])
  const[cartItems,setCartItems]=useState([])
  const[user,setUser]= useState()
  const [cartCount,setCartCount] = useState(0)
  const[bestSeller,setBestSeller]= useState([])
  const [loading, setLoading] = useState(true);
  const [sliderCat, setSliderCat] = useState('');
  const[wishlist,setWishlist] = useState([])
  
  
  
  useEffect(()=>{
    const totalCount = cartItems.reduce((total,item)=>total = total + parseInt(item.cartQuantity),0)
    // console.log('totalCount',totalCount );
      setCartCount(totalCount)
  },[cartItems,setCartItems])

  // fetches all spares
  useEffect(()=>{
    fetch('http://localhost:3000/parts')
      .then(resp=>resp.json())
      .then(spares=> setSpares(spares))
      .catch((error) => {
        console.error('Fetch error:', error);
      })
  },[])



  function handleAddToCart(spare_id){
    
    let selected = spares.find((item) => item.id === spare_id);
    let foundItem = cartItems.find((item) => item.id === spare_id);

    console.log(foundItem);
    console.log(selected.id);

      if(foundItem ){
        fetch(`http://localhost:3000/cart/${spare_id}`,{
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
            "accepts":"application/json"
          }
        }) 
        .then(() => {
          const updatedCartItems = cartItems.filter((item) => item.id !== spare_id);
          setCartItems(updatedCartItems); 
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    }else{
      fetch('http://localhost:3000/cart',{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "accepts":"application/json"
        },
        body:JSON.stringify({
            'carMake': selected.carMake,
            'carModel': selected.carModel,
            "description": selected.description,
            "markedPrice": selected.markedPrice,
            "category": selected.category,
            "year": selected.year,
            "sellingPrice":selected.sellingPrice,
            "image": selected.image,
            "id": selected.id,
            "rating":selected.rating,
            "status":selected.status,
            "title":selected.title,
            "cartQuantity": 1
          })
      })
      .then(resp=>resp.json())
      .then((data)=> {  setCartItems([...cartItems, data]) 
        toast("Added to Cart")
        })
      .catch((error) =>  console.log(error))
        
    }
  }

  // fetches all cart Items
  useEffect(()=>{
    fetch('http://localhost:3000/cart')
      .then(resp=>resp.json())
      .then(data=> {setCartItems(data)
                setLoading(false)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false)
      })
  },[])

  useEffect(()=>{
    fetch('http://localhost:3000/wishlist')
      .then(resp=>resp.json())
      .then(data=> {setWishlist(data)
                setLoading(false)
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false)
      })
  },[])

  useEffect(()=>{
    if (user && user.id) {
      const user_id = parseInt(user.id)
      fetch(`http://localhost:3000/users/${user_id}`,{
       headers: {
          "Content-Type": "application/json"
      }})
      .then(resp=>resp.json())
      .then(data=> {
        if (data > 0) {
          console.log('show users',data);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
    }
    
  })
  useEffect(()=>{
    const bestSeller = spares.sort((a,b)=>b.Rating - a.Rating)
    setBestSeller(bestSeller)
  },[spares])
  
  function handleAddToWishlist(spare_id){ 
    console.log('inApp');
    let favorite = wishlist.find((item) => item.item_id === spare_id);
    let selected = spares.find((item) => item.id === spare_id);

  if(favorite || spare_id === 0){
    fetch(`http://localhost:3000/wishlist/${selected.id}`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "accepts":"application/json"
      }
    }) 
    .then(() => {
      // setCartCount(0); 
      
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
  }else{ 
      const itemData = {
        'carMake': selected.carMake,
          'carModel': selected.carModel,
          "description": selected.description,
          "markedPrice": selected.markedPrice,
          "category": selected.category,
          "year": selected.year,
          "sellingPrice":selected.sellingPrice,
          "image": selected.image,
          "id": selected.id,
          "rating":selected.rating,
          "status":selected.status,
          "title":selected.title
        
      }
      fetch('http://localhost:3000/wishlist',{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "accepts":"application/json"
        },
        body:JSON.stringify(itemData)
      })
      .then(resp=>resp.json())
      .then(data=>{setWishlist(data) 
        console.log('done  ',data)})
      .catch((error) => {
        console.error('Fetch error:', error);
      })
    }
  }
  
  return (
    <div className='app-container container-fluid p-0'>
      <BrowserRouter>
        <Navbar onSignup={setUser} onLogin={setUser} cartCount={cartCount}/>
        {!loading ?(
          <Routes>
          <Route  exact path='/' element={<Home  topRated={bestSeller} spares={spares} setSliderCat={setSliderCat} handleAddToCart={handleAddToCart}/>}/>
          <Route path="/shop" element={ <Shop  bestSeller={bestSeller} sliderCat={sliderCat}>
                                        <ItemCard spares={spares} user={user} cartItems={cartItems} setCartItems={setCartItems}>
                                          <Item handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist}/>
                                        </ItemCard>

                                     </Shop> } />
          <Route path="/contact" element={<Contact />} />
          <Route path="shop/singleItem/:id" element={<SingleItem spares={spares} handleAddToCart={handleAddToCart}/>} />
          <Route path="/singleItem/:id" element={<SingleItem spares={spares} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} handleAddToCart={handleAddToCart} cartCount={cartCount}/>} />
          <Route path="/profile" element={<Profile cartItems={cartItems} spares={spares} setSpares={setSpares} />}/>
        </Routes>
        ) : (
          <p>Loading .....</p>
        )}

      <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
