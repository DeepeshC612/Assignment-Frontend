import dayjs from "dayjs";
import React from "react";
import { FaStar } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";

const CompanyListCard = ({ company }) => {
  const StarRating = (rate) => {
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
    <div key={company._id}>
      <Link to={`/companyreview/${company._id}`}>
        <li className="flex w-[60rem] max-sm:w-[23rem] justify-between items-start py-10 shadow-lg p-10 max-sm:p-2 rounded-md bg-white">
          <div className="mr-10 h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
            <img
              src={`http://${company?.companyPic}`}
              // alt={product.imageAlt}
              className="h-full w-full object-cover object-center rounded-md"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a>{company.companyName}</a>
                </h3>
                <p className="text-sm text-gray-500">
                  Founded On : {dayjs(company?.foundedOn).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <GoLocation />
                <p className="">{company.companyLocation}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex flex-1 gap-4 text-sm">
                <p className="text-gray-500">City : {company.companyCity}</p>

                <div className="flex gap-2">
                  {StarRating(Math.floor(company?.averageRating))}
                  <p className="text-gray-800 hover:text-gray-700">
                    {company?.reviewCount} Review
                  </p>
                </div>
              </div>
              <button className="p-1 px-4 rounded-md text-white font-semibold bg-gray-500 hover:bg-gray-600">
                Detail Review
              </button>
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default CompanyListCard;
