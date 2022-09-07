import React, {useState, useEffect} from 'react';
import './App.css';
import data from './data';
var enddata = data.map(symbol => Object.keys(symbol))[0];
function App() {
  const [to,
    setto] = useState("");
  const [from,
    setfrom] = useState("");
  const [input,
    setinput] = useState();
  const [result,
    setresult] = useState({})
  const convertvalyuta = () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "OecQtUwE9ZyVnLM2I5FWDGgWJP3AkUk8");
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${input}`, requestOptions)
      .then(response => response.json())
      .then(result => setresult(result))
      .catch(error => console.log('error', error));
  }
  // Əgər select və inputun dəyəri dəyişdikdə avtomatik hesablanmasına istəyiriksə
  // bu codu yazmaq olar Birde api sorgu sayina mehdudiyyet qoyub deye altda olan
  // hesablamalari etmedim useEffect(() => {   convertvalyuta(); },
  // [to,from,input])

  return ( <> 
  <div className='container'>
    <div className='select_div'>
      <select onChange={(e) => setfrom(e.target.value)}>
        <option>Valyuta Secin</option>
        {enddata.map((value) => {
          return (
            <React.Fragment>
              <option value={value}>{value}</option>
            </React.Fragment>
          )
        })
}
      </select>
      <select onChange={(e) => setto(e.target.value)}>
        <option >Valyuta Secin</option>
        {enddata.map((value) => {
          return (
            <React.Fragment>
              <option value={value}>{value}</option>
            </React.Fragment>
          )
        })
}
      </select>

    </div>
    <div className='amount'>
      <h3>Miqdar</h3>
      <div className='input_and_icon'>
        <input
          type="text"
          placeholder="mebleg girin"
          value={input || ""}
          onChange={(e) => setinput(e.target.value)}/>
        <i className="fa-solid fa-rotate" onClick={convertvalyuta}></i>
      </div>
      <span>{result.result
          ? result.result
          : "0"} {to}</span>
    </div>

  </div> 
  </>
  );
}

export default App;