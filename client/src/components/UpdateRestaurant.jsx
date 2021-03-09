import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = (props) => {
  const {id} = useParams()
  let history = useHistory()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response.data.data)
        setName(response.data.data.restaurant.name)
        setLocation(response.data.data.restaurant.location)
        setPriceRange(response.data.data.restaurant.price_range)
      } catch (err) {
        console.log(err)
      } 
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange
    })
    history.push("/")
  }

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
           value={name}
           onChange={(e)=>setName(e.target.value)} 
           id="name" 
           type="text" 
           className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="Location">Location</label>
          <input 
           value={location}
           onChange={(e)=>setLocation(e.target.value)}
           id="Location" 
           type="text" 
           className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input 
           value={priceRange}
           onChange={(e)=>setPriceRange(e.target.value)}
           id="price_range" 
           type="number" 
           className="form-control"/>
        </div>
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
