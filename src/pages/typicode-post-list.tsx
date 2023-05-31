import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import { useTable, List, MarkdownField } from "@refinedev/antd";
import { Table, Space } from "antd";

export const TypicodePostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "typicode-posts",
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: "users",
    dataProviderName: "typicode", // <--- HAS TO BE DEFINED
    ids: tableProps?.dataSource?.map((item) => item?.userId) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["userId"]}
          title="User"
          render={(value) =>
            userIsLoading ? (
              <>Loading...</>
            ) : (
              userData?.data?.find((item) => item.id === value)
                ?.firstName +
              " " +
              userData?.data?.find((item) => item.id === value)
                ?.lastName
            )
          }
        />
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="body"
          title="Body"
          render={(value: any) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
      </Table>
    </List>
  );
};
