import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(_id));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center text-2xl my-10">No Requests Found!</h1>
    );
  return (
    <div className="max-w-2xl mx-auto my-10 ">
      <h1 className="font-bold text-3xl mb-6 text-center">Pending Requests</h1>
      <div className="flex flex-col gap-4 ">
        {requests.map((request, idx) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={idx}
              className="flex bg-base-300 rounded-xl shadow p-4 relative items-center justify-between"
            >
              <div className="avatar mr-4">
                <div className="w-16 h-16 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img src={photoUrl} alt="profile photo" />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg leading-tight">
                  {firstName + " " + lastName}
                </div>
                <div className="uppercase text-xs text-gray-400 font-semibold mb-1 tracking-wider">
                  {age && gender
                    ? `${age} • ${gender.toUpperCase()}`
                    : gender
                    ? gender.toUpperCase()
                    : age
                    ? age
                    : null}
                </div>
                <div className="text-sm text-left text-gray-300 mb-2">
                  {about}
                </div>
              </div>

              {idx !== request.length - 1 && (
                <div className="absolute left-0 right-0 bottom-[-16px] h-px bg-base-300 mx-4" />
              )}
              <div>
                <button className="btn btn-primary mx-5" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
                <button className="btn btn-secondary" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
