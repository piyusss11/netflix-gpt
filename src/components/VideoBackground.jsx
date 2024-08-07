import useMovieTrailer from "@/hooks/useMovieTrailer";

import { useSelector } from "react-redux";

const VideoBackground = (props) => {
  const trailerObj = useSelector((store) => store.movies?.trailerVideo);
  const { movieID } = props;
  useMovieTrailer(movieID);
  // console.log(trailerObj?.key);
  
  return (
    <div className="w-full ">
      <iframe
        className="w-full aspect-video "
        src={`https://www.youtube.com/embed/${trailerObj?.key}?&autoplay=1&mute=1&loop=1&controls=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
     </div>
  );
};

export default VideoBackground;
