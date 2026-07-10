import { navigationItems } from "../../constants/navigation";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
    return (
        <aside className="flex h-screen w-[280px] flex-col border-r border-border bg-surface p-6">
            {/* Logo */}
            <div className="mb-10">
                <h1 className="text-2xl font-bold text-primary">PrismCode</h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-2">
                {navigationItems.map((item) => (
                    <SidebarItem key={item.path} {...item} />
                ))}
            </nav>

            {/* User */}
            <div className="rounded-2xl border border-border p-4">
                <h3 className="font-semibold">
                    Abujaid Raja
                </h3>
                <p className="text-sm text-text-secondary">
                    Software Engineer
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;