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

  const results = cryptoData.filter(
    crypto =>
      crypto.name.toLowerCase().includes(search?.trim().toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search?.trim().toLowerCase()),
  )

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
          <tbody>
            {results.map(crypto => (
              <tr key={crypto.id}>
                <td>{crypto.market_data?.market_cap_rank}</td>
                <td>
                  <img src={crypto.image?.thumb} alt={`${crypto.id} icon`} />
                  {` ${crypto.name}`}
                </td>
                <td>{crypto.symbol?.toUpperCase()}</td>
                <td>{crypto.market_data?.current_price?.bmd?.toFixed(2)}</td>
                <td>
                  {crypto.market_data?.price_change_percentage_24h > 0 ? (
                    <span className='text-success'>
                      {crypto.market_data?.price_change_percentage_24h.toFixed(
                        2,
                      )}
                      %
                    </span>
                  ) : (
                    <span className='text-danger'>
                      {crypto.market_data?.price_change_percentage_24h.toFixed(
                        2,
                      )}
                      %
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default CryptoInformation
