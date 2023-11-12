import React from 'react'
import cartimg from "../../Assets/icons/cart.png"
import eye from "../../Assets/icons/eye20.png"
import cart from "../../Assets/icons/cart20.png"
import heart from "../../Assets/icons/heart20.png"
import './Item.css'

function Item({spare,handleAddToCart,handleClick,handleAddToWishlist}) {

    
       
  return (
    <>
        <div className="card single-card col-md-2  col-sm-3 col-3 my-2">
          <div className="item-image-container my-2"  onClick={()=>handleClick(spare.id)}>
           <img className="img-fluid thumbnailImage" src={spare.image} alt="Card cap"/>
          </div>
          <div className="card-body relative p-0 d-flex flex-column justify-content-around mb-1">
              <div className="item-card-details d-flex flex-column justify-content-between">
              <p className="item-card-title">{spare.title}</p>
              <p className='fw-light'><span className='fw-bold'>ksh.</span> {spare.markedPrice}</p>
              <div className=" col-12 item-card-overlay d-flex  justify-content-around text-center d-none d-md-flex">
                  <div className="buy-btn-2  col-4 buy-hover-btn p-1">
                    <img className='cart-img py-1' src={eye}  alt='buy'/><span className='span-btn'></span>
                  </div>
                  <hr  id='hr'/>
                  <div className="buy-btn-1  col-4 buy-hover-btn p-1">
                    <img className='cart-img' src={heart} onClick={()=>handleAddToWishlist(spare.id)} alt='buy'/><span className='span-btn'></span>
                  </div>
                  <div className="buy-btn  col-4 buy-hover-btn p-1">
                    <img className='cart-img' onClick={()=>handleAddToCart(spare.id)} src={cart} alt='buy'/><span className='span-btn'></span>
                  </div>
                </div>
              </div>
            <div className="row d-flex justify-content-around d-md-none d-sm-block">
              <p className="card-text col-8"> <span className='fw-bold'>ksh.</span> <span className='fw-light'>{spare.markedPrice}</span> </p>
              <div className='col-3' onClick={()=>handleAddToCart(spare.id)}><img src={ cartimg}  alt='shopping'/></div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Item