import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("code");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3fa65cba43aa57f5e8665ed765bbffd6&query=${search}&language=fr-FR&page=1&include_adult=false`
      )
      .then((data) => setMoviesData(data.data.results));
    return () => {};
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Recherche" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            <p>Top</p>
            <span>↑</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            <p>Flop</p>
            <span>↓</span>
          </div>
        </div>
        <div className="result">
          {moviesData
            .slice(0, 12)
            .sort((a, b) => {
              if (sortGoodBad === "goodToBad") {
                return b.vote_average - a.vote_average;
              } else if (sortGoodBad === "badToGood") {
                return a.vote_average - b.vote_average;
              }
            })
            .map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
