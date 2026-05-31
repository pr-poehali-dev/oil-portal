import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = [
  { id: "all", label: "Все документы", icon: "FolderOpen" },
  { id: "instructions", label: "Инструкции", icon: "BookOpen" },
  { id: "regulations", label: "Нормативные акты", icon: "Scale" },
  { id: "forms", label: "Бланки и формы", icon: "FileEdit" },
  { id: "safety", label: "Охрана труда", icon: "ShieldCheck" },
  { id: "tech", label: "Технические регламенты", icon: "Cpu" },
];

const docs = [
  { id: 1, title: "Инструкция по охране труда ИОТ-001", category: "instructions", size: "2.4 МБ", date: "15.04.2026", type: "PDF", tag: "Обязательно", tagColor: "text-red-400 bg-red-500/10 border-red-500/20" },
  { id: 2, title: "Правила безопасности при бурении скважин", category: "safety", size: "5.1 МБ", date: "01.03.2026", type: "PDF", tag: "Обновлено", tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: 3, title: "Технический регламент ТР-2024 Оборудование", category: "tech", size: "8.7 МБ", date: "10.01.2026", type: "PDF", tag: null },
  { id: 4, title: "Приказ №142 о режиме рабочего времени", category: "regulations", size: "0.8 МБ", date: "20.02.2026", type: "DOCX", tag: null },
  { id: 5, title: "Форма акта приёмки-передачи оборудования", category: "forms", size: "0.3 МБ", date: "05.05.2026", type: "XLSX", tag: null },
  { id: 6, title: "ГОСТ Р 56775-2015 Нефтегазовые трубопроводы", category: "regulations", size: "12.3 МБ", date: "2015/2026", type: "PDF", tag: null },
  { id: 7, title: "Инструкция по эксплуатации насосных агрегатов", category: "instructions", size: "3.6 МБ", date: "22.03.2026", type: "PDF", tag: "Обновлено", tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: 8, title: "Бланк заявки на ремонт оборудования", category: "forms", size: "0.1 МБ", date: "01.01.2026", type: "DOCX", tag: null },
  { id: 9, title: "Коллективный договор 2025–2027", category: "regulations", size: "1.9 МБ", date: "01.01.2025", type: "PDF", tag: null },
  { id: 10, title: "Инструкция по пожарной безопасности ИПБ-003", category: "safety", size: "1.7 МБ", date: "15.11.2025", type: "PDF", tag: "Обязательно", tagColor: "text-red-400 bg-red-500/10 border-red-500/20" },
];

const typeColors: Record<string, string> = {
  PDF: "bg-red-500/15 text-red-400",
  DOCX: "bg-blue-500/15 text-blue-400",
  XLSX: "bg-emerald-500/15 text-emerald-400",
};

export default function Documents() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = docs.filter((d) => {
    const matchCat = activeCategory === "all" || d.category === activeCategory;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] font-golos">Хранилище документов</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">Инструкции, нормативные акты и регламенты компании</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-medium hover:opacity-90 transition-opacity">
          <Icon name="Upload" size={15} />
          Загрузить
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
        <input
          type="text"
          placeholder="Поиск по документам..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))/0.4] focus:border-[hsl(var(--primary))/0.5] transition-all"
        />
      </div>

      <div className="flex gap-5">
        {/* Sidebar categories */}
        <div className="w-52 flex-shrink-0 space-y-1">
          {categories.map((cat) => {
            const count = cat.id === "all" ? docs.length : docs.filter(d => d.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                  activeCategory === cat.id
                    ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] amber-glow"
                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                <Icon name={cat.icon} size={15} className="flex-shrink-0" />
                <span className="flex-1 truncate">{cat.label}</span>
                <span className={`text-xs rounded-full px-1.5 ${activeCategory === cat.id ? "bg-white/20" : "bg-[hsl(var(--muted))]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Documents list */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="card-glass rounded-2xl p-12 text-center">
              <Icon name="SearchX" size={32} className="text-[hsl(var(--muted-foreground))] mx-auto mb-3" />
              <p className="text-[hsl(var(--muted-foreground))]">Документы не найдены</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((doc, i) => (
                <div
                  key={doc.id}
                  className="card-glass rounded-xl p-4 flex items-center gap-4 hover-lift cursor-pointer group"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--muted))] flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={18} className="text-[hsl(var(--primary))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[hsl(var(--foreground))] truncate group-hover:text-[hsl(var(--primary))] transition-colors">
                        {doc.title}
                      </span>
                      {doc.tag && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${doc.tagColor}`}>
                          {doc.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${typeColors[doc.type] || ""}`}>
                        {doc.type}
                      </span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{doc.size}</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Обновлён: {doc.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                      <Icon name="Eye" size={15} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                      <Icon name="Download" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
