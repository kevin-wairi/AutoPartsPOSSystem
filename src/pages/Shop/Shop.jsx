import React, {  useEffect, useState } from 'react'
import {carSparePartsCategories} from '../../components/ArrayFiles/CarSparePartsCategories'
import {carModelsYears} from '../../components/ArrayFiles/CarModelsYears'
import {carModels} from '../../components/ArrayFiles/CarModel'
import {carMakes} from '../../components/ArrayFiles/CarMakes'
import './Shop.css'

function Shop({children ,sliderCat}) {
  
  const[catFiltered,setCatFiltered]= useState('')
  const[descFiltered,setDescFiltered]= useState('')
  const[carMakeFiltered,setCarMakeFiltered]= useState('')
  const[carModelFiltered,setCarModelFiltered]= useState('')
  const[yearFiltered,setYearFiltered]= useState('')
  
  
  useEffect(()=>{
    setCatFiltered(sliderCat)
  },[sliderCat])

  function handleFormSubmit(){
  }

  function handleCatChange(e){
    e.preventDefault()
    setCatFiltered(e.target.value)
  }

  function handleDescChange(e){
    e.preventDefault()
    setDescFiltered(e.target.value)
  }

  function handleCarMakeChange(e){
    e.preventDefault()
    setCarMakeFiltered(e.target.value)
  }

  function handleCarModelChange(e){
    e.preventDefault()
    setCarModelFiltered(e.target.value)
  }

  function handleYearChange(e){
    e.preventDefault()
    setYearFiltered(e.target.value)
  }

  const shopCatDropdown = ()=>{
    document.getElementById('catFilterForm').classList.toggle('d-none')
  }

  function handleClearFilter(e){
    e.preventDefault()
    setCatFiltered('')
    setDescFiltered('')
    setCarMakeFiltered('')
    setCarModelFiltered('')
    setYearFiltered('')
  }
 
  return (
    // main div
    <div className='container-Shop container p-0'>
       {/* hero section */}
      
       
      <div className="hero-section border ">
      <div className="row">
        {/* <div type='col' className="col-5 text-center"><h6>Filter results by category</h6></div> */}
        <nav className="navbar navbar-expand p-0 border border-success col-10 mx-auto d-md-none  d-sm-flex" onClick={()=>shopCatDropdown()} >
                <button className="btn" id='sidebar-toggle' type='button'>
                <span class="navbar-toggler-icon "></span>
                </button>
                <p>Filter results by category </p>
            </nav>
       </div>
        {/* filter form */}
            <form onSubmit={() => handleFormSubmit()} className='d-none d-md-block' id='catFilterForm'>
                  <div className="form-row d-flex justify-content-center flex-wrap">
                      <div className="col-md-2 col-sm-10">
                          <input type="text" list='data4' className="form-control rounded-0 mb-1" placeholder="Category " onChange={(e) => handleCatChange(e)} value={catFiltered}/>
                          <datalist id='data4'>
                              {carSparePartsCategories.map((element) => (
                                  <option key={element} value={element}>{element}</option>
                              ))}
                          </datalist>
                      </div>
                      <div className="col-md-2 col-sm-10">
                          <input type="text" className="form-control rounded-0 mb-1" placeholder="General Description" onChange={(e) => handleDescChange(e)} value={descFiltered}/>
                      </div>
                      <div className="col-md-2 col-sm-10">
                          <input type="text" list='data1' className="form-control rounded-0 mb-1" placeholder="Car make" onChange={(e) => handleCarMakeChange(e)} value={carMakeFiltered}/>
                          <datalist id='data1'>
                              {carMakes.map((element) => (
                                  <option key={element} value={element}>{element}</option>
                              ))}
                          </datalist>
                      </div>
                      <div className="col-md-2 col-sm-10">
                          <input type="text" list='data2' className="form-control rounded-0 mb-1" placeholder="Car model" onChange={(e) => handleCarModelChange(e)} value={carModelFiltered}/>
                          <datalist id='data2'>
                              {carModels[carMakeFiltered] && carModels[carMakeFiltered].map((model) => (
                                  <option key={model} value={model}>{model}</option>
                              ))}
                          </datalist>
                      </div>
                      <div className="col-md-2 col-sm-10">
                          <input type="number" list='data3' className="form-control rounded-0 mb-1" placeholder="Year" onChange={(e) => handleYearChange(e)} value={yearFiltered}/>
                          <datalist id='data3'>
                              {carModelsYears[carMakeFiltered] && carModelsYears[carMakeFiltered][carModelFiltered] && carModelsYears[carMakeFiltered][carModelFiltered].map((year) => (
                                  <option key={year} value={year}>{year}</option>
                              ))}
                          </datalist>
                      </div>
                      <div className="col-md-1 col-sm-10  col-10">
                        <button  onClick={(e)=>handleClearFilter(e)} className="btn border bg-danger text-white col-12 ">
                          Clear
                        </button>
                      </div>
                  </div>
            </form>

      </div>

    <div className="main-section">
  
     <div className="container-fluid">
     <div className="row">
        <div type='col' className="col-5 text-center"><h6>Best Deals in spare parts and accessories</h6></div>
       </div>
     </div>
     <div className="shop-filter-section">
            <div className="row m-0">
              <div className="col-12 border">
              
              </div>
            </div>
          </div>
{/* begin card-section */}
       <div className="card-section row d-flex justify-content-around">
          {/* single card component */}
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { catFiltered ,descFiltered, carMakeFiltered,carModelFiltered,yearFiltered});
            })}
        </div>
        {/* begin category-section1 */}
      

      </div>
    </div>
  )
}

export default Shop