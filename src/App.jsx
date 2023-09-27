import React, { useState, useEffect } from "react";
import followers from "../dist/followers_1.json";
import following from "../dist/following.json";

function App() {
  const [followersArray, setFollowersArray] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);

  useEffect(() => {
    const newFollowersArray = followers.map(
      (item) => item.string_list_data[0]?.value,
    );
    const newFollowingArray = following.relationships_following.map(
      (item) => item.string_list_data[0]?.value,
    );

    setFollowersArray(newFollowersArray);
    setFollowingArray(newFollowingArray);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
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
    <ul className="grid-custom gap-3">
      <span className="text-xl text-bold col-span-12 text-center">
        Not Following You Back:
      </span>
      {uniqueFollowing.map((value, index) => (
        <li
          className="flex flex-col text-xl p-3 text-center border-2 bg-blue-300 gap-y-2"
          key={index}
        >
          {value}
          <a
            href={`https://www.instagram.com/${value}`}
            target="_blank"
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
