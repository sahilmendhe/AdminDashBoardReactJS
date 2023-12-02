import React, { useState, useEffect } from "react";

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [amount, setAmount] = useState(null);
  const [selectedOption, setSelectedOption] = useState("no");
  const [bulletsValue, setBulletsValue] = useState(false);
  const [barGraphValues, setBarGraphValues] = useState([]);
  const [category6, setCategory6] = useState(0);
  const [category7, setCategory7] = useState(0);
  const [category8, setCategory8] = useState(0);
  const [category9, setCategory9] = useState(0);
  const [category10, setCategory10] = useState(0);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const handleOptionChange = (value) => {
    if (!bulletsValue) {
      setSelectedOption(value);
      setBulletsValue(value === "yes");
    }
  };

  const handleSave = async () => {
    if (category6 < 99 || category7 < 79 || category8 < 59 || category9 < 39 || category10 < 19) {
      alert('Please ensure that all values are greater than or equal to their respective minimums.');
      return; // Stop the save process if validation fails
    }
    try {
      // API endpoint URL
      const apiUrl = "https://stg.dhunjam.in/account/admin/4";

      // Sending a PUT request to update the values
      const response = await fetch(apiUrl, {
        method: "PUT", // You may need to change this to the appropriate HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: {
            category_6: category6,
            category_7: category7,
            category_8: category8,
            category_9: category9,
            category_10: category10,
          },
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to update values");
      }

      // Log success message if the update was successful
      console.log("Values updated successfully");
      window.location.reload();
    } catch (error) {
      // Log an error message if there was an issue with the update
      console.error("Error updating values:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://stg.dhunjam.in/account/admin/4");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setName(result.data.name);
        setLocation(result.data.location);
        setAmount(result.data.amount);
        setBulletsValue(result.data.charge_customers);
        setBarGraphValues(result.data.amount);
        setSelectedOption(result.data.charge_customers ? "yes" : "no");
        setCategory6(result.data.amount.category_6);
        setCategory7(result.data.amount.category_7);
        setCategory8(result.data.amount.category_8);
        setCategory9(result.data.amount.category_9);
        setCategory10(result.data.amount.category_10);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const barValues = [
    barGraphValues.category_6,
    barGraphValues.category_7,
    barGraphValues.category_8,
    barGraphValues.category_9,
    barGraphValues.category_10,
  ];
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-white`}
    >
      {/* First Section */}
      <div className="text-[16px] px-12 flex flex-col gap-3 mt-12 w-full max-w-2xl">
        <div className="flex items-center justify-center">
          <h1 className="text-bold text-[32px]">
            {name}, {location} on Dhun Jam
          </h1>
        </div>
        <div className="flex items-start gap-2 flex-col sm:flex-row">
          <p className="sm:pr-8 w-1/2">
            Do you want to charge your customers for requesting songs?
          </p>
          <div className="flex mt-2 w-1/2 flex-row justify-center items-center">
            <label className="flex items-center mr-4">
              <input
                checked={selectedOption === "yes"}
                onChange={() => handleOptionChange("yes")}
                type="radio"
                value="yes"
                className="mr-2 rounded-full border-2 border-white w-[20px] h-[20px] p-2 hover:cursor-pointer"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                checked={selectedOption === "no"}
                onChange={() => handleOptionChange("no")}
                type="radio"
                value="no"
                className="mr-2 rounded-full border-2 border-white w-[20px] h-[20px] p-2 hover:cursor-pointer"
              />
              No
            </label>
          </div>
        </div>
        <div className="flex items-start flex-col sm:flex-row">
          <p className="sm:w-1/2 w-full">Custom song request amount-</p>
          <input
            disabled={selectedOption === "no" || !bulletsValue}
            type="text"
            className={`rounded-2xl border-2 border-white bg-black w-1/2 h-10 p-3 focus:outline-none ${selectedOption === "no" || !bulletsValue ? "grayed-out" : ""
              }`}
            value={category6}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setCategory6(isNaN(value) ? "" : value);
            }}
          />
        </div>
        <div className="flex items-start flex-col sm:flex-row">
          <p className="w-1/2 pr-4">
            Regular song request amounts, from high to low-
          </p>
          <div
            className={`flex flex-row gap-3 sm:w-1/2 ${selectedOption === "no" || !bulletsValue ? "grayed-out" : ""
              }`}
          >
            <input
              disabled={selectedOption === "no" || !bulletsValue}
              type="text"
              className="rounded-2xl border-2 border-white bg-black w-full h-10 p-3 focus:outline-none"
              value={category7}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCategory7(isNaN(value) ? "" : value);
              }}
            />
            <input
              disabled={selectedOption === "no" || !bulletsValue}
              type="text"
              className="rounded-2xl border-2 border-white bg-black w-full h-10 p-3 focus:outline-none"
              value={category8}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCategory8(isNaN(value) ? "" : value);
              }}
            />

            <input
              disabled={selectedOption === "no" || !bulletsValue}
              type="text"
              className="rounded-2xl border-2 border-white bg-black w-full h-10 p-3 focus:outline-none"
              value={category9}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCategory9(isNaN(value) ? "" : value);
              }}
            />

            <input
              disabled={selectedOption === "no" || !bulletsValue}
              type="text"
              className="rounded-2xl border-2 border-white bg-black w-full h-10 p-3 focus:outline-none"
              value={category10}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCategory10(isNaN(value) ? "" : value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      {selectedOption !== "no" && bulletsValue && (
        <div className={`flex-row flex gap-2 sm:gap-12  mt-8 sm:mt-16`}>
          <p className="text-white text-5xl">{"\u20B9"}</p>
          <div className="flex items-center h-[30vh] sm:h-[40vh] relative pl-4 sm:pl-16 w-full max-w-2xl">
            <div className="absolute left-0 top-0 h-full border-l-2 border-white"></div>
            <div className="absolute bottom-0 left-0 w-full border-t-2 border-white mt-8"></div>
            {barValues.map((value, index) => (
              <div key={index} className="w-8 h-full sm:w-12 sm:mr-12 relative">
                <div
                  className="absolute bottom-0 bg-[#f0c3f1] rounded-md"
                  style={{ height: `${value / 10}%`, width: "60%" }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedOption !== "no" && bulletsValue && (
        <div className={`flex flex-row gap-20 ml-16`}>
          {barValues.map((value, index) => (
            <p key={index} className="text-white text-center mt-2 text-sm sm:text-lg">
              {value}
            </p>
          ))}
        </div>
      )}


      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`hover:cursor-pointer p-3 bg-[#6741d9] mt-8 w-3/5 lg:w-[38%] rounded-xl mb-4 text-white text-bold -mr-8 text-lg sm:text-xl ${selectedOption === "no" || !bulletsValue ? "grayed-out" : ""
          }`}
      >
        Save
      </button>
    </div>
  );
};
