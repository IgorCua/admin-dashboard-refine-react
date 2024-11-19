import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { CreateButton, List, ListButton, useTable } from "@refinedev/antd"
import { useGo } from "@refinedev/core"
import { Table } from "antd";

export const CompanyListPage = () => {
    const go = useGo();
    const { tableProps, filters } = useTable({
        resource: 'companies',
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY
        }
    })
    return (
        <List
            breadcrumb="fasle"
            headerButtons={() => (
                <CreateButton
                    onClick={() => {
                        go({
                            to: {
                                resource: 'companies',
                                action: 'create'
                            },
                            options: {
                                keepQuery: true
                            },
                            type: 'replace' 
                        })
                    }}
                />
            )}
        >
            <Table>

            </Table>
        </List>
    )
}