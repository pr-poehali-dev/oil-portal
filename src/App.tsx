import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Schedule from "@/pages/Schedule";
import Documents from "@/pages/Documents";
import Icon from "@/components/ui/icon";

const pageTitles: Record<string, string> = {
  dashboard: "Главная",
  profile: "Профиль сотрудника",
  schedule: "Расписание и календарь",
  documents: "Хранилище документов",
  settings: "Настройки",
  support: "Поддержка",
};

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--muted))] flex items-center justify-center mb-4">
        <Icon name="Construction" size={28} className="text-[hsl(var(--primary))]" />
      </div>
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))] font-golos">{title}</h2>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 max-w-xs">
        Этот раздел находится в разработке. Напишите, что должно здесь отображаться.
      </p>
    </div>
  );
}

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":  return <Dashboard />;
      case "profile":    return <Profile />;
      case "schedule":   return <Schedule />;
      case "documents":  return <Documents />;
      default:           return <PlaceholderPage title={pageTitles[activePage] ?? activePage} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex h-screen overflow-hidden bg-[hsl(var(--background))]">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <header className="flex items-center justify-between px-6 py-3.5 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/0.8] backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
              <Icon name="ChevronRight" size={14} />
              <span className="text-[hsl(var(--foreground))] font-medium">{pageTitles[activePage] ?? activePage}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                <Icon name="Bell" size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(var(--primary))] rounded-full" />
              </button>
              <button className="p-2 rounded-xl hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                <Icon name="Search" size={18} />
              </button>
              <div className="w-px h-5 bg-[hsl(var(--border))] mx-1" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[hsl(var(--muted))] cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-[10px] font-bold text-white">
                  АИ
                </div>
                <span className="text-sm text-[hsl(var(--foreground))]">А. Иванов</span>
                <Icon name="ChevronDown" size={14} className="text-[hsl(var(--muted-foreground))]" />
              </div>
            </div>
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default App;
