import { useState, useEffect } from 'react'
import paginate from './utils'
import axios from 'axios'
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

export const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const fetchData = async () => {
    const response = await axios(url)
    const data = response.data
    setData(paginate(data))
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return { loading, data }
}
