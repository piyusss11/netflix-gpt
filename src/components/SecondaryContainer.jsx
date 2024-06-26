import MovieLineSHadcn from "./MovieLineSHadcn";
// import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import MovieLineVideo from "./MovieLineVideo";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);
  return (
    movies && (
      <div className="bg-black z-40 ">
        <div className="-mt-56 z-80 relative">
          <MovieLineSHadcn
            title={"Now Playing"}
            list={movies?.nowPlayingMovies}
          />
          <MovieLineVideo
            title={"Popular Movies"}
            list={movies?.popularMovies}
          />
          <MovieLineVideo title={"Top Rated"} list={movies?.topRatedMovies} />
          <MovieLineVideo
            title={"Upcoming Movies"}
            list={movies?.upcomingMovies}
          />
          <MovieLineVideo
            title={"Popular TV Series"}
            list={movies?.popularTvSeries}
          />
          {/* <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} /> */}
          {/* <MovieList title={"Popular Movies"} movies={movies?.popularMovies} /> */}
          {/* <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} /> */}
          {/* <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} /> */}
          {/* <MovieList
            title={"Popular TV Series"}
            movies={movies?.popularTvSeries}
          /> */}
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
