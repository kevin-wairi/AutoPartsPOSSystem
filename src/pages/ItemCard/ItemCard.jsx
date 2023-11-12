import React from 'react'
import './ItemCard.css'
import { useNavigate } from 'react-router-dom';



function ItemCard({spares,catFiltered, descFiltered, carMakeFiltered,carModelFiltered,yearFiltered,children}) {

  const navigate = useNavigate();
  

  function handleClick(id){
    navigate(`singleItem/${id}`);
  }


  const filteredSpares = spares.filter((spare) => {
    const spareCategory = spare.category.toLowerCase();
    const spareDescription = spare.description.toLowerCase();
    const carMake = spare.carMake.toLowerCase();
    const carModel = spare.carModel.toLowerCase();

    const isCatFiltered= spareCategory.includes(catFiltered.toLowerCase());
    const isDescMatch = descFiltered.toLowerCase().split(" ").every((word) => spareDescription.includes(word));
    const isCarMakeMatch = carMake.includes(carMakeFiltered.toLowerCase());
    const isCarModelMatch = carModel.includes(carModelFiltered.toLowerCase());


    return isCatFiltered && isDescMatch && isCarMakeMatch && isCarModelMatch;
  });

  //filters spares based on year
  const filteredSparesByYear = filteredSpares.filter((spare) => parseInt(spare.Year) === parseInt(yearFiltered));
  // allFilteredSpares
  const allFilteredSpares = yearFiltered ? filteredSparesByYear : filteredSpares;
  

  

  return (
   <>
    {allFilteredSpares.map((spare,index)=>(
   
        React.Children.map(children, (child) => {
          return React.cloneElement(child, { spare,handleClick});
        })
        ))}
    </>

  )
}

export default ItemCard