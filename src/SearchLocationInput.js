import React, { useState, useRef, useEffect } from "react";

function SearchLocationInput({handleScriptLoad, loadScript, placeholder, className, set}) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    console.log(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`);
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const changeHandler = (e)=>{
    setQuery(e.target.value);
    set(e.target.value)
  }

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={changeHandler}
        placeholder={placeholder}
        className={className}
        value={query}
      />
    </div>
  );
}

export default SearchLocationInput;
