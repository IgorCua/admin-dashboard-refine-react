import { KanbanColumnSkeleton, ProjectCardSkeleton } from "@/components";
import { KanbanAddCardButton } from "@/components/tasks/kanban/add-card-button";
import { KanbanBoard, KanbanBoardContainer } from "@/components/tasks/kanban/board";
import { ProjectCardMemo } from "@/components/tasks/kanban/card";
import { KanbanColumn } from "@/components/tasks/kanban/column";
import { KanbanItem } from "@/components/tasks/kanban/item";
import { TASK_STAGES_QUERY, TASKS_QUERY } from "@/graphql/queries";
import { TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { useMemo } from "react";

export const List = () => {
    const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
        resource: 'taskStages',
        filters: [
            {
                field: 'title',
                operator: 'in',
                value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE']
            },
        ],
        sorters: [
            {
                field: 'createdAt',
                order: 'asc'
            }
        ],
        meta: {
            gqlQuery: TASK_STAGES_QUERY
        }
    });

    const { data: tasks, isLoading: isLoadingTasks } = useList<GetFieldsFromList<TasksQuery>>({
        resource: 'tasks',
        sorters: [
            {
                field: 'dueDate',
                order: 'asc'
            }
        ],
        queryOptions: {
            enabled: !!stages,
        },
        pagination: {
            mode: 'off'
        },
        meta: {
            gqlQuery: TASKS_QUERY
        }
    });

    const taskStages = useMemo(() => {
        if (!tasks?.data || !stages?.data) {
            return {
                unassignedStage: [],
                stages: []
            }
        }

        const unassignedStage = tasks.data.filter((task) => task.stageId === null)

        const grouped: TaskStage[] = stages.data.map((stage) => (
            {
                ...stage,
                tasks: tasks.data.filter((task) => (
                    task.stageId?.toString() === stage.id
                ))
            }
        ));

        return {
            unassignedStage,
            columns: grouped
        }
    }, [stages, tasks]);


    const handleAddCard = (args: { stageId: string }) => {

    };

    const isLoading = isLoadingStages || isLoadingTasks;

    if(isLoading) return <PageSkeleton/>

    return (
        <>
            <KanbanBoardContainer>
                <KanbanBoard>
                <KanbanColumn
                        id="unassigned"
                        title="unassigned"
                        count={taskStages.unassignedStage}
                        onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
                    >
                        {taskStages.unassignedStage.map((task) => (
                            <KanbanItem 
                                key={task.id}
                                id={task.id}
                                data={{...task, stagedId: 'unassigned'}}
                            >
                                <ProjectCardMemo
                                    {...task}
                                    dueDate={task.dueDate || undefined}
                                />
                            </KanbanItem>
                        ))}

                        {!taskStages.unassignedStage.length && (
                            <KanbanAddCardButton
                                onClick={() => handleAddCard({stageId: 'unassigned'})}
                            />
                        )}
                    </KanbanColumn>

                    {taskStages.columns?.map((column) => (
                        <KanbanColumn
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            count={column.tasks.length}
                            onAddClick={() => handleAddCard({stageId: column.id})}
                        >
                            {!isLoading && column.tasks.map((task) => (
                                <KanbanItem key={task.id} id={task.id}>
                                    <ProjectCardMemo
                                        {...task}
                                        dueDate={task.dueDate || undefined}
                                    >

                                    </ProjectCardMemo>
                                </KanbanItem>
                            ))}
                        </KanbanColumn>
                    ))}
                </KanbanBoard>
            </KanbanBoardContainer>
        </>
    )
};

const PageSkeleton = () => {
    const columnCount = 6;
    const itemCount = 4;

    return  (
        <KanbanBoardContainer>
            {Array.from({length: columnCount}).map((_, index) => (
                <KanbanColumnSkeleton key={index}>
                    {Array.from({length: itemCount}).map((_, index) => (
                        <ProjectCardSkeleton key={index}/>
                    ))}
                </KanbanColumnSkeleton>
            ))}
        </KanbanBoardContainer>
    )
}