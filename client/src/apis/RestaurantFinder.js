import axios from "axios"

// NODE_ENV = 'development'
// NODE_ENV = 'production'

// IF we are in production baseURL = /api/v1/restaurants
// ELSE baseURL = "http://localhost:4000/api/v1/restaurants"

// const baseURL = "http://localhost:4000/api/v1/restaurants"

const baseURL = process.env.NODE_ENV === 'production' 
    ? "api/v1/restaurants" 
    : "http://localhost:4000/api/v1/restaurants"


export default axios.create({
  baseURL 
})