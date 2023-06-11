import React, { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";
const url = "https://www.googleapis.com/youtube/v3/search";

const Youtube = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [noOfResults, setNoOfResults] = useState(6);
  const [loading, setLoading] = useState(false);

  const fetchData = (e) => {
    e.preventDefault();
    setQuery(query);
    setLoading(true);
  };
  const scroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setNoOfResults((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    async function Data() {
      const response = await axios.get(
        `${url}?part=snippet&key=${process.env.REACT_APP_key}&q=${query}&maxResults=${noOfResults}`
      );
      const { items } = response.data;
      setData((prev) => [...prev, ...items]);
      scroll();
      setLoading(false);
    }
    Data();
  }, [loading, noOfResults]);

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
        <button className="but" type="submit">
          Search
        </button>
      </form>
      {loading ? (
        <MagnifyingGlass
          visible={true}
          height="100%"
          width="500px"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      ) : data.length < 1 ? (
        <div>
          <MagnifyingGlass
            visible={true}
            height="100%"
            width="500px"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Youtube;
