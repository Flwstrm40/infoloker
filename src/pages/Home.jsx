/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { CardsDefault } from "../components/CardsDefault";
import { jobs } from "../jobData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { CardList } from "../components/CardList";
import { Pagination } from "../components/Pagination";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const [jobs1, setJobs1] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState(0); 
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  useEffect(() => {
    // Send the "page" parameter as a query parameter
    setIsLoading(true);
    axios
      .get("http://auth-server-sigma.vercel.app/jobs/get", {
        params: {
          page: currentPage,
        }
      })
      .then((result) => {
        setJobs1(result.data.jobs);
        setMatchedJobs(result.data.count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setIsLoading(false);
      });
  }, [currentPage]);
  console.log(isLoading);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = jobs1;
  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari Nama Loker"
            className="border border-gray-300 rounded-md w-full h-10 pl-10 pr-4 mt-7 inline-block"
          />
        </div>
        <div className="mx-auto max-w-screen-xl">
          <table className="w-full">
            <tr>
              <td className="text-center">
                <div className="mt-3 flex items-center">
                  <Button className="z-10">
                    <FontAwesomeIcon icon={faUser} />
                  </Button>
                  <input
                    type="number"
                    placeholder="Usia Minimum"
                    className="border border-gray-300 rounded-md h-10 pl-10 pr-4 ml-[-13px]"
                  />
                </div>
                <div className="mt-2 flex items-center">
                  <Button className="z-10">
                    <FontAwesomeIcon icon={faUser} />
                  </Button>
                  <input
                    type="number"
                    placeholder="Usia Maksimum"
                    className="border border-gray-300 rounded-md h-10 pl-10 pr-4 ml-[-13px]"
                  />
                </div>
              </td>
              <td className="text-center">
                <div className="mt-3 flex items-center">
                  <Button className="z-10">RP</Button>
                  <input
                    type="number"
                    placeholder="Gaji Minimum"
                    className="border border-gray-300 rounded-md h-10 pl-10 pr-4 ml-[-13px]"
                  />
                </div>
                <div className="mt-2 flex items-center">
                  <Button className="z-10">RP</Button>
                  <input
                    type="number"
                    placeholder="Gaji Maksimum"
                    className="border border-gray-300 rounded-md h-10 pl-10 pr-4 ml-[-13px]"
                  />
                </div>
              </td>
              <td className="text-center">
                <div className="mt-3 flex items-center">
                  <Button className="z-10">
                    <FontAwesomeIcon icon={faUser} />
                  </Button>
                  <select
                    className="border border-gray-300 rounded-md h-10 pl-2 pr-4 ml-[-13px] text-center"
                    placeholder="Pendidikan Minimum"
                  >
                    <option value="">-- Pendidikan Minimum --</option>
                    <option value="SMA">SMA</option>
                    <option value="SMK">SMK</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                  </select>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div>
          {isLoading ? (
            <div className="mx-auto flex items-center justify-center">
            <Spinner /> 
            </div> // Check loading state
          ) : (
            <>
              <CardList page={currentPosts} />
            </>
          )}
              <div className="mx-auto max-w-screen-xl px-80 my-8 flex justify-center">
                <Pagination
                  totalPosts={matchedJobs}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
        </div>
      </div>
    </>
  );
}
