import { useEffect, useState } from "react";

interface ProjectItem {
  NAME: string;
  VALUE: number;
  STAFF_VP?: string;
  LLM_PLATFORM?: string;
  CURRENT_PHASE?: string;
}

interface DashboardItem {
  name: string;
  value: number;
  color: string;
}

interface FilterItem {
  label: string;
}

interface Filters {
  managers: FilterItem[];
  platforms: FilterItem[];
  phases: FilterItem[];
}

interface DashboardData {
  users: DashboardItem[];
  costs: DashboardItem[];
}

export function useFilteredDashboardData(
  rawProjects: ProjectItem[],
  rawDashboard: DashboardData,
  filters: Filters
) {
  const [progressData, setProgressData] = useState<DashboardItem[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    users: [],
    costs: [],
  });
  const [totals, setTotals] = useState({
    totalProjects: 0,
    totalUsers: 0,
    totalCost: 0,
  });

  useEffect(() => {
    const { managers, platforms, phases } = filters;

    const managerSet = new Set(managers.map((m) => m.label));
    const platformSet = new Set(platforms.map((p) => p.label));
    const phaseSet = new Set(phases.map((p) => p.label));

    const isFilterActive = managers.length || platforms.length || phases.length;

    const filteredProjects = !isFilterActive
      ? rawProjects
      : rawProjects.filter((item) =>
          (!managerSet.size || managerSet.has(item.STAFF_VP || "")) &&
          (!platformSet.size || platformSet.has(item.LLM_PLATFORM || "")) &&
          (!phaseSet.size || phaseSet.has(item.CURRENT_PHASE || ""))
        );

    const projectChart = filteredProjects.map((item, index) => ({
      name: item.NAME,
      value: Number(item.VALUE) || 0,
      color:
        index % 3 === 0
          ? "hsl(var(--brand-blue))"
          : index % 3 === 1
          ? "hsl(var(--brand-teal))"
          : "hsl(var(--muted-foreground))",
    }));

    const totalProjects = projectChart.reduce((acc, item) => acc + item.value, 0);
    const totalUsers = rawDashboard.users.reduce((acc, item) => acc + item.value, 0);
    const totalCost = rawDashboard.costs.reduce((acc, item) => acc + item.value, 0);

    setProgressData(projectChart);
    setDashboardData(rawDashboard);
    setTotals({
      totalProjects,
      totalUsers,
      totalCost,
    });
  }, [filters, rawProjects, rawDashboard]);

  return {
    progressData,
    dashboardData,
    totals,
  };
}
