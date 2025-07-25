import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center text-2xl my-10">
        No Connections Found!
      </h1>
    );

  return (
    <div className="max-w-2xl mx-auto my-10">
      <h1 className="font-bold text-3xl mb-6 text-center">
        Connections
      </h1>
      <div className="flex flex-col gap-4">
        {connections.map((connection, idx) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={idx}
              className="flex items-start bg-base-300 rounded-xl shadow p-4 relative"
            >
              <div className="avatar mr-4">
                <div className="w-16 h-16 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
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

              {idx !== connections.length - 1 && (
                <div className="absolute left-0 right-0 bottom-[-16px] h-px bg-base-300 mx-4" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
