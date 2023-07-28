import { useEffect, useState } from 'react';
import './App.css';
import Converter from './Converter';

const API_KEY = "fea3c0dbc4233f255301e202"
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()

  const [amount, setAmount] = useState(1)
  const [isFromChanged, setIsFromChanged] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()

  let fromAmount, toAmount
  if(isFromChanged){
    fromAmount = amount;
    toAmount = amount * exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  console.log(exchangeRate)
  
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const secondCurrency = Object.keys(data.conversion_rates)[1]
        setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(secondCurrency) 
        setExchangeRate(data.conversion_rates[secondCurrency])
      })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toAmount}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.conversion_rates[toCurrency]))      
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setIsFromChanged(true)
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value)
    setIsFromChanged(false)
  }

  return (
    <div className='container'>
      <h1>currency converter</h1>
      <Converter
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        handleChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handleChangeAmount={handleFromAmountChange}
        />
      <div className='separator'>=</div>
      <Converter 
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        handleChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        handleChangeAmount={handleToAmountChange}
        />
    </div>
  );
}

export default App;
