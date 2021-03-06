import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  const { loading, data } = useFetch()
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])
  const handlePage = (index) => {
    setPage(index)
  }
  const checkPage = (page) => {
    if (page < 0) return data.length - 1
    if (page > data.length - 1) return 0
    return page
  }
  const prevPage = () => {
    setPage(checkPage(page - 1))
  }
  const nextPage = () => {
    setPage(checkPage(page + 1))
  }

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? 'loading...' : '分頁DEMO'}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${page === index && 'active-btn'}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button className="next-btn" onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
