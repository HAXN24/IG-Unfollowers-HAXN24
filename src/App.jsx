import React, { useState, useEffect } from "react";

function App() {
  const [followersArray, setFollowersArray] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);

  // Function to handle file upload and set state
  const handleUploadFollowers = (event, setArray) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const parsedJson = JSON.parse(content);
          const newArray = parsedJson.map(
            (item) => item.string_list_data[0]?.value,
          );
          setArray(newArray);
        } catch (error) {
          console.error("Invalid JSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadFollowing = (event, setArray) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const parsedJson = JSON.parse(content);
          const newArray = parsedJson.relationships_following.map(
            (item) => item.string_list_data[0]?.value,
          );
          setArray(newArray);
        } catch (error) {
          console.error("Invalid JSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-full flex items-center justify-evenly md:w-1/2 md:gap-x-3">
          <div className="text-center">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Upload "followers_1" file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept=".json"
              onChange={(e) => handleUploadFollowers(e, setFollowersArray)}
              placeholder="Upload Followers JSON"
            />
          </div>
          <div className="text-center">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Upload "following" file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              accept=".json"
              onChange={(e) => handleUploadFollowing(e, setFollowingArray)}
              placeholder="Upload Following JSON"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <NotFollowing followers={followersArray} following={followingArray} />
        </div>
        <div className="flex gap-x-5">
          <Followers followers={followersArray} />
          <Following following={followingArray} />
        </div>
      </div>
    </>
  );
}

function Followers({ followers }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-y-5">
        <span className="text-lg col-span-3 text-center"> Followers:</span>
        {followers.map((value, index) => (
          <li className="text-lg p-3 bg-green-100" key={index}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Following({ following }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-y-5">
        <span className="text-lg col-span-3 text-center"> Following:</span>
        {following.map((value, index) => (
          <li className="text-lg p-3 bg-green-100" key={index}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotFollowing({ followers, following }) {
  // Create new Sets from followers array
  const followersSet = new Set(followers);

  // Filter out items in 'following' that are not in 'followers'
  const uniqueFollowing = following.filter(
    (follower) => !followersSet.has(follower),
  );

  return (
    <ul className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-3 w-full">
      <span className="text-xl font-bold col-span-full text-center md:col-span-1 lg:col-span-2 xl:col-span-3">
        Not Following You Back:
      </span>
      {uniqueFollowing.map((value, index) => (
        <li
          className="flex flex-col text-xl p-5 text-center border-2 bg-blue-300 gap-y-2 w-full"
          key={index}
        >
          {value}
          <a
            href={`https://www.instagram.com/${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-lg bg-blue-100 text-sm"
          >
            Click for Profile
          </a>
        </li>
      ))}
    </ul>
  );
}

export default App;
