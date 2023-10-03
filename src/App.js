import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from './components/AppBar';
import React from 'react';
import NewsContainer from './components/NewsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [category, setCategory] = React.useState("general");
  const [country, setCountry] = React.useState({ code: 'IN', label: 'India', phone: '91' });
  const [pageSize, setPageSize] = React.useState(6);
  const [query, setQuery] = React.useState("");

  const changeCategory = (category) => {
    setCategory(category)
  }

  const changeCountry = (c) => {
    setCountry(c)
  }

  const changeQuery = (q) => {
    setQuery(q);
  }

  return ( 
    <BrowserRouter>
      <AppBar updateCategory={changeCategory} updateQuery={changeQuery} updateCountry={changeCountry}/>
      <Routes>
        <Route exact path='/NewsWave' element={<NewsContainer countryCode={country.code} pageSize={pageSize} category={category} query={query}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
