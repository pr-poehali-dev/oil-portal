import Icon from "@/components/ui/icon";

const skills = ["Бурение", "ТО оборудования", "Охрана труда", "Геологоразведка", "CAD-проектирование"];
const badges = [
  { label: "Лучший работник Q1", icon: "Award", color: "text-amber-400" },
  { label: "5 лет в компании", icon: "Star", color: "text-blue-400" },
  { label: "Без инцидентов 2 года", icon: "ShieldCheck", color: "text-emerald-400" },
];

const info = [
  { label: "Табельный номер", value: "ТН-14872" },
  { label: "Подразделение", value: "Отдел добычи, Куст №7" },
  { label: "Должность", value: "Инженер-технолог 1-го разряда" },
  { label: "Дата приёма", value: "14 марта 2019" },
  { label: "Объект", value: "Нижневартовск, Б-7" },
  { label: "Руководитель", value: "Петров С.В." },
];

const docs = [
  { name: "Трудовой договор", date: "14.03.2019", icon: "FileText" },
  { name: "Удостоверение по ТБ", date: "Действ. до 01.2027", icon: "ShieldCheck" },
  { name: "Медкнижка", date: "Действ. до 06.2026", icon: "Stethoscope" },
  { name: "Пропуск", date: "Выдан 15.01.2026", icon: "CreditCard" },
];

export default function Profile() {
  return (
    <div className="p-6 space-y-5 animate-fade-in max-w-5xl">
      {/* Header card */}
      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-amber-600/30 via-orange-700/20 to-transparent relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, hsl(35 95% 55% / 0.1) 20px, hsl(35 95% 55% / 0.1) 21px)" }}
          />
        </div>
        <div className="px-6 pb-6 -mt-10 flex items-end gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white border-4 border-[hsl(var(--card))] flex-shrink-0 shadow-xl">
            АИ
          </div>
          <div className="pb-1">
            <h2 className="text-xl font-bold text-[hsl(var(--foreground))] font-golos">Иванов Александр Николаевич</h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">Инженер-технолог 1-го разряда · Отдел добычи</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <span className="status-dot bg-emerald-400" /> На рабочем месте
              </span>
              <span className="text-[hsl(var(--border))]">·</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Смена: 08:00 – 20:00</span>
            </div>
          </div>
          <button className="ml-auto mb-1 flex items-center gap-2 px-4 py-2 rounded-xl border border-[hsl(var(--border))] text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))] transition-all">
            <Icon name="Pencil" size={14} />
            Редактировать
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Info */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card-glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Сведения о сотруднике</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {info.map((row) => (
                <div key={row.label} className="p-3 rounded-xl bg-[hsl(var(--muted))]">
                  <div className="text-[11px] text-[hsl(var(--muted-foreground))] uppercase tracking-wide">{row.label}</div>
                  <div className="text-sm font-medium text-[hsl(var(--foreground))] mt-0.5">{row.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="card-glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Личные документы</h3>
            <div className="space-y-2">
              {docs.map((doc) => (
                <div key={doc.name} className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))] transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))/0.15] flex items-center justify-center flex-shrink-0">
                    <Icon name={doc.icon} size={15} className="text-[hsl(var(--primary))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[hsl(var(--foreground))]">{doc.name}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{doc.date}</div>
                  </div>
                  <Icon name="Download" size={15} className="text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Skills */}
          <div className="card-glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Компетенции</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-[hsl(var(--muted))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="card-glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Достижения</h3>
            <div className="space-y-2.5">
              {badges.map((b) => (
                <div key={b.label} className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(var(--muted))]">
                  <Icon name={b.icon} size={18} className={b.color} />
                  <span className="text-sm text-[hsl(var(--foreground))]">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="card-glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-4">Контакты</h3>
            <div className="space-y-2.5">
              {[
                { icon: "Phone", value: "+7 (912) 345-67-89", label: "Рабочий" },
                { icon: "Mail", value: "a.ivanov@neftcorp.ru", label: "Email" },
                { icon: "Building2", value: "Кабинет 214", label: "Офис" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <Icon name={c.icon} size={15} className="text-[hsl(var(--primary))] flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{c.label}</div>
                    <div className="text-sm text-[hsl(var(--foreground))]">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
