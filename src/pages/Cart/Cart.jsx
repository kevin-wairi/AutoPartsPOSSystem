import React, { useRef,useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Cart.css'


function Cart({cartItems,setCartItems,handleAddToCart,cartCount}){
    const navigate = useNavigate()
    let cardRef = useRef()

    const[selectedItem,setSelectedItem]= useState()

    const addAmount = (selected) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === selected.id) {
                return { ...item, cartQuantity: item.cartQuantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
    }
    

    const getTotalPrice = ()=>{
        let totalPrice = 0
            if(Array.isArray(cartItems)){
                cartItems.forEach((item)=>{
                    totalPrice+= item.markedPrice*item.cartQuantity;
                })
            }
            return totalPrice;
    }


    const minusAmount = (selected) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === selected.id && item.cartQuantity > 1) {
                return { ...item, cartQuantity: item.cartQuantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
    }

    const handleCartDetails = (item)=>{
        setSelectedItem(item)
        console.log('itemin',item);
    }


    function handleClose(){
        handleCartDetails(null)
    }
    useEffect(()=>{
        let handler = (e)=>{
          if(cardRef.current && !cardRef.current.contains(e.target)){
            handleCartDetails(null)
          }
        }
        document.addEventListener('mousedown',handler)
        return()=>{
            document.removeEventListener('mousedown',handler)
        }
      })

      const handleCheckout = ()=>{
        navigate('/checkout')
      }

      function HandleDeleteCartItem(item_id){
        handleAddToCart(item_id)
      }
    return(
        <div className="container ">
           
            <section class="h-100" style={{backgroundColor: "#eee"}}>
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
          <div>
            <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                  class="fas fa-angle-down mt-1"></i></a></p>
          </div>
        </div>
        {Array.isArray(cartItems) && cartItems.map((item,index)=>( 
            <div class="card rounded-3 mb-2" key={index}>
          <div class="card-body ">
            <div class="row d-flex justify-content-around align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center">
                <img
                  style={{ width: '80px', height: '80px' }} 
                  src={item.image}
                  class="img-fluid rounded-3" alt={item.title}/>
              </div>
              <div class="col-md-4 col-lg-3 col-xl-3">
                <p class="fs-6 fw-normal mb-1">{item.title}</p>
                <p><span class="text-muted">model: </span>{item.carMake}  <span class="text-muted">Model: </span>{item.carModel}</p>
              </div>
              <div class="col-md-2 col-lg-2 col-xl-2 d-flex">
                <button class="btn btn-link px-2 border"
                  onClick={()=>minusAmount(item)}>
                  <i class="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value={item.cartQuantity} type="number"
                  class="form-control form-control-sm" />

                <button class="btn btn-link px-2 border"
                  onClick={()=>addAmount(item)}>
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">ksh. {Math.trunc((item.markedPrice*item.cartQuantity)*100)/100}</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a onClick={()=>HandleDeleteCartItem(item.id)} href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>
        )
        )}
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-normal mb-0 text-black">Summary</h3>
          
        </div>
        {/* summary */}
        <div class="card mb-2">
          <div class="card-body ">
            <div className="p-4  d-flex justify-content-around">
          <div class="col-md-2 col-lg-3 col-xl-3 ">
            <p class="fs-6 fw-normal mb-1">Products  <span>{cartCount}</span> </p>
          </div>
          <div class="col-md-4 col-lg-2 col-xl-2">
          <p class="fs-6 fw-normal mb-1">Shipping</p>
          <div class="mb-2">
            <select class="form-select" >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            </div>
            
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2">
            <p class="fs-6 fw-normal mb-1">Items {cartCount} </p>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2">
            <p class="fs-6 fw-normal mb-1">Items {cartCount} </p>
            <p class="fs-6 fw-normal mb-1">Shiping</p>
          </div>
          </div>
          </div>
        </div>

        <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Summary</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>$53.98</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Gratis</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p class="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span><strong>$53.98</strong></span>
              </li>
            </ul>

            <button type="button" class="btn btn-primary btn-lg btn-block">
              Go to checkout
            </button>
          </div>
          </div>
          </div>
        <div class="card mb-4">
          <div class="card-body p-4 d-flex flex-row">
            <div class="form-outline flex-fill">
              <input type="text" id="form1" class="form-control form-control-lg" />
              <label class="form-label" for="form1">Discound code</label>
            </div>
            <button type="button" class="btn btn-outline-warning btn-lg ms-3">Apply</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <button type="button" class="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
        </div>
    )
}

export default Cart;