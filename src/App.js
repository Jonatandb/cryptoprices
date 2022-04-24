import './App.css'
import CryptoInformation from './components/CryptoInformation'

function App() {
  return (
    <div className='container-fluid text-center mt-4'>
      <h1 className='mb-4'>Cryptocurrency Prices</h1>
      <CryptoInformation />
    </div>
  )
}

export default App

