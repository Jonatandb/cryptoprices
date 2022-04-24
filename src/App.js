import './App.css'
import CryptoInformation from './components/CryptoInformation'

function App() {
  return (
    <div className='container-fluid mt-4'>
      <h1 className='mb-4 text-center'>Cryptocurrency Prices</h1>
      <CryptoInformation />
    </div>
  )
}

export default App

