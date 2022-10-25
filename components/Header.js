import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  GlobeAltIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setsearchInput] = useState("");

  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [numOfGuests, setnumOfGuests] = useState(2);
  const router = useRouter();
  const handleSelect = (ranges) => {
    setstartDate(ranges.selection.startDate);
    setendDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setsearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid first:grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto"
      >
        <Image
          src="http://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* Middle */}
      <div className="flex items-center py-2 rounded-full p-3 md:border-2 md:shadow-sm">
        <div>
          <input
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            type="text"
            placeholder={placeholder || "Start your search"}
            className="pl-5 bg-transparent outline-none flex-grow text-gray-600 text-sm placeholder-gray-400"
          />
        </div>
        <div>
          <input
            onChange={(e) => setstartDate(e.target.value)}
            placeholder="Check In"
            className="pl-5 bg-transparent outline-none border-l-2 flex-grow text-gray-600 text-sm placeholder-gray-400"
          />
        </div>

        <div className="flex flex-grow items-center justify-between">
          <input
            placeholder="Any guests"
            className=" pl-5 bg-transparent outline-none border-l-2 flex-grow text-gray-600 text-sm placeholder-gray-400"
          />
          <SearchIcon className="hidden md:inline-flex flex flex-grow ml-2 h-8 bg-red-500 text-white rounded-full p-2 cursor-pointer drop-shadow-sm md: mx-1.5" />
        </div>
      </div>
      {/* Right */}
      <div
        className="flex items-center space-x-4 justify-end
      text-gray-500"
      >
        <p className="hidden md:inline cursor-pointer">Become a Host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl pl-2 flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={numOfGuests}
              onChange={(e) => setnumOfGuests(e.target.value)}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg outline-none
            text-red-400"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
