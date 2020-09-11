import React, { useState, useEffect } from "react";

import SuggestionItem from "./components/SuggestionItem";
import NoResult from "./components/NoResult";

import jsondata from './data.json';
import "./styles.css";

export default function App() {
  const [query, setQuery] = useState('');
  const [kb, setKb] = useState(false);
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // console.log({data});

  /**
   * the end point is blocked from codesandbox, hence locally stored
   */
  // useEffect(() => {
  //   fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
  //   .then(res => res.json())
  //   .then(res => console.log({ res }))
  //   .catch((err) => console.log(err))
  // },[])

  useEffect(() => {
    const q = query.toLowerCase();
    q && setData(jsondata.filter(item => item.id.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || JSON.stringify(item.items).toLowerCase().includes(q) || item.address.toLowerCase().includes(q)))
  }, [query])

  const InputHandler = (e) => {
    setSelectedIndex(0)
    setQuery(e.target.value.trim())
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
      setKb(true)
    } else if (e.keyCode === 40 && selectedIndex < data.length) {
      setSelectedIndex(selectedIndex + 1)
      setKb(true)
    }
    // console.log({selectedIndex});
  }

  const hoverHandler = (id) => {
    setSelectedIndex(id)
    setKb(false);
  }
  
  return (
    <div className="App">
      <h1>Search Suggestion</h1>
      <div className="search-wrapper">
        <input value={query} onKeyDown={handleKeyDown} type="text" placeholder="Search User by ID, address, name..." onChange={InputHandler} />
        {
          data.length>0 ?
          <ul className="suggestion">
            {
              query && data.map((item,i) => 
                <SuggestionItem
                  hovercb={hoverHandler}
                  key={item.id}
                  index={i + 1}
                  query={query}
                  isHovered={i + 1 === selectedIndex}
                  isKb={kb}
                  {...item}
                />
              )
            }
          </ul>
            : query.length > 0 ?
              <NoResult/>
            : null
        }
      </div>
    </div>
  );
}