// import { useState } from "react";

// export type FilterItem = { id: string; label: string };

// export interface Filters {
//   managers: FilterItem[];
//   platforms: FilterItem[];
//   phases: FilterItem[];
// }

// export interface ProgressItem {
//   name: string;
//   value: number;
//   color: string;
// }

// export const useFilteredProgressData = () => {
//   const [progressData, setProgressData] = useState<ProgressItem[]>([]);
//   const [totalProjects, setTotalProjects] = useState(0);

//   const filterAndSetProgressData = (data: any[], filters: Filters) => {
//     const filtered = data.filter((item) => {
//       const matchesManager =
//         filters.managers.length === 0 || filters.managers.some((m) => m.label === item.STAFF_VP);
//       const matchesPlatform =
//         filters.platforms.length === 0 || filters.platforms.some((p) => p.label === item.LLM_PLATFORM);
//       const matchesPhase =
//         filters.phases.length === 0 || filters.phases.some((ph) => ph.label === item.CURRENT_PHASE);
//       return matchesManager && matchesPlatform && matchesPhase;
//     });

//     const envCounts: Record<string, number> = {};
//     filtered.forEach((item) => {
//       const env = item.DERIVED_ENV || "Unknown";
//       envCounts[env] = (envCounts[env] || 0) + 1;
//     });

//     const colorPalette = [
//       'hsl(var(--brand-blue))',
//       'hsl(var(--brand-teal))',
//       'hsl(var(--muted-foreground))',
//       'hsl(var(--warning))',
//       'hsl(var(--brand-blue-light))',
//     ];

//     const progressData = Object.entries(envCounts).map(([name, value], index) => ({
//       name,
//       value,
//       color: colorPalette[index % colorPalette.length],
//     }));

//     setProgressData(progressData);
//     setTotalProjects(progressData.reduce((sum, item) => sum + item.value, 0));
//   };

//   return {
//     progressData,
//     totalProjects,
//     rawProjectData,
//     filterAndSetProgressData,
//     loadAndFilterProjectData,
//   };
// };

import { useState } from "react";

export type FilterItem = { id: string; label: string };

export interface Filters {
    managers: FilterItem[];
    platforms: FilterItem[];
    phases: FilterItem[];
}

export interface ProgressItem {
    name: string;
    value: number;
    color: string;
}

export const useFilteredProgressData = () => {
    const [progressData, setProgressData] = useState<ProgressItem[]>([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [rawProjectData, setRawProjectData] = useState<any[]>([]);

    const filterAndSetProgressData = (data: any[], filters: Filters) => {
        const filtered = data.filter((item) => {
            const matchesManager =
                filters.managers.length === 0 || filters.managers.some((m) => m.label === item.STAFF_VP);
            const matchesPlatform =
                filters.platforms.length === 0 || filters.platforms.some((p) => p.label === item.LLM_PLATFORM);
            const matchesPhase =
                filters.phases.length === 0 || filters.phases.some((ph) => ph.label === item.CURRENT_PHASE);
            return matchesManager && matchesPlatform && matchesPhase;
        });

        const envCounts: Record<string, number> = {};
        filtered.forEach((item) => {
            const env = item.DERIVED_ENV || "Unknown";
            envCounts[env] = (envCounts[env] || 0) + 1;
        });

        const colorPalette = [
            'hsl(var(--brand-blue))',
            'hsl(var(--brand-teal))',
            'hsl(var(--muted-foreground))',
            'hsl(var(--warning))',
            'hsl(var(--brand-blue-light))',
        ];

        const progressData = Object.entries(envCounts).map(([name, value], index) => ({
            name,
            value,
            color: colorPalette[index % colorPalette.length],
        }));

        setProgressData(progressData);
        setTotalProjects(progressData.reduce((sum, item) => sum + item.value, 0));
    };

    const loadAndFilterProjectData = (data: any[], filters: Filters) => {
        setRawProjectData(data);
        filterAndSetProgressData(data, filters);
    };

    return {
        progressData,
        totalProjects,
        rawProjectData,
        filterAndSetProgressData,
        loadAndFilterProjectData,
    };
};
