import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft ,faChevronRight} from '@fortawesome/free-solid-svg-icons';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import piston from '.././../Assets/icons/piston.png';
import brakes from '.././../Assets/icons/brakes.png';
import suspension from '.././../Assets/icons/suspension.png';
import wiring from '.././../Assets/icons/wiring.png';
import airConditioner  from '.././../Assets/icons/air-conditioner.png';
import exhaustPipe  from '.././../Assets/icons/exhaust-pipe.png';
import bodyRepair from '.././../Assets/icons/body-repair.png';
import vacuum from '.././../Assets/icons/vacuum.png';
import sign from '.././../Assets/icons/sign.png';
import transmission from '.././../Assets/icons/transmission.png';
import eye from "../../Assets/icons/eye20.png"
import cart from "../../Assets/icons/cart20.png"
import heart from "../../Assets/icons/heart20.png"

import { ShortCat } from '../../components/ArrayFiles/ShortCat';

import './Home.css';

function Home({ topRated,spares ,handleAddToCart,setSliderCat}) {

  const [catOpen,setCatOpen] = useState()
  const navigate = useNavigate();
  const[sliderFilter,setSliderFilter] = useState('')

  const dateSortedSpares = spares.sort((a,b)=>{
      return new Date(a.datePosted) - new Date(b.datePosted)
  })
  const bestOffers = topRated.slice(0, 6);

  const collapseSidebarMenu = ()=>{
    setCatOpen(!catOpen)
}

  const slideLeft = ()=>{
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 200;
  }
  const slideRight = ()=>{
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 200;
  }
  function handleAddToCartClick(spare_id){
    handleAddToCart(spare_id)
  }

  function handleClick(id){
    navigate(`singleItem/${id}`);
  }

  function handleGoToShopClick(cat){
    setSliderCat(cat)    
    console.log(cat);
    navigate(`/Shop`)
  }

  return (
    <div className="home-container ">
    <div className='container p-0'>
      <div className="hero-section ">
        <div className="row">

        </div>
        <div className="row ">
         <div className="cat-section mt-4">
         
         <div  class='categories-icons d-flex  justify-content-center  align-items-center gap-2' >
          <FontAwesomeIcon className='leftChevron' onClick={slideLeft} icon={faChevronLeft} />
                <ul class="d-flex gap-4 overflow-y-auto whitespace-nowrap" id='slider'>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Engine Components')} >
                      <div className="card-image">
                        <img src={piston} alt="parts" />
                      </div>
                      <div class="card-details">
                          <p>Engine</p>
                      </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Transmission and Drivetrain Parts')}>
                        <div className="card-image">
                        <img src={transmission} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Transmission</p>
                        </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Braking System Parts')}>
                        <div className="card-image">
                        <img src={brakes} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Brakes</p>
                        </div>
                    </li>
                    <li  class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Suspension and Steering Components')}>
                        <div className="card-image">
                        <img src={suspension} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Suspension</p>
                        </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Electrical System Parts')}>
                        <div className="card-image">
                        <img src={wiring} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Wiring</p>
                        </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Cooling System Parts')}>
                        <div className="card-image">
                        <img src={airConditioner} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Air Conditioner</p>
                        </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Exhaust System Parts')}>
                        <div className="card-image">
                        <img src={exhaustPipe} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Exhaust pipe</p>
                        </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Body and Exterior Components')}>
                        <div className="card-image">
                        <img src={bodyRepair} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Body Repair</p>
                        </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Interior Parts and Accessories')}>
                        <div className="card-image">
                        <img src={vacuum} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Vacuum</p>
                        </div>
                    </li>
                    <li class='cat-icons my-1 rounded p-1 d-flex flex-column align-items-center' onClick={()=>handleGoToShopClick('Miscellaneous and Accessories')}>
                        <div className="card-image">
                        <img src={sign} alt="parts" />
                      </div>
                        <div class="card-details">
                            <p>Miscellaneous</p>
                        </div>
                    </li>
                </ul>
                <FontAwesomeIcon className='rightChevron' onClick={slideRight} icon={faChevronRight} />
            </div>


         </div>
        
        </div>
      </div>
      <div className="home-main-section ">

        {/* begin cards-section1 */}
        <div className="section-categories-filter mt-md-5 mt-sm-1 ">
          
          <div className="card-section1 row m-0 p-0 d-flex justify-content-between ">
           
              
            <div className='best-offers-div col-md-3'>
            <div className="col-12 border">

            <div className="catFilter relative">
            <nav className="navbar navbar-expand p-0 border border-success" onClick={()=>collapseSidebarMenu()} >
                <button className="btn" id='sidebar-toggle' type='button'>
                <span class="navbar-toggler-icon "></span>
                </button>
                <p>Category </p>
            </nav>
             {/* sidebar-menu */}
            
            {catOpen &&
             <div className=" flex flex-column sidebarMenu sidebar-overlay border border-danger" id='sidebarMenu'>
                <ul className='text-sm'>
                {ShortCat.map((cat, index) => (

                        <div key={index} className="catListItem  p-1 m-1 c">
                          <li className='dropdown-item '>{cat}</li>
                        </div>
                      ))}
                </ul>
              </div>
              }
            </div>
              
            </div> 
            <div className="d-none d-sm-block">
              <div className="col-md-10"><h6>Best Offers</h6></div>
              
              <div className="col-md-12 border m-0 p-0">
              {bestOffers.map((spare,index) => (
                  <div className="bg-white rounded row   d-flex my-1 gap-2" key={index}>
                    <div className=" card-image-top  col-md-4 p-0 " onClick={()=>handleClick(spare.id)}>
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
              
            </div>
            
            <div className="col-md-9 col-sm-6 d-flex flex-wrap">
              <div className="col-12 d-flex justify-content-between py-2 py-sm-0"> 
                <div className="col-7"><h6>New Stocks</h6> </div>
                <div className="col-5"><p>Top 20</p></div>
              </div>
           <div className="row justify-content-around">
           {dateSortedSpares.map((spare,index)=>(
              <div className="card latest-featured-card rounded-0 col-md-3 col-xm-5 p-1" key={index}>
                <div className="featured-img-div my-1 my-sm-0 my-xm-0" onClick={()=>handleClick(spare.id)}>
                  <img className="featured-img img-fluid" src={spare.image} alt="cap"/>
                </div>
                <div className="card-body d-flex flex-column p-0 m-0">
                  <div className="featured-card-details">
                    <p className="card-text desc "><small>{(spare.description).slice(0,39,)}</small></p>
                    <p className="card-text d-none d-md-block"><span className='fw-bold'>ksh.</span>{spare.markedPrice}</p>
                    <div className="col-sm-3 d-flex justify-content-between border p-0 d-md-none d-sm-block">
                         <p className="card-text">ksh.{spare.markedPrice}</p>
                          <img className='cart-img py-1' src={cart} onClick={()=>handleAddToCartClick(spare.id)} alt='buy'/>
                        </div>
                      <div className=" col-12 featured-card-overlay d-flex  justify-content-around text-center d-none d-md-flex">
                        <div className="buy-btn-2  col-4 buy-hover-btn p-1">
                          <img className='cart-img py-1' src={eye}  alt='buy'/><span className='span-btn'></span>
                        </div>
                        <hr  id='hr'/>
                        <div className="buy-btn-1  col-4 buy-hover-btn p-1">
                          <img className='cart-img' src={heart}  alt='buy'/><span className='span-btn'></span>
                        </div>
                        <div className="buy-btn  col-4 buy-hover-btn p-1">
                          <img className='cart-img' onClick={()=>handleAddToCartClick(spare.id)} src={cart} alt='buy'/><span className='span-btn'></span>
                        </div>
                      </div>

                      {/* for mobile */}
                      
                  </div>
                  
                </div>
              </div>
            ))
             }
           </div>
              </div>        
          </div>
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default Home;

