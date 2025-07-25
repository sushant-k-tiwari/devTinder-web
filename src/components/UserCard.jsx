import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div>
      <div className="card bg-base-200 w-80 shadow-sm">
        <figure>
          <img src={photoUrl} alt="profile photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {gender && age && <p>{gender.toUpperCase() + ", " + age}</p>}
          <p>{about}</p>
          <div className="card-actions justify-between">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
