export interface TrustBadgeItem {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}

interface TrustBadgesProps {
  stats?: {
    projectsCompleted: number;
    satisfactionRate: number;
    maxFoerderung: number;
  };
  foundedYear?: number;
  items?: TrustBadgeItem[];
}

export function TrustBadges({ stats, foundedYear = 2018, items }: TrustBadgesProps) {
  const yearsFounded = new Date().getFullYear() - foundedYear;
  const projectsCompleted = stats?.projectsCompleted ?? 350;
  const maxFoerderung = stats?.maxFoerderung ?? 70;

  const badges: TrustBadgeItem[] = items ?? [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: `Seit ${foundedYear}`,
      sublabel: `${yearsFounded}+ Jahre Erfahrung`,
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: `${projectsCompleted}+`,
      sublabel: "Projekte realisiert",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      label: "Zertifiziert",
      sublabel: "Qualifizierter Fachbetrieb",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: `Bis ${maxFoerderung}%`,
      sublabel: "Staatliche Förderung",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:divide-x divide-border">
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-3 px-6 lg:px-8 py-3 sm:py-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-primary flex-shrink-0">
            {badge.icon}
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">{badge.label}</span>
            <span className="block text-xs text-muted-foreground">{badge.sublabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
