import React, { useCallback } from 'react'

type Props = {
  activeItem: number;
  navItems: Array<any>;
  handleMenuChange: (idx: number) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const BottomNavigation = ({ activeItem, navItems, handleMenuChange }: Props) => {
  const hoverBarLeftPosition = useCallback(() => activeItem > 0 ? 150 * activeItem : 0, [activeItem]);
  
  return (
    <div className="fixed bottom-10 mx-auto flex flex-row justify-center items-center rounded-full bg-primary-ez2live shadow-md z-20">
      <div className="relative">
        {navItems.map((navItem, idx) => (
          <button
            onClick={() => handleMenuChange(idx)}
            key={idx}
            className={classNames(
              'relative w-auto h-full w-[150px] py-5 px-3 cursor-pointer text-center font-medium text-sm rounded-full justify-center transition ease-in-out delay-150 z-20',
              'active:bg-secondary-ez2live active:text-primary-ez2live',
              activeItem === idx ? 'hover:bg-secondary-ez2live text-primary-ez2livet' : ' text-white hover:bg-primary-ez2live_600'
            )}
          >
            {navItem.title}
          </button>
        ))}

        <div className={classNames(
          'absolute top-0 bg-secondary-ez2live w-[150px] text-transparent h-full py-5 px-3 rounded-full z-10 transition ease-in-out delay-150',
          `left-[${hoverBarLeftPosition()}px]`
        )}>{' '}</div>
      </div>
    </div>
  )
}

export default BottomNavigation