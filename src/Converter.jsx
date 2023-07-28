const Converter = ({
        currencyOptions, 
        selectCurrency, 
        handleChangeCurrency, 
        amount, 
        handleChangeAmount}) => {
    return (
        <div className="wrapper">
            <input type="number" value={amount} onChange={handleChangeAmount}/>
            <select value={selectCurrency} onChange={handleChangeCurrency}>
            {currencyOptions.map(option => (
                <option  key={crypto.randomUUID()} value={option}>{option}</option>
            ))}
            </select>
        </div>
    )
}

export default Converter
// crypto.randomUUID()