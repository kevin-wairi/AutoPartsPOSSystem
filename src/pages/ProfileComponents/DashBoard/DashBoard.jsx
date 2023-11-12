import React from 'react'

function DashBoard({cancelled,inTransit,arrived,spares}) {
  return (
    <div className='container'>
      
      <div className="row ">
        <div className="d-flex flex-column border">
            <div className="adminDash col-12">
              <h4>Welcome to Dashboard</h4>
              <p>Here you can add,edit, update and delete records</p>
            </div>
           <div className="col-8 d-flex flex-wrap justify-content-around">
            

              <div className="row gap-2">
              <div className="col-md-4 col-sm-6 mb-2">
                  <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title">Goods in Transit</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Total</h6>
                      <p className="card-text fw-bold fs-4">{inTransit.length} </p>
                      <a href="#" className="card-link">Card link</a>
                      
                    </div>
                  </div>
              </div>
              <div className="col-md-4 col-sm-6 mb-2">
                    <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title">Goods Arrived</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Total</h6>
                      <p className="card-text fw-bold fs-4">{arrived.length} </p>
                      <a href="#" className="card-link">Card link</a>
                      
                    </div>
                  </div>
              </div>
              <div className="col-md-4 col-sm-6 mb-2">
                   <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title">Goods Cancelled</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Total</h6>
                      <p className="card-text fw-bold fs-4">{cancelled.length} </p>
                      <a href="#" className="card-link">Card link</a>
                      
                    </div>
                  </div>
              </div>
                <div className="col-md-4 col-sm-6 mb-2">
                    <div className="card" >
                      <div className="card-body">
                        <h5 className="card-title">Stock</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Total</h6>
                      <p className="card-text fw-bold fs-4">{spares.length} </p>
                        <a href="#" className="card-link">Card link</a>
                        
                      </div>
                    </div>
                </div>
              </div>
              
           </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard