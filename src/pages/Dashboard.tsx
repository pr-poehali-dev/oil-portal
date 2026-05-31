import Icon from "@/components/ui/icon";

const stats = [
  { label: "Добыча нефти", value: "12 840", unit: "т/сут", change: "+2.4%", up: true, icon: "Droplets", color: "from-amber-500/20 to-orange-600/10" },
  { label: "Работники на смене", value: "347", unit: "чел.", change: "–5", up: false, icon: "Users", color: "from-blue-500/20 to-blue-600/10" },
  { label: "Давление в трубопроводе", value: "68.4", unit: "атм", change: "Норма", up: true, icon: "Gauge", color: "from-emerald-500/20 to-emerald-600/10" },
  { label: "Инциденты за месяц", value: "2", unit: "события", change: "–3 vs прошлый", up: true, icon: "ShieldCheck", color: "from-purple-500/20 to-purple-600/10" },
];

const notifications = [
  { id: 1, type: "alert", text: "Плановое ТО скважины №14 — через 3 дня", time: "2ч назад", icon: "AlertTriangle", color: "text-amber-400" },
  { id: 2, type: "info", text: "Обновлена инструкция по ПБ-2024", time: "5ч назад", icon: "FileText", color: "text-blue-400" },
  { id: 3, type: "success", text: "Отчёт за май сдан и принят", time: "Вчера", icon: "CheckCircle", color: "text-emerald-400" },
  { id: 4, type: "info", text: "Новое совещание в 14:00 — Зал А", time: "Вчера", icon: "Calendar", color: "text-blue-400" },
];

const tasks = [
  { id: 1, text: "Подписать акт приёмки оборудования", done: false, priority: "high" },
  { id: 2, text: "Пройти инструктаж по ТБ (до 5 июня)", done: false, priority: "urgent" },
  { id: 3, text: "Сдать отчёт по объекту Б-7", done: true, priority: "normal" },
  { id: 4, text: "Обновить пропуск сотрудника", done: false, priority: "normal" },
];

const news = [
  { id: 1, title: "Запуск нового месторождения в Ямало-Ненецком АО", date: "29 мая", category: "Производство" },
  { id: 2, title: "Программа корпоративного обучения 2026: запись открыта", date: "27 мая", category: "HR" },
  { id: 3, title: "Итоги квартала: план перевыполнен на 7%", date: "24 мая", category: "Финансы" },
];

const priorityColors: Record<string, string> = {
  urgent: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  normal: "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-transparent",
};
const priorityLabels: Record<string, string> = {
  urgent: "Срочно",
  high: "Важно",
  normal: "",
};

export default function Dashboard() {
  const today = new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] font-golos">
            Добро пожаловать, Александр
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5 capitalize">{today}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
          <span className="status-dot bg-emerald-400 pulse-amber" />
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Объект: <span className="text-[hsl(var(--foreground))] font-medium">Б-7 / Нижневартовск</span></span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`card-glass rounded-2xl p-4 hover-lift noise-bg`}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <Icon name={s.icon} size={18} className="text-[hsl(var(--foreground))]" />
            </div>
            <div className="text-xl font-bold font-golos text-[hsl(var(--foreground))]">
              {s.value} <span className="text-xs font-normal text-[hsl(var(--muted-foreground))]">{s.unit}</span>
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{s.label}</div>
            <div className={`text-xs mt-2 font-medium ${s.up ? "text-emerald-400" : "text-red-400"}`}>
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Notifications */}
        <div className="lg:col-span-2 card-glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Bell" size={17} className="text-[hsl(var(--primary))]" />
              <h2 className="font-semibold text-[hsl(var(--foreground))]">Уведомления</h2>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-medium">4 новых</span>
          </div>
          <div className="space-y-2.5">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-[hsl(var(--muted))] hover:bg-[hsl(var(--surface-raised))] transition-colors cursor-pointer group">
                <Icon name={n.icon} size={16} className={`${n.color} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[hsl(var(--foreground))] leading-snug">{n.text}</p>
                </div>
                <span className="text-[11px] text-[hsl(var(--muted-foreground))] flex-shrink-0 whitespace-nowrap">{n.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="card-glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="ListTodo" size={17} className="text-[hsl(var(--primary))]" />
              <h2 className="font-semibold text-[hsl(var(--foreground))]">Задачи</h2>
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{tasks.filter(t => !t.done).length} открыто</span>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${task.done ? "opacity-50" : "bg-[hsl(var(--muted))]"}`}>
                <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border ${task.done ? "bg-emerald-500/30 border-emerald-500/50" : "border-[hsl(var(--border))]"}`}>
                  {task.done && <Icon name="Check" size={11} className="text-emerald-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${task.done ? "line-through text-[hsl(var(--muted-foreground))]" : "text-[hsl(var(--foreground))]"}`}>
                    {task.text}
                  </p>
                  {priorityLabels[task.priority] && (
                    <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded border mt-1 ${priorityColors[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News */}
      <div className="card-glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Newspaper" size={17} className="text-[hsl(var(--primary))]" />
          <h2 className="font-semibold text-[hsl(var(--foreground))]">Новости компании</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {news.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-[hsl(var(--muted))] hover-lift cursor-pointer group">
              <span className="text-[10px] uppercase tracking-wider font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary))/0.1] px-2 py-0.5 rounded-full">
                {item.category}
              </span>
              <p className="text-sm text-[hsl(var(--foreground))] font-medium mt-2 leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">
                {item.title}
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
