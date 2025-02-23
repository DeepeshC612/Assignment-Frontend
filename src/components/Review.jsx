import React, { useState } from "react";
import profile from "../assets/profile.png";
import { FaHeart, FaRegHeart, FaRegThumbsUp, FaStar, FaThumbsUp } from "react-icons/fa";
import dayjs from "dayjs";

const Review = ({ review, likeApiCall }) => {
  const [menu, setMenu] = useState(true);
  const [rate, setRate] = useState(review.rating);
  const [liked, setLiked] = useState(review?.likes?.length && review?.likes[0]?.value === 1 ? true : false); 

  const handleLike = async () => {
    setLiked(!liked); 
    await likeApiCall(review?._id, liked ? 0 : 1);
  };

  const StarRating = () => {
    return (
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <label key={idx}>
              <input
                type="radio"
                className="hidden"
                name="rating"
                // onChange={() => setRate(idx)}
                // value={rate}
                // checked={idx === rate}
              />
              <FaStar
                className="text-xl"
                color={idx < rate ? "#fea904" : "#bbb"}
              />
            </label>
          ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-b-md px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center border-b">
      <div className="flex flex-col justify-start items-start w-full">
        <div className="flex justify-start items-start"></div>
        <div className="w-full flex justify-start items-start flex-col p-8">
          <div className="mt-3 flex justify-start items-center flex-row space-x-2.5">
            <div>
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  review.userId.profilePic === undefined
                    ? profile
                    : `http://${review.userId.profilePic}`
                }
                alt="avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-base font-medium leading-none text-gray-800">
                {review.userId.userName}
              </p>
              <p className="text-sm leading-none text-gray-600">
                {dayjs(review.createdAt).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
          <div className="flex md:flex-row justify-between w-full">
            <p></p>
            <div className="cursor-pointer">
              <StarRating />
            </div>
          </div>
          <div className={"md:block " + (menu ? "block" : "hidden")}>
            <p className="mt-2 text-base leading-normal text-gray-600 w-full ">
              {review.review}
            </p>
            <div className="mt-2">
              <button onClick={handleLike}>
                {liked ? (
                  <FaHeart className="text-xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-xl text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
