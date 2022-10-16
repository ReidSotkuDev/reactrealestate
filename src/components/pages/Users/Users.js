import React from "react";
import "./users.scss";

const Users = () => {
  return (
    <section className="users">
      <div className="users-list">
        <div className="users-list-header flex flex-jc-sb">
          <div>#</div>
          <div>User Id</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Bank Name</div>
        </div>
        <div className="users-list-item flex flex-jc-sb">
          <div>#</div>
          <div>User Id</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Bank Name</div>
        </div>
      </div>
    </section>
  );
};

export default Users;
