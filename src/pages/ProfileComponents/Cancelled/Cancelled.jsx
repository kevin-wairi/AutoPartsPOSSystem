import React from 'react'
import './Cancelled.css'

function Cancelled({cancelled}) {
  return (
    <div>
      <div className="col-10 mx-auto"><h3>Cancelled</h3></div>
      <div class="table-responsive">
        <table class="table">
        <thead>
          <tr>
            <th className="sticky-column" scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Car Make</th>
            <th scope="col">Car Model</th>
            <th scope="col">quantity</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {cancelled && cancelled.map((stock,index)=>(
              <tr key={index}>
              <th className="sticky-column" scope="row">{index+1}</th>
              <td>{stock.title}</td>
              <td>{stock.carMake}</td>
              <td>{stock.carModel}</td>
              <td>{stock.quantity}</td>
              <td>{stock.status}</td>
            </tr>
          ))

          }
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cancelled