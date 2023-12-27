import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

const Product = () => {
  return (
    <div>
         <div className="container-fluid ">
            <div className="row" >
              <div className="col-md-3 m-0 p-0"><Sidebar/></div>
              <div className="col-md-9">
              <h1>Product</h1>
              <div className="row mt-3">
              <table className="table">
  <thead>
    <tr className="table-primary">
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Shipping</th>
      <th scope="col">Category</th>
      <th scope="col">Quantitiy</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
    {
      [1,2,3,4]?.map((u,i)=>{
       return <tr>
        <th scope="row">{u.name}</th>
        <td>{u.email}</td>
        <td>55</td>
        <td>3</td>
        <td>10,000</td>
        <td>10,000</td>
        <td>
         <button className="btn btn-primary">View</button>
         <button className="btn btn-secondary mx-2">Edit</button>
         <button className="btn btn-danger">Delete</button>

        </td>
      </tr>
      })

    }

   
  </tbody>
</table>

              </div>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Product
