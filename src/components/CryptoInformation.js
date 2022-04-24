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
      />
    </>
  )
}

export default CryptoInformation
