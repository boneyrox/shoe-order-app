import { useEffect, useState, useMemo } from 'react';
import { Main } from './components/Main';
import { Navbar } from './components/Navbar';
import './App.css';


function App() {

  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // api call to get products. Uses memoized function to prevent multiple api calls
  let headersList = {
    "Accept": "*/*",

    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "a3607f0573mshe1c67d353f94a73p111dcbjsn3eec22f4b0bc"
  }

  const apiCall = (url = '') => {
    setIsLoading(true);
    fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=24' + url, {
      method: "GET",
      headers: headersList
    })
      .then(res => res.json())
      .then(data => { setProducts(data.results); setIsLoading(false) })
      .catch(err => { console.log(err); setIsLoading(false) });
  }
  // const getProducts = useMemo((url) => apiCall(url), []);

  useEffect(() => {
    apiCall('');


  }, []);



  return (
    <div className="App">
      <Navbar />
      <Main list={products} loading={isLoading} />
    </div>
  );
}

export default App;
