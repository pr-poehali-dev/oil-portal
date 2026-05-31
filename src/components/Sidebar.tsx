import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Главная", icon: "LayoutDashboard" },
  { id: "profile", label: "Профиль", icon: "UserCircle" },
  { id: "schedule", label: "Расписание", icon: "CalendarDays" },
  { id: "documents", label: "Документы", icon: "FolderOpen" },
];

const bottomItems = [
  { id: "settings", label: "Настройки", icon: "Settings" },
  { id: "support", label: "Поддержка", icon: "LifeBuoy" },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-screen bg-[hsl(var(--sidebar-background))] border-r border-[hsl(var(--sidebar-border))] transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[240px]"} flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[hsl(var(--sidebar-border))]">
        <div className="w-9 h-9 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center flex-shrink-0 amber-glow">
          <Icon name="Flame" size={18} className="text-[hsl(var(--primary-foreground))]" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-golos font-bold text-sm text-[hsl(var(--foreground))] leading-tight whitespace-nowrap">
              НефтьКорп
            </div>
            <div className="text-[10px] text-[hsl(var(--muted-foreground))] whitespace-nowrap font-mono tracking-wider uppercase">
              Корпоративный портал
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`ml-auto p-1.5 rounded-md hover:bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors ${collapsed ? "mx-auto ml-0" : ""}`}
        >
          <Icon name={collapsed ? "PanelLeftOpen" : "PanelLeftClose"} size={16} />
        </button>
      </div>

      {/* User mini-card */}
      {!collapsed && (
        <div className="mx-3 mt-4 p-3 rounded-xl bg-[hsl(var(--sidebar-accent))] border border-[hsl(var(--sidebar-border))] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            АИ
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">Александр Иванов</div>
            <div className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">Инженер 1-го разряда</div>
          </div>
          <div className="ml-auto flex-shrink-0">
            <span className="status-dot bg-emerald-400 pulse-amber" />
          </div>
        </div>
      )}
      {collapsed && (
        <div className="mx-auto mt-4 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white">
          АИ
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 mt-5 space-y-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                isActive
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] amber-glow"
                  : "text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--foreground))]"
              }`}
            >
              <Icon
                name={item.icon}
                size={18}
                className={`flex-shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`}
              />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{item.label}</span>
              )}
              {!collapsed && isActive && (
                <Icon name="ChevronRight" size={14} className="ml-auto opacity-60" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="px-2 pb-4 space-y-1 border-t border-[hsl(var(--sidebar-border))] pt-3 mt-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <Icon name={item.icon} size={17} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
}
