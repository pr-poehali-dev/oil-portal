import Icon from "@/components/ui/icon";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

// May 2026
const today = { day: 31, month: 4, year: 2026 }; // month 0-indexed
const calDays = [
  // week 1
  { d: null }, { d: null }, { d: null }, { d: null }, { d: null }, { d: 1 }, { d: 2 },
  // week 2
  { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }, { d: 9 },
  // week 3
  { d: 10 }, { d: 11 }, { d: 12 }, { d: 13 }, { d: 14 }, { d: 15 }, { d: 16 },
  // week 4
  { d: 17 }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23 },
  // week 5
  { d: 24 }, { d: 25 }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30 },
  // week 6
  { d: 31 }, { d: null }, { d: null }, { d: null }, { d: null }, { d: null }, { d: null },
];

// shift types: "day" = day shift, "night" = night shift, "off" = off, "vacation" = vacation
const shifts: Record<number, string> = {
  1: "off", 2: "off",
  3: "day", 4: "day", 5: "night", 6: "night", 7: "off", 8: "off",
  9: "off", 10: "day", 11: "day", 12: "night", 13: "night", 14: "off",
  15: "off", 16: "off", 17: "day", 18: "day", 19: "night", 20: "night",
  21: "off", 22: "off", 23: "off", 24: "day", 25: "day", 26: "night",
  27: "night", 28: "off", 29: "off", 30: "off", 31: "day",
};

const shiftConfig: Record<string, { label: string; color: string; dot: string }> = {
  day:   { label: "День",     color: "bg-amber-500/20 text-amber-300 border-amber-500/30",   dot: "bg-amber-400" },
  night: { label: "Ночь",     color: "bg-blue-500/20 text-blue-300 border-blue-500/30",      dot: "bg-blue-400" },
  off:   { label: "Выходной", color: "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-transparent", dot: "bg-[hsl(var(--muted-foreground))]" },
  vacation: { label: "Отпуск", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", dot: "bg-emerald-400" },
};

const events = [
  { date: "31 мая", time: "08:00", title: "Начало смены — объект Б-7", type: "shift", icon: "Flame" },
  { date: "3 июня", time: "08:00", title: "Плановое ТО скважины №14", type: "task", icon: "Wrench" },
  { date: "5 июня", time: "10:00", title: "Инструктаж по охране труда", type: "meeting", icon: "ShieldCheck" },
  { date: "7 июня", time: "14:00", title: "Совещание с руководством", type: "meeting", icon: "Users" },
  { date: "12 июня", time: "—", title: "День России — нерабочий день", type: "holiday", icon: "Star" },
];

const eventColors: Record<string, string> = {
  shift: "text-amber-400",
  task: "text-orange-400",
  meeting: "text-blue-400",
  holiday: "text-emerald-400",
};

export default function Schedule() {
  return (
    <div className="p-6 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[hsl(var(--foreground))] font-golos">Расписание и календарь</h1>
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <Icon name="RefreshCw" size={14} />
          Обновлено сегодня
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Calendar */}
        <div className="lg:col-span-2 card-glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[hsl(var(--foreground))]">Май 2026</h2>
            <div className="flex gap-1">
              <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors text-[hsl(var(--muted-foreground))]">
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors text-[hsl(var(--muted-foreground))]">
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[11px] font-medium text-[hsl(var(--muted-foreground))] py-1 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calDays.map((cell, i) => {
              if (!cell.d) return <div key={i} className="aspect-square" />;
              const shift = shifts[cell.d];
              const isToday = cell.d === today.day;
              const cfg = shift ? shiftConfig[shift] : null;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group relative
                    ${isToday ? "ring-2 ring-[hsl(var(--primary))] bg-[hsl(var(--primary))/0.1]" : "hover:bg-[hsl(var(--muted))]"}
                  `}
                >
                  <span className={`text-sm font-medium ${isToday ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--foreground))]"}`}>
                    {cell.d}
                  </span>
                  {cfg && (
                    <span className={`status-dot mt-1 ${cfg.dot}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[hsl(var(--border))]">
            {Object.entries(shiftConfig).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className={`status-dot ${val.dot}`} />
                <span className="text-xs text-[hsl(var(--muted-foreground))]">{val.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shift summary */}
        <div className="space-y-4">
          <div className="card-glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Текущий месяц</h3>
            <div className="space-y-3">
              {[
                { label: "Рабочих дней", value: "16", icon: "Briefcase", color: "text-amber-400" },
                { label: "Дневных смен", value: "8", icon: "Sun", color: "text-amber-300" },
                { label: "Ночных смен", value: "8", icon: "Moon", color: "text-blue-400" },
                { label: "Выходных", value: "15", icon: "Coffee", color: "text-emerald-400" },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3">
                  <Icon name={row.icon} size={16} className={row.color} />
                  <span className="text-sm text-[hsl(var(--muted-foreground))] flex-1">{row.label}</span>
                  <span className="text-sm font-bold text-[hsl(var(--foreground))]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next shift */}
          <div className="card-glass rounded-2xl p-5 border amber-border">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Clock" size={15} className="text-[hsl(var(--primary))]" />
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Следующая смена</h3>
            </div>
            <div className="text-2xl font-bold text-[hsl(var(--primary))] font-golos">3 июня</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Дневная · 08:00 – 20:00</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Объект Б-7, Нижневартовск</div>
          </div>
        </div>
      </div>

      {/* Upcoming events */}
      <div className="card-glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="CalendarClock" size={17} className="text-[hsl(var(--primary))]" />
          <h2 className="font-semibold text-[hsl(var(--foreground))]">Предстоящие события</h2>
        </div>
        <div className="space-y-2">
          {events.map((ev, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))] transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[hsl(var(--card))] flex items-center justify-center flex-shrink-0">
                <Icon name={ev.icon} size={16} className={eventColors[ev.type]} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[hsl(var(--foreground))]">{ev.title}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-medium text-[hsl(var(--foreground))]">{ev.date}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">{ev.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
