import React,{useState} from 'react'
import { Routes } from 'react-router-dom';
import heart from '../../Assets/icons/heart.png'
import cart from '../../Assets/icons/cart.png'
import strokeEngine from '../../Assets/img/stroke engine.jpg'
import './SingleItem.css'
import { useParams } from 'react-router-dom'
import { ShortCat } from '../../components/ArrayFiles/ShortCat';
import { Card } from 'reactstrap';

function SingleItem({spares,handleAddToCart,handleAddToWishlist}) {

  const {id} = useParams()
  let similarProducts = []; 

  let filtered = spares.filter(spare=>spare.id === parseInt(id))
  if (filtered) {
    let similarProducts = spares.filter(spare => spare.category === filtered.category);
    console.log('similarProducts', similarProducts);
  } else {
    console.log('No matching product found');
  }
  
  
  const dateSortedSpares = spares.sort((a,b)=>{
    return new Date(a.datePosted) - new Date(b.datePosted)
})
const firstThree = dateSortedSpares.slice(0, 6);

  function handleClick(spare){
    filtered = [spare]
  }
    
  
  return (
    <div className="container  my-4">
    <div className='SingleItem-container'>
{/* begin singleItem-section         */}
        <div className="singleItem-section row bg-white rounded-2 py-lg-2">
          
{/* begin singleitem-category           */}
          <div className="singleitem-category col-3 col-sm-6 col-md-3">
          
             {/* sidebar-menu */}
             <div>
              <div className="col"><p>Categories</p></div>
                <ul className='text-sm'>
                {ShortCat.map((cat, index) => (

                        <div key={index} className="catListItem  p-1 m-1 c">
                          <li className='dropdown-item '>{cat}</li>
                        </div>
                      ))}
                </ul>
              </div>
              
            </div> 
{/* begin singleitem card  */}
        <div className="singleitem-card col-md-8 col-12 col-lg-8 ">
          <div className="row ">
            {filtered.map((item)=>(
                <>
              <div className="card-image col-10 col-sm-10 col-md-5 mx-auto border">
                <img className='img-fluid ' src={item.image} alt="product" />
              </div>
              <div className="singleitem-description col-lg-6 col-sm-10 col-md-12">
                
                <h3>{item.title}</h3>
                <div className="d-flex row ">
                  <div className="col-lg-10 py-3 d-flex justify-content-around ">
                    <div className="favorite col-md-5 col-lg-5 d-flex justify-content-evenly">
                    <div><img src={heart}  alt="favorite" onClick={()=>handleAddToWishlist(item.id)} /></div>
                    <p>Add to wishlist</p>
                    </div>
                    <div className='col-md-5 col-lg-5  d-flex justify-content-evenly'>
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
        <div className="full-description-section row d-flex m-0 p-0 border">
          <div className="latestproducts col-lg-3 col-md-10 col-sm-10 order-sm-last order-lg-first">
            <p>Latest products</p>
            <div className="row">
             { firstThree &&  firstThree.map((spare,index)=>(
              <div className="bg-white rounded row   d-flex my-1 gap-2" key={index}>
              <div className=" card-image-top  col-md-4 p-0 " onClick={()=>handleClick(spare)}>
                <img className="img-fluid" src={spare.image} alt="cap"/>
              </div>
                <div className="card-details col-md-7 p-0">
                  <p className="card-title fw-bold">{spare.category}</p>
                  <p className="card-text fw-light ">{(spare.description).slice(0,45)}</p>
                  <p className="card-title fw-bold">Ksh. {spare.markedPrice}</p>
                </div>
            </div>
             ))}
            
            </div>
          </div>
          <div className="desc-section col-lg-8 col-md-10 col-sm-10 border border-danger container order-sm-first order-lg-last">
            <ul className='no-style-type d-flex justify-content-start'>
              <li className='col'>Description </li>
              <li className='col'>Reviews </li>
            </ul>
            <hr />
              <div className="row d-flex flex-column">
              {filtered.map((item)=>( 
                <div className="spareDesc border">

                <div className="col py-2 d-flex gap-5"><p>Make:</p><p>{item.carMake}</p></div>
                <div className="col py-2 d-flex gap-5"><p>Condition</p><p>{item.description}</p></div>
                <div className="col py-2 d-flex gap-5"><p>Make</p><p>{item.carMake}</p></div>
                <div className="col py-2 d-flex gap-5"><p>Model</p><p>{item.carModel}</p></div>
                <div className="col py-2 d-flex gap-5"><p>Year</p>{item.year}</div>
                </div>
                ))}
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
                {similarProducts.map((item)=>
                (
                  <p>hello{item.title}</p>
                )
                )}
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