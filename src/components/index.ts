import { UpcomingEvents } from "./home/upcoming-events";
import { DealsChart } from "./home/deals-chart";
import AccordionHeaderSkeleton from "./skeleton/accordion-header";
import KanbanColumnSkeleton from "./skeleton/kanban";
import LatestActivitiesSkeleton from "./skeleton/latest-activities";
import ProjectCardSkeleton from "./skeleton/project-card";
import UpcomingEventsSkeleton from "./skeleton/upcoming-events";
import { DashboardTotalCountCard } from "./home/total-count-card";
import { LatestActivities } from "./home/latest-activities";

export {
    UpcomingEvents, 
    DealsChart,
    
    AccordionHeaderSkeleton,
    KanbanColumnSkeleton,
    LatestActivitiesSkeleton,
    ProjectCardSkeleton,
    UpcomingEventsSkeleton,

    DashboardTotalCountCard,
    LatestActivities
};

export * from './tags/user-tag'
export * from './text';
export * from './accordion';
export * from './tasks/form/description';
export * from './tasks/form/due-date';
export * from './tasks/form/header';
export * from './tasks/form/stage';
export * from './tasks/form/title';
export * from './tasks/form/users';