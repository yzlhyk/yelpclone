import React, {useEffect, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import {RestaurantsContext} from '../context/RestaurantsContext'
import {useHistory} from "react-router-dom"
import StarRating from './StarRating'

const RestaurantList = (props) => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext)
  let history = useHistory()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/")
        console.log(response.data.data)
        setRestaurants(response.data.data.restaurant)
      } catch (err) {
        console.error(err.message)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter((restaurant) => {
        return restaurant.id != id
      }))
    
    } catch (err) {
      console.error=(err.message)
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation()
    history.push(`/restaurants/${id}/update`)
  } 

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if(!restaurant.count) {
      return <span className="text-warning">0 reveiws</span>
    }
    return (
      <>
      <StarRating rating={restaurant.id} />
      <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    )
    
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>  
            <th scope="col">Delete</th>  
          </tr> 
        </thead>
        <tbody>
          {restaurants && restaurants.map((restaurant) => {
            return (
              <tr 
               key={restaurant.id}
               onClick={() => handleRestaurantSelect(restaurant.id)}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{"$".repeat(restaurant.price_range)}</td>
              <td>{renderRating(restaurant)}</td>
              <td><button
               className="btn btn-warning"
               onClick={(e) => handleUpdate(e, restaurant.id)}>Update</button></td>
              <td><button
               className="btn btn-danger"
               onClick={(e) => handleDelete(e, restaurant.id)}>Delete</button></td>
              <td></td>
            </tr>
            )
          })}
          {/* <tr>
            <td>maca</td>
            <td>new york</td>
            <td>$$</td>
            <td>Rating</td>
            <td><button className="btn btn-warning">Update</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr> */}
        </tbody>     
      </table>
    </div>
  )
}

export default RestaurantList
