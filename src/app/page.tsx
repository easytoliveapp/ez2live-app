'use client'

import React, { useState } from "react";

import BottomNavigation from "@/components/atoms/BottomNavigation";

function PageHome() {
  const [itemNav, setItemNav] = useState(0);

  const handleMenuChange = (itemIdx: number) => setItemNav(itemIdx);

  return (
    <div className="nc-PageHome relative overflow-hidden flex flex-col justify-center items-center w-full gap-3 p-5">
      <div>Ez2Live</div>
      <p>Limpamos tudo!!!</p>
      <p>Foco no APP!</p>


      <BottomNavigation
        activeItem={itemNav}
        navItems={[
          { title: 'inicio' },
          { title: 'meus cupons' },
          { title: 'perfil' }
        ]}
        handleMenuChange={handleMenuChange}
        />
    </div>
  );
}

export default PageHome;