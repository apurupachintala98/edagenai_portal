// import { useEffect, useState } from "react";

// interface ProjectItem {
//   NAME: string;
//   VALUE: number;
//   STAFF_VP?: string;
//   LLM_PLATFORM?: string;
//   CURRENT_PHASE?: string;
// }

// interface DashboardItem {
//   name: string;
//   value: number;
//   color: string;
// }

// interface FilterItem {
//   label: string;
// }

// interface Filters {
//   managers: FilterItem[];
//   platforms: FilterItem[];
//   phases: FilterItem[];
// }

// interface DashboardData {
//   users: DashboardItem[];
//   costs: DashboardItem[];
// }

// export function useFilteredDashboardData(
//   rawProjects: ProjectItem[],
//   rawDashboard: DashboardData,
//   filters: Filters
// ) {
//   const [progressData, setProgressData] = useState<DashboardItem[]>([]);
//   const [dashboardData, setDashboardData] = useState<DashboardData>({
//     users: [],
//     costs: [],
//   });
//   const [totals, setTotals] = useState({
//     totalProjects: 0,
//     totalUsers: 0,
//     totalCost: 0,
//   });

//   useEffect(() => {
//     const { managers, platforms, phases } = filters;

//     const managerSet = new Set(managers.map((m) => m.label));
//     const platformSet = new Set(platforms.map((p) => p.label));
//     const phaseSet = new Set(phases.map((p) => p.label));

//     const isFilterActive = managers.length || platforms.length || phases.length;

//     const filteredProjects = !isFilterActive
//       ? rawProjects
//       : rawProjects.filter((item) =>
//           (!managerSet.size || managerSet.has(item.STAFF_VP || "")) &&
//           (!platformSet.size || platformSet.has(item.LLM_PLATFORM || "")) &&
//           (!phaseSet.size || phaseSet.has(item.CURRENT_PHASE || ""))
//         );

//     const projectChart = filteredProjects.map((item, index) => ({
//       name: item.NAME,
//       value: Number(item.VALUE) || 0,
//       color:
//         index % 3 === 0
//           ? "hsl(var(--brand-blue))"
//           : index % 3 === 1
//           ? "hsl(var(--brand-teal))"
//           : "hsl(var(--muted-foreground))",
//     }));

//     const totalProjects = projectChart.reduce((acc, item) => acc + item.value, 0);
//     const totalUsers = rawDashboard.users.reduce((acc, item) => acc + item.value, 0);
//     const totalCost = rawDashboard.costs.reduce((acc, item) => acc + item.value, 0);

//     setProgressData(projectChart);
//     setDashboardData(rawDashboard);
//     setTotals({
//       totalProjects,
//       totalUsers,
//       totalCost,
//     });
//   }, [filters, rawProjects, rawDashboard]);

//   return {
//     progressData,
//     dashboardData,
//     totals,
//   };
// }

import { useEffect, useState } from "react";

interface FilterItem {
  label: string;
}
interface Filters {
  managers: FilterItem[];
  platforms: FilterItem[];
  phases: FilterItem[];
}

interface DashboardItem {
  name: string;
  value: number;
  color: string;
  STAFF_VP?: string;
  LLM_PLATFORM?: string;
  CURRENT_PHASE?: string;
}

export function useFilteredDashboardData(
  rawProjects: DashboardItem[],
  rawDashboard: { users: DashboardItem[]; costs: DashboardItem[] },
  filters: Filters
) {
  const [progressData, setProgressData] = useState<DashboardItem[]>([]);
  const [dashboardData, setDashboardData] = useState<{ users: DashboardItem[]; costs: DashboardItem[] }>({
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

    const isFilterActive = managerSet.size || platformSet.size || phaseSet.size;

    const matchesFilter = (item: any) =>
      (!managerSet.size || managerSet.has(item.STAFF_VP || "")) &&
      (!platformSet.size || platformSet.has(item.LLM_PLATFORM || "")) &&
      (!phaseSet.size || phaseSet.has(item.CURRENT_PHASE || ""));

    // Filter Projects
    const filteredProjects = isFilterActive ? rawProjects.filter(matchesFilter) : rawProjects;

    const progress = filteredProjects.map((item, index) => ({
      ...item,
      color:
        index % 3 === 0
          ? "hsl(var(--brand-blue))"
          : index % 3 === 1
          ? "hsl(var(--brand-teal))"
          : "hsl(var(--muted-foreground))",
    }));

    const totalProjects = progress.reduce((acc, item) => acc + (item.value || 0), 0);

    // Filter Users — only if metadata is present
    const shouldFilterUsers = rawDashboard.users.some(
      (u) => "STAFF_VP" in u || "LLM_PLATFORM" in u || "CURRENT_PHASE" in u
    );
    const filteredUsers = isFilterActive && shouldFilterUsers
      ? rawDashboard.users.filter(matchesFilter)
      : rawDashboard.users;
    const totalUsers = filteredUsers.reduce((acc, item) => acc + (item.value || 0), 0);
    const shouldFilterCosts = rawDashboard.costs.some(
      (c) => "STAFF_VP" in c || "LLM_PLATFORM" in c || "CURRENT_PHASE" in c
    );
    const filteredCosts = isFilterActive && shouldFilterCosts
      ? rawDashboard.costs.filter(matchesFilter)
      : rawDashboard.costs;

    const totalCost = filteredCosts.reduce((acc, item) => acc + (item.value || 0), 0);
    setProgressData(progress);
    setDashboardData({ users: filteredUsers, costs: filteredCosts });
    setTotals({ totalProjects, totalUsers, totalCost });
  }, [rawProjects, rawDashboard, filters]);

  return { progressData, dashboardData, totals };
}
