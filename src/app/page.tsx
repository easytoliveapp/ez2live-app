import React from "react";
import UserInfo from "@/components/atoms/UserInfo";

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden flex flex-col justify-center items-center w-full gap-3 p-5">
      <div>Ez2Live</div>
      <p>Limpamos tudo!!!</p>
      <p>Foco no APP!</p>
      <UserInfo />
    </div>
  );
}

export default PageHome;
