import { useEffect, useRef, useState } from 'react'

const CryptoInformation = () => {
  const inputRef = useRef(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

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
    </>
  )
}

export default CryptoInformation
