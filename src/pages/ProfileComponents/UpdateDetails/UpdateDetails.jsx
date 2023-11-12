import React, {useEffect, useState} from 'react'

function UpdateDetails({spares,setSpares}) {

    const[description,setDescription] = useState('')
    const[carMake,setCarMake] = useState('')
    const[carModel,setCarModel] = useState('')
    const[year,setYear] = useState('')
    const[image,setImage] = useState('')
    const[markedPrice,setMarkedPrice] = useState('')
    const[sellingPrice,setSellingPrice] = useState('')
    const[quantity,setQuantity] = useState('')
    const[category,setCategory] = useState('')
    const[error,setError] = useState('')
    const[itemId,setItemId] = useState('')
    const[selectedStatus,setSelectedStatus] = useState('')

    const[searchCategory,setSearchCategory] = useState('')
    const[searchCarMake,setSearchCarMake] = useState('')
    const[searchCarModel,setSearchCarModel] = useState('')
    const[filteredGoods,setFilteredGoods]= useState([])
    
    
    const carMakes = ["Toyota", "Ford", "Chevrolet", "Honda", "BMW", "Mercedes-Benz", "Volkswagen", "Audi", "Nissan", "Hyundai", "Kia", "Subaru", "GMC", "Tesla", "Lexus", "Porsche", "Ferrari", "Aston Martin", "Jaguar", "Land Rover"];
    

    const carModels = {
        Toyota: ["Camry", "Corolla", "RAV4", "Prius", "Tacoma", "Highlander"],
        Ford: ["F-150", "Mustang", "Focus", "Escape", "Explorer"],
        Chevrolet: ["Silverado", "Malibu", "Equinox", "Cruze", "Tahoe"],
        Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
        BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
        "Mercedes-Benz": ["C-Class", "E-Class", "GLE", "GLC", "S-Class"],
        Volkswagen: ["Golf", "Jetta", "Passat", "Tiguan", "Atlas"],
        Audi: ["A4", "A6", "Q5", "Q7", "A3"],
        Nissan: ["Altima", "Rogue", "Sentra", "Pathfinder", "Maxima"],
        Hyundai: ["Elantra", "Sonata", "Santa Fe", "Tucson", "Kona"],
        Kia: ["Optima", "Sorento", "Sportage", "Forte", "Telluride"],
        Subaru: ["Outback", "Forester", "Impreza", "Legacy", "Crosstrek"],
        GMC: ["Sierra", "Acadia", "Terrain", "Yukon"],
        Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
        Lexus: ["RX", "ES", "NX", "IS", "LS"],
        Porsche: ["911", "Cayenne", "Panamera", "Macan", "Boxster"],
        Ferrari: ["488", "F8 Tributo", "Portofino", "SF90 Stradale"],
        "Aston Martin": ["DB11", "Vantage", "DBS Superleggera"],
        Jaguar: ["F-Pace", "XE", "XF", "F-Type"],
        "Land Rover": ["Range Rover", "Discovery", "Range Rover Sport", "Evoque"]
    };
    const carModelsYears = {
        Toyota: {
            Camry: [2015, 2016, 2017, 2018, 2019, 2020],
            Corolla: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            RAV4: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            Prius: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
            Tacoma: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            Highlander: [2015, 2016, 2017, 2018, 2019, 2020]
        },
        Ford: {
            "F-150": [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            Mustang: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
            Focus: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            Escape: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            Explorer: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
        }
    };
    const carSparePartsCategories = [
        'Engine Components', 'Transmission and Drivetrain Parts', 'Braking System Parts',
        'Suspension and Steering Components', 'Electrical System Parts', 'Cooling System Parts',
        'Exhaust System Parts', 'Body and Exterior Components', 'Interior Parts and Accessories',
        'Miscellaneous and Accessories'
    ];
    
    useEffect(()=>{
        
        const filterForUpdates = spares.filter((spare) => {
            const spareCategory = (spare.Category || '').toLowerCase();
            const carMake = (spare.carMake || '').toLowerCase();
            const carModel = (spare.carModel || '').toLowerCase();
        
            const isCategoryMatch = spareCategory.includes(searchCategory.toLowerCase());
            const isCarMakeMatch = carMake.includes(searchCarMake.toLowerCase());
            const isCarModelMatch = carModel.includes(searchCarModel.toLowerCase());

            return isCategoryMatch && isCarMakeMatch && isCarModelMatch;
          });
          setFilteredGoods(filterForUpdates)
          console.log(filterForUpdates);
    },[searchCategory, searchCarMake, searchCarModel,spares])

      function handleUpdateGoods(e,spare_id){
        e.preventDefault()
        const id = parseInt(spare_id)
        fetch(`http://localhost:3000/parts/${id}`,{
            method:"PATCH",
            headers:{
                'Content-Type': "application/json"
            },
            body:JSON.stringify({
                description,
                carMake,
                carModel,
                year,
                image,
                markedPrice,
                sellingPrice,
                quantity,
                status:selectedStatus,
                category
            })
        })
      .then(resp=>resp.json())
      .then(data=>{
        const updatedData = spares.map(spare => {
            if (spare.id === id) {
                return { ...spare, ...data };
            }
            return spare;
        });
        setSpares(updatedData)})
      .catch((error) => {
        console.error('Fetch error:', error);
      })

      }
      
    function handleEdit(spare){
        console.log('sparedddd',spare);
        setCarMake(spare.carMake);
        setCarModel(spare.carModel);
        setYear(spare.Year);
            
        setMarkedPrice(spare.markedPrice);
        setSellingPrice(spare.sellingPrice);
        setQuantity(spare.quantity);
        setCategory(spare.category);
        setDescription(spare.description)
        setSelectedStatus(spare.selectedStatus)
        setItemId(spare.id)
    }

    function handleDelete(spare_id,e){
        e.preventDefault()
        const id = parseInt(spare_id)
        fetch(`http://localhost:3000/parts/${id}`,{
            method:"DELETE"
        })
      .then(resp=>{
        if(resp.ok){
                setSpares(spares.filter(spare => spare.id !== spare_id));
        
        } else {
            throw new Error('Network response was not ok.');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      })
    }

    const handleStatusChanged = (e)=>{
        setSelectedStatus(e.target.id)
    }
  return (
    <div className='UpdateDetails-container'>
        <div className="row">
            <h3>Update Goods</h3>
            <hr />
            <p>Search by categories</p>         
        <form className='border'>
        <div className="d-flex flex-row align-items-center justify-content-between mb-2">
            
            <div class="form-outline mb-0 col-3">
                        <label className="form-label">Category</label>
                        <input type="text" list='data3' className="form-control" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} />
            </div>
            
            <div className="form-outline  mb-0 col-3">
                <label className="form-label ">Car Make</label>
                <input className='form-control' list='data' placeholder='Search' value={searchCarMake} onChange={(e) => setSearchCarMake(e.target.value)}/>
                <datalist id='data'>
                    {carMakes.map((element) => (
                    <option key={element} value={element}>{element}</option>
                    ))}
                </datalist>
            </div>
            <div className="form-outline  mb-0 col-3">
                <label className="form-label">Car Model</label>
                <input type="text" list='data1' className="form-control" value={searchCarModel} onChange={(e) => setSearchCarModel(e.target.value)} />
                <datalist id='data1'>
                {carModels[carMake] && carModels[carMake].map((model) => (
                    <option key={model} value={model}>{model}</option>
                ))}
                </datalist>
            </div>
            </div>
        </form>
        </div>
        <div className="card-container">
                    <div className='row  gap-1'>
                        {filteredGoods.length < spares.length && filteredGoods.map((spare)=>(
                               <div className="card col-3">
                               <div className="image-container ">
                                <img className="img-fluid thumbnailImage" src={spare.image} alt="Card cap"/>
                               </div>
                               <div className="card-body p-0 d-flex flex-column justify-content-between">
                                   <p className="card-title  m-0 text-md">{spare.description}</p>
                                   <p className="card-title fw-bold ">{spare.category}</p>
                                 <div className="row d-flex justify-content-between ">
                                   <p className="card-text col-8"> <span className='fw-bold'>ksh.</span> <span className='fw-light'>{spare.markedPrice}</span> </p>
                                   {/* <div className='col-3' onClick={()=>handleAddToCartClick(spare.id)}><img src={cartIsAdded ? redcartimg : cartimg}  alt='shopping'/></div> */}
                                 </div>
                                 <div className='row '>
                                 <button className="btn border-success col-5 flex-fill m-2" onClick={(e)=>handleEdit(spare,e)}>Update </button>
                                 <button className="btn border-danger col-5 flex-fill m-2" onClick={(e)=>handleDelete(spare.id,e)}>Delete </button>
                                    </div>
                               </div>
                             </div>
                        ))}
                    </div>
            </div>       

        
        <div className="row">
            <div className="col-9 border">

            <form className="mx-1 mx-md-4" onSubmit={(e)=>handleUpdateGoods(e,itemId)}>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                    <div className="form-outline  mb-0 col-3">
                        <label className="form-label ">Car Make</label>
                        <input className='form-control' list='data' placeholder='Search' value={carMake} onChange={(e) => setCarMake(e.target.value)}/>
                        <datalist id='data'>
                            {carMakes.map((element) => (
                            <option key={element} value={element}>{element}</option>
                            ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-4">
                        <label className="form-label">Car Model</label>
                        <input type="text" list='data1' className="form-control" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
                        <datalist id='data1'>
                        {carModels[carMake] && carModels[carMake].map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                        </datalist>
                    </div>
                    <div className="form-outline  mb-0 col-3">
                        <label className="form-label">Year</label>
                        <input type="text" list='data2' className="form-control" value={year} onChange={(e) => setYear(e.target.value)} />
                        <datalist id='data2'>
                        {carModelsYears[carMake] && carModelsYears[carMake][carModel] && carModelsYears[carMake][carModel].map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                        </datalist>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                    <div className="form-outline  mb-0 col-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="form-outline  mb-0 col-3">
                        <label className="form-label">Marked Price</label>
                        <input type="number" className="form-control" value={markedPrice} onChange={(e) => setMarkedPrice(e.target.value)} />
                    </div>
                    <div className="form-outline  mb-0 col-3">
                        <label className="form-label">Selling Price</label>
                        <input type="number" className="form-control" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Image</label>
                        <input type="file" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Category</label>
                        <input type="text" list='data3' className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <datalist id='data3'>
                        {carSparePartsCategories.map((element) => (
                            <option key={element} value={element}>{element}</option>
                            ))}
                        </datalist>
                    </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-2">
                    <div className="form-check">
                        <input class="form-check-input" type="radio" name="shipmentStatus" id="arrived" onChange={handleStatusChanged} checked={selectedStatus === 'arrived'}/>
                        <label class="form-check-label" for="arrived">
                            Goods have arrived
                        </label>
                    </div>
                    <div className="form-check">
                        <input class="form-check-input" type="radio" name="shipmentStatus" id="inTransit" onChange={handleStatusChanged} checked={selectedStatus === 'inTransit'}/>
                        <label class="form-check-label" for="inTransit">
                            Goods are in transit
                        </label>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-2">
                    <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                
                {error && <div className='text-danger align-text-center  col-6 mx-auto'>{error}</div>}
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pb-md-4 pb-sm-2 ">
                        <button type="submit"  className="btn btn-primary flex-fill">Update</button>
                    </div>
                </form>
            </div>
            </div>

    </div>
  )
}

export default UpdateDetails