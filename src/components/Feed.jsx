import React, { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return <div>Loading...</div>;

  if(feed.length <= 0) return <div className="flex justify-center my-10"><h1 className="font-bold text-xl">No new user found!</h1></div>;
  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <div>No feed data available.</div>
      )}
    </div>
  );
};

export default Feed;
