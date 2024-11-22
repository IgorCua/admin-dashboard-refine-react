import { DragOverlay, useDraggable, UseDraggableArguments } from "@dnd-kit/core"

type Props = {
    id: string,
    data?: UseDraggableArguments['data']
}

export const KanbanItem = ({children, id, data}: React.PropsWithChildren<Props>) => {
    const { attributes, listeners, setNodeRef, active } = useDraggable({
        id,
        data
    })
    return (
        <div
            style={{
                position: 'relative'
            }}
        >
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={{
                    opacity: active ? (active.id === id ? 1 : 0.5) : 1,
                    borderRadius: '8px',
                    position: 'relative',
                    cursor: 'grab'
                }}
            >
                {active?.id === id && (
                    <DragOverlay zIndex={1001}>
                        <div
                            style={{
                                borderRadius: '8px',
                                boxShadow: 'rgba(149, 157, 165, 02) 0px 8px 24px',
                                cursor: 'grabbing'
                            }}
                        >
                            {children}
                        </div>
                    </DragOverlay>
                )}
            </div>
        </div>
    )
}