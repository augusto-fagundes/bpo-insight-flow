import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Building2, X, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Desempenho por Colaborador",
    icon: Users,
    href: "/colaboradores",
  },
  {
    title: "Rentabilidade por Empresa",
    icon: Building2,
    href: "/empresas",
  },
  {
    title: "KPIs por Funcionários",
    icon: BarChart3,
    href: "/kpis",
  },
  {
    title: "Metas por Funcionário",
    icon: Target,
    href: "/metas",
  },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <span className="text-lg font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};