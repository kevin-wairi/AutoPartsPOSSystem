import React,{useState} from 'react'
import heart from '../../Assets/icons/heart.png'
import cart from '../../Assets/icons/cart.png'
import strokeEngine from '../../Assets/img/stroke engine.jpg'
import './SingleItem.css'
import { useParams } from 'react-router-dom'

function SingleItem({spares,handleAddToCart,handleAddToWishlist}) {

  const {id} = useParams()
  const filtered = spares.filter(spare=>spare.id === parseInt(id))

 

    
  
  return (
    <div className="container  my-4">
    <div className='SingleItem-container'>
{/* begin singleItem-section         */}
        <div className="singleItem-section row bg-white rounded-2">
          
{/* begin singleitem-category           */}
          <div className="singleitem-category col-3 col-sm-6 col-md-3">
                <p>Show All Category</p>
                <ul>
                  <li>Brand</li>
                  <li>Price</li>
                  <li>Year</li>
                  <li>Make </li>
                  <li>Model </li>
                  <li>Type </li>
                </ul>
            </div> 
{/* begin singleitem card  */}
        <div className="singleitem-card col-md-8 col-12 col-lg-8">
          <div className="row ">
            {filtered.map((item)=>(
                <>
              <div className="card-image col-10 col-sm-10 col-md-5 mx-auto">
                <img className='img-fluid' src={item.image} alt="product" />
              </div>
              <div className="singleitem-description col-6 col-sm-10 col-md-6 border">
                
                <h3>{item.title}</h3>
                <div className="d-flex row">
                  <div className="col-lg-10 py-3 d-flex justify-content-center">
                  <div className="favorite col-5 d-flex justify-content-evenly">
                  <div><img src={heart}  alt="favorite" onClick={()=>handleAddToWishlist(item.id)} /></div>
                  <p>Add to wishlist</p>
                  </div>
                  <div className='col-5  d-flex justify-content-evenly'>
                    <img src={cart} alt="favorite" onClick={()=>handleAddToCart(item.id)}/>
                    <p>Add to cart</p>
                  </div>
                    
                  </div>
                  <div className="summary-desc">
                    <p className='fw-bold'>{item.Category}</p>
                    <p>{item.Description}</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam cupiditate, eum officia quas eius fugit placeat delectus maxime vel mollitia ullam tempore necessitatibus quibusdam ea culpa vero dolores, consequuntur repudiandae.
                    Fugiat veniam saepe ipsum dicta! </p>
                  </div>
                  
                </div>
  
              </div>
              </>
            ))}
            
          </div>
        </div>
        </div>
        <hr />
{/* begin full-description-section */}
        <div className="full-description-section row d-flex m-0 p-0 ">
          <div className="latestproducts col-3 col-md-3 col-sm-6">
            <p>Latest products</p>
            <div className="row">
              <div className="card">
                <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
              </div>
              <div className="card">
                <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
              </div>
              <div className="card">
                <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
              </div>
            </div>
          </div>
          <div className="desc-section col-9 col-md-9 col-sm-11 border border-danger container">
            <ul className='no-style-type d-flex justify-content-start'>
              <li className='col'>Description </li>
              <li className='col'>Reviews </li>
            </ul>
            <hr />
              <div className="row d-flex flex-column">
                <p>Make</p>
                <hr />
                <p>Condition</p>
                <hr />
                <p>Model</p>
                <hr />
                <p>Type</p>
                <hr />
                <br />
                <h3>About this item</h3>
                <ul>
                  <li>Contrary to popular belief, Lorem Ipsum is not simply random text.</li>
                  <li>Contrary to popular belief, Lorem Ipsum is not simply random text.</li>
                  <li>Contrary to popular belief, Lorem Ipsum is not simply random text.</li>
                  <li>Contrary to popular belief, Lorem Ipsum is not simply random text.</li>
                </ul>
              </div>
              <div className="simillaritems">
                <h4>You may also like</h4>
                <hr />
                <div className="row">
                  <div className="card col-3">
                    <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">ksh. 3000</p>
                      <a href="/"><img src={cart}  alt='buy'/> </a>
                    </div>
                    </div>
                    <div className="card col-3">
                        <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">ksh. 3000</p>
                          <a href="/"><img src={cart}  alt='buy'/> </a>
                        </div>
                    </div>
                    <div className="card col-3">
                        <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">ksh. 3000</p>
                          <a href="/"><img src={cart}  alt='buy'/> </a>
                        </div>
                    </div>
                    <div className="card col-3">
                        <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">ksh. 3000</p>
                          <a href="/"><img src={cart}  alt='buy'/> </a>
                        </div>
                    </div>
                </div>
                <h4>Related products</h4>
                <hr />
                <div className="row">
                  <div className="card col-3">
                    <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">ksh. 3000</p>
                      <a href="/"><img src={cart}  alt='buy'/> </a>
                    </div>
                    </div>
                    <div className="card col-3">
                        <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">ksh. 3000</p>
                          <a href="/"><img src={cart}  alt='buy'/> </a>
                        </div>
                    </div>
                    <div className="card col-3">
                        <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">ksh. 3000</p>
                          <a href="/"><img src={cart}  alt='buy'/> </a>
                        </div>
                    </div>
                    <div className="card col-3">
                        <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">ksh. 3000</p>
                          <a href="/"><img src={cart}  alt='buy'/> </a>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        
        </div>
        
        {/* begin featured products */}
        <div className="row featured-products-section">
          <div className="featured-category ">
            <ul className='d-flex row no-style-type justify-content-start'>
              <li className='col-3 '>Featured products </li>
              <li className='col-3 '>Top selling products</li>
            </ul>
            <div className="row d-flex justify-content-evenly">
              <div className="card col-2">
                  <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">ksh. 3000</p>
                    <a href="/"><img src={cart}  alt='buy'/> </a>
                  </div>
              </div>
              <div className="card col-2">
                  <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">ksh. 3000</p>
                    <a href="/"><img src={cart}  alt='buy'/> </a>
                  </div>
              </div>
              <div className="card col-2">
                  <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">ksh. 3000</p>
                    <a href="/"><img src={cart}  alt='buy'/> </a>
                  </div>
              </div>
              <div className="card col-2">
                  <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">ksh. 3000</p>
                    <a href="/"><img src={cart}  alt='buy'/> </a>
                  </div>
              </div>
              <div className="card col-2">
                  <img className="card-img-top" src={strokeEngine} alt="Card cap"/>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">ksh. 3000</p>
                    <a href="/"><img src={cart}  alt='buy'/> </a>
                  </div>
              </div>
              
            </div>
          </div>
        </div>

    </div>
    </div>
  )
}

export default SingleItem