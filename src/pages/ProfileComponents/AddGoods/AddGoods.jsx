import React,{useState} from 'react'
import {carMakes} from '../../../components/ArrayFiles/CarMakes'
import {carModels} from '../../../components/ArrayFiles/CarModel'
import {carModelsYears} from '../../../components/ArrayFiles/CarModelsYears'
import {carSparePartsCategories} from '../../../components/ArrayFiles/CarSparePartsCategories'
import './AddGoods.css'

function AddGoods( {spares,setSpares}) {

    const[description,setDescription] = useState('')
    const[carMake,setCarMake] = useState('')
    const[carModel,setCarModel] = useState('')
    const[year,setYear] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const[markedPrice,setMarkedPrice] = useState('')
    const[sellingPrice,setSellingPrice] = useState('')
    const[quantity,setQuantity] = useState('')
    const[category,setCategory] = useState('')
    const[title,setTitle] = useState('')
    const[selectedStatus,setSelectedStatus] = useState('')
    const [datePosted, setDatePosted] = useState(''); 
    

    const[error,setError] = useState('')

    async function handleAddGoods(){
        

        try{
        const response = await fetch('http://localhost:3000/parts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accepts: 'application/json',
                },
                body: JSON.stringify({
                    title,
                    category,
                    description,
                    carMake,
                    carModel,
                    year,
                    image:selectedFile,
                    markedPrice,
                    sellingPrice,
                    quantity,
                    status:selectedStatus,
                    datePosted
                    
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('added goods',spares);
                const updatedspares= [...spares,data]
                setSpares(updatedspares)
            }else {
                console.error('Failed to add goods:');
            }
        }catch (error) {
                console.error('Error:', error);
            }
    }

    const handleStatusChanged = (e)=>{
        setSelectedStatus(e.target.id)
        setDatePosted(new Date().toDateString()); 
    }
    const handleFileChange = (e)=>{
        setSelectedFile(URL.createObjectURL(e.target.files[0]))
        console.log(URL.createObjectURL(e.target.files[0]));
       
       
    }

  return (
    <div>
        
        <div className="row">
        <div className="col-10 mx-auto "><h3>Add Goods</h3></div>
            <div className="col-9">
            <form className="mx-1 mx-md-4" onSubmit={(e)=>handleAddGoods(e)}>
            <div className="d-flex flex-row align-items-center mb-2">
                <div className="form-outline flex-fill mb-0">
                    <label className="form-label">Name of Product</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                        <input type="file" className="form-control" onChange={(e)=>handleFileChange(e)} />
                    </div>
                </div>
                
                <div class="d-flex flex-row align-items-center mb-2">
                    <div className="form-check">
                        <input class="form-check-input" type="radio" name="shipmentStatus" id="arrived" onChange={handleStatusChanged} checked={selectedStatus === 'arrived'}  />
                        <label class="form-check-label" for="arrived">
                            Goods have arrived
                        </label>
                    </div>
                    <div className="form-check">
                        <input class="form-check-input" type="radio" name="shipmentStatus" id="inTransit" onChange={handleStatusChanged} checked={selectedStatus === 'inTransit'}  />
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
                        <button type="submit"  className="btn btn-primary ">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddGoods