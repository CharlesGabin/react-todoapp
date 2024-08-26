import * as LucideIcons from "lucide-react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItems } from "../../lib/utils";

const MenuItemsList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuNavigation = (linkValue: string, label: string) => {
    navigate(linkValue, { state: { label } });
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {Object.values(MenuItems).map((itemMenu) => {
        const IconComponent =
          LucideIcons[itemMenu.icon as keyof typeof LucideIcons];
        return (
          <button
            className={clsx(
              "flex gap-2 items-center px-4 py-2 w-full text-sm font-normal text-left rounded-lg font-poppins hover:bg-blue-200",
              {
                "bg-blue-300 shadow-lg": location.pathname === itemMenu.link,
              },
            )}
            key={itemMenu.id}
            onClick={() => handleMenuNavigation(itemMenu.link, itemMenu.label)}
          >
            <IconComponent strokeWidth={1} size={20} />
            {itemMenu.label}
          </button>
        );
      })}
    </div>
  );
};

export default MenuItemsList;
