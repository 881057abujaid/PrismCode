import { NavLink } from "react-router-dom";

const SidebarItem = ({ title, path, icon: Icon }) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 
                ${isActive ? "bg-primary text-white" : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"}
                `
            }>
            <Icon size={20} />
            <span>{title}</span>
        </NavLink>
    );
};

export default SidebarItem;