import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content"
import axios from "axios";
import { Link } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);
 
  const formattedCategoryName = category.replaceAll('_', ' ')[0].toUpperCase() + category.replaceAll('_', ' ').slice(1);
  // (other options) const formattedCategoryName = category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  // const formattedCategoryName = category === "trending" ? "Trending" : category === "top_rated" ? "Top Rated" : category === "upcoming" ? "Upcoming" : category === "now_playing" ? "Now Playing" : category === "popular" ? "Popular" : category === "on_the_air" ? "On The Air" : category === "airing_today" ? "Airing Today" : category;
  // const formattedCategoryName = (() => {
  //   switch (category) {
  //     case "trending":   return "Trending";
  //     case "top_rated":  return "Top Rated";
  //     case "upcoming":   return "Upcoming";
  //     case "now_playing":return "Now Playing";
  //     case "popular":    return "Popular";
  //     case "on_the_air": return "On The Air";
  //     case "airing_today": return "Airing Today";
  //     default:           return category;
  //   }
  // })();
  const formattedContentType = contentType ===  "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      const response = await axios.get(`/api/v1/${contentType}/${category}`);
      // console.log(response.data.content);
      setContent(response.data.content);
    }
    getContent();
  }, [category, contentType]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  }
  return (
		<div
			className="bg-black text-white relative px-5 md:px-20"
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item) => (
          <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
            <div className="rounded-lg overflow-hidden">
              <img src={SMALL_IMAGE_BASE_URL + item.backdrop_path} alt="Movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">
              {item.title || item.name}
            </p>
          </Link>
        ))}

      </div>

			{showArrows && (
				<>
					<button
						className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>
					<button
						className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
    </div>
  )
}

export default MovieSlider