import { useEffect, useRef, useState } from 'react'

const CryptoInformation = () => {
  const inputRef = useRef(null)
  const componentMounted = useRef(false)
  const [search, setSearch] = useState('')
  const [cryptoData, setCryptoData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    componentMounted.current = true

    if (inputRef.current) {
      inputRef.current.focus()
    }

    getCrytpoData()

    return () => {
      componentMounted.current = false
    }
  }, [])

  const getCrytpoData = async () => {
    // Get the crypto data from CoinGecko API:
    const url = `https://api.coingecko.com/api/v3/coins/`
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      if (componentMounted.current) {
        setCryptoData(data)
      }
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSearchChanged = event => {
    setSearch(event.target.value)
  }

  return (
    <>
      <input
        type='text'
        placeholder='Type currency name...'
        value={search}
        onChange={onSearchChanged}
        ref={inputRef}
        className='form-control'
      />
      {isLoading ? (
        <div className='mt-5'>
          <span>Loading data...</span>
        </div>
      ) : error ? (
        <div className='mt-5'>
          <span>{error.message}</span>
        </div>
      ) : (
        <table className='table table-dark table-hover mt-3'>
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Price 24h</th>
            </tr>
          </thead>
        </table>
      )}
    </>
  )
}

export default CryptoInformation
