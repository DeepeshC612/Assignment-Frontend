import axios from "axios";
import { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import AddReview from "../components/AddReview";
import Load from "../components/Loading";
import Review from "../components/Review";
import { API_URL } from "../config/config";
import { fetchCompanyDetails, likeCompanyReview } from "../services/apiService";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

function CompanyDetails() {
  const token = localStorage.getItem("user");
  const [open, setOpen] = useState(false);
  const [companyData, setCompanyData] = useState();
  const [reviewData, setReviewData] = useState();
  const [loading, setLoading] = useState(true);
  const [reviewSort, setReviewSort] = useState("asc");
  const navigate = useNavigate();
  const company = useParams();

  const detailApiCall = async () => {
    try {
      const { data } = await fetchCompanyDetails(company.id, reviewSort);
      setCompanyData(data?.result?.company);
      setReviewData(data?.result?.reviews);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    window.scrollTo(0, 0);
  };
  const likeApiCall = async (id, value) => {
    try {
      await likeCompanyReview(id, {value: value});
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    detailApiCall();
  }, [reviewSort]);

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <>
          <div className="bg-gray-50 pb-10 ">
            <div className="flex items-center justify-center mt-10 ">
              <ul role="list" className="space-y-6 w-full px-8">
                <div>
                  <li className="flex justify-between items-start py-6 shadow-lg p-10 max-sm:p-2 bg-white rounded-md w-full">
                    <div className="mr-10 h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                      <img
                        src={`http://${companyData?.companyPic}`}
                        className="h-full w-full object-cover object-center rounded-md"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <p className="text-sm text-gray-500">
                        Founded On :{" "}
                        {dayjs(companyData?.foundedOn).format("DD-MM-YYYY")}
                      </p>
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a>{companyData?.companyName}</a>
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <GoLocation />
                          <p className="">{companyData?.companyLocation}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-4 text-sm">
                        <p className="text-gray-500">
                          City : {companyData?.companyCity}
                        </p>

                        <div className="flex">
                          <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {reviewData?.length} Review
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setOpen(true);
                      }}
                      className="md:ml-5 max-sm:text-sm max-sm:font-normal p-1 px-4 max-sm:px-[2px] rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      + Add Review
                    </button>
                      {reviewSort == "desc" ? (
                        <AiOutlineSortAscending
                          onClick={() => setReviewSort('asc')}
                          className="text-2xl cursor-pointer active:text-gray-600"
                        />
                      ) : (
                        <AiOutlineSortDescending
                          onClick={() => setReviewSort('desc')}
                          className="text-2xl cursor-pointer active:text-gray-600"
                        />
                      )}
                    </div>
                    <AddReview
                      detailApiCall={detailApiCall}
                      setOpen={setOpen}
                      open={open}
                    />
                  </li>
                  <div className="bg-white shadow-xl">
                    <p className="text-xl lg:text-2xl ml-10 pt-4 font-semibold text-gray-800">
                      Reviews
                    </p>

                    {!reviewData?.length ? (
                      <h1 className="text-center p-4 text-gray-700 font-medium">
                        No review available
                      </h1>
                    ) : (
                      reviewData?.map((review) => {
                        return (
                          <div key={review._id}>
                            <Review review={review} likeApiCall={likeApiCall} />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CompanyDetails;
