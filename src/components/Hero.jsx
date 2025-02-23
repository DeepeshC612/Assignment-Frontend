import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import {
  AiOutlineSearch,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import AddCompany from "./AddCompany";
import Load from "./Loading";
import { fetchCompany } from "../services/apiService";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa";
import CompanyListCard from "./CompanyListCard";

function Hero() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const { data } = await fetchCompany(sort, search);
      setData(data.result.companies);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const ascending = () => {
    setSort("asc");
  };

  const descending = () => {
    setSort("desc");
  };

  useEffect(() => {
    fetchCompanies();
  }, [sort]);

  useEffect(() => {
    if (search.trim() === "") fetchCompanies();
  }, [search]);

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <div className="bg-gray-100/50">
          {/* <Navbar /> */}
          <div className="p-10 flex items-center justify-center ">
            <AddCompany
              listApiCall={fetchCompanies}
              open={open}
              setOpen={setOpen}
              fetchCompanies={fetchCompanies}
            />
            <div className="">
              <p className="mb-1 text-sm text-gray-600 ml-1">Search Company</p>
              <div className="flex mb-10 justify-between items-center gap-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ...."
                  type="text"
                  className="border border-gray-300 outline-none p-1 rounded-md px-10 max-sm:px-2 relative"
                />
                <AiOutlineSearch className="text-2xl cursor-pointer absolute ml-2 max-sm:hidden" />

                <div>
                  <button
                    onClick={() => fetchCompanies()}
                    className=" hidden md:flex max-sm:ml-10 md:mr-80 max-sm:text-sm max-sm:font-normal p-1 px-4 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Find Company
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="md:ml-5 max-sm:text-sm max-sm:font-normal p-1 px-4 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    + Add Company
                  </button>
                </div>
                <div>
                  {sort == "desc" ? (
                    <AiOutlineSortAscending
                      onClick={ascending}
                      className="text-2xl cursor-pointer active:text-gray-600"
                    />
                  ) : (
                    <AiOutlineSortDescending
                      onClick={descending}
                      className="text-2xl cursor-pointer active:text-gray-600"
                    />
                  )}
                </div>
              </div>
              <ul role="list" className="space-y-6 h-screen">
                {data ? (
                  data?.map((company) => (
                    <CompanyListCard company={company} />
                  ))
                ) : (
                  <p className="text-center ">No Company Found</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Hero;
