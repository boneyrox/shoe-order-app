import { useEffect, useState, useMemo, createContext } from 'react';
import { Main } from './components/Main';
import { Navbar } from './components/Navbar';
import './App.css';


const context = createContext();
function App() {

  const [products, setProducts] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sizes = [32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
  const brands = ['nike', 'adidas', 'puma', 'converse', 'vans', 'asics']
  // creating context and storing sizes, brands and products in it


  function fillSizes(data) {
    let DATA = [...data];
    for (let i = 0; i < DATA.length; i++) {
      let sizeToAdd = sizes[Math.floor(Math.random() * sizes.length)];
      DATA[i].size = sizeToAdd;
      setProducts(DATA);

    }
  }

  // api call to get products. Uses memoized function to prevent multiple api calls
  let headersList = {
    "Accept": "*/*",

    "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
    "x-rapidapi-key": "a3607f0573mshe1c67d353f94a73p111dcbjsn3eec22f4b0bc"
  }

  const apiCall = (url = '') => {
    setIsLoading(true);
    fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=99' + url, {
      method: "GET",
      headers: headersList
    })
      .then(res => res.json())
      .then(data => {
        setOriginalProduct(data.results);
        setProducts(data.results);
        setIsLoading(false)
        fillSizes(data.results);
      }

      )

      .catch(err => { console.log(err); setIsLoading(false) });
  }
  // const getProducts = useMemo((url) => apiCall(url), []);

  useEffect(() => {
    apiCall('');


  }, []);



  return (


    <div className="App">
      <context.Provider value={{ products, setProducts, sizes, brands, originalProduct, isLoading, setIsLoading, apiCall }}>
        <Navbar />
        <Main list={products} loading={isLoading} sizes={sizes} brands={brands} />
      </context.Provider>
    </div>
  );
}

export default App;
export { context };
