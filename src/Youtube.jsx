import React, { useState } from "react";
import axios from "axios";
const url = "https://www.googleapis.com/youtube/v3/search";

const Youtube = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [noOfResults, setNoOfResults] = useState(3);

  const fetchData = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${url}?part=snippet&key=${process.env.REACT_APP_key}&q=${query}&maxResults=${noOfResults}`
    );
    const { items } = response.data;
    setData(items);
  };

  return (
    <>
      <form className="search" onSubmit={fetchData}>
        <input
          id="in"
          autoComplete="off"
          name="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search HERE.."
        />
        <input
          id="num"
          type="number"
          name="number"
          value={noOfResults}
          onChange={(e) => setNoOfResults(e.target.value)}
        />
        <button className="but" type="submit">
          Search
        </button>
      </form>
      <div>
        {data.map((ss, index) => (
          <div key={index} className="container">
            <iframe
              className="result"
              width="600"
              height="267"
              src={`https://www.youtube.com/embed/${ss.id.videoId}`}
              title="YouTube video player"
              //   frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

export default Youtube;
