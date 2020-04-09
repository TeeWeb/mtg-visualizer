import React, { useState, useEffect } from "react";
import KEYWORDS from "../data/Keywords";

import "./SearchParams.css";

const SearchParams = ({ requestCards }) => {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const [activeColors, setActiveColors] = useState([]);
  const [colorOperator, setColorOperator] = useState("And/Or");
  const [allCardTypes, setAllCardTypes] = useState([]);

  const abilityWords = KEYWORDS.abilityWords;
  const keywordAbilities = KEYWORDS.keywordAbilities;
  const allKeywords = abilityWords.concat(keywordAbilities).sort();

  const getAllTypes = () => {
    fetch("https://api.magicthegathering.io/v1/types").then((res) => {
      const types = res.json().then((data) => {
        setAllCardTypes(data.types);
        return data.types;
      });
      return types;
    });
  };

  useEffect(() => {
    getAllTypes();
    setActiveColors([]);
  }, [setActiveColors]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestCards(activeColors, colorOperator, keyword, type);
        }}
      >
        <div className="search-params-colors">
          <label htmlFor="search-color-white" className="search-param">
            White
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-white"
              name="search-color-white"
              value="White"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-blue" className="search-param">
            Blue
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-blue"
              name="search-color-blue"
              value="White"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-red" className="search-param">
            Red
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-red"
              name="search-color-red"
              value="red"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-black" className="search-param">
            Black
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-black"
              name="search-color-black"
              value="black"
              defaultChecked
            ></input>
          </label>
          <label htmlFor="search-color-green" className="search-param">
            Green
            <input
              className="search-param-checkbox"
              type="checkbox"
              id="search-color-green"
              name="search-color-green"
              value="green"
              defaultChecked
            ></input>
          </label>
        </div>
        <div className="search-param-color-operator">
          <label
            htmlFor="search-color-operation-selector"
            className="search-param"
          >
            Color Select Rule
            <select
              className="search-param-radio"
              id="search-color-operation-selector"
              name="search-color-operation-selector"
              onChange={(e) => setColorOperator(e.target.value)}
              onBlur={(e) => setColorOperator(e.target.value)}
            >
              <option>And/Or</option>
              <option>Or</option>
              <option>And</option>
            </select>
          </label>
        </div>
        <div className="search-params-terms">
          <div className="search-params-keywords">
            <label htmlFor="search-keyword" className="search-param">
              Keyword
              <select
                className="search-param-keyword"
                id="search-keyword"
                name="keyword"
                onChange={(e) => setKeyword(e.target.value)}
                onBlur={(e) => setKeyword(e.target.value)}
              >
                <option>All</option>
                {allKeywords.map((keyword) => (
                  <option key={keyword} value={keyword}>
                    {keyword}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="search-params-types">
            <label htmlFor="search-type" className="search-param">
              Type
              <select
                className="search-param-type"
                id="search-type"
                name="type"
                onChange={(e) => setType(e.target.value)}
                onBlur={(e) => setType(e.target.value)}
              >
                <option>All</option>
                {allCardTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
