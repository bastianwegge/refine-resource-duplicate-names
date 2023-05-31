import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  MarkdownField,
  DateField,
  ImageField,
  TagField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const DefaultPostList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: "users",
    ids: tableProps?.dataSource?.map((item) => item?.user?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: tagsData, isLoading: tagsIsLoading } = useMany({
    resource: "tags",
    ids: [].concat(
      ...(tableProps?.dataSource?.map((item) => item?.tags) ?? []),
    ),
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: languageData, isLoading: languageIsLoading } = useMany({
    resource: "languages",
    ids: tableProps?.dataSource?.map((item) => item?.language) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column
          dataIndex="content"
          title="Content"
          render={(value: any) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
        <Table.Column dataIndex="hit" title="Hit" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find(
                (item) => item.id === value,
              )?.title
            )
          }
        />
        <Table.Column
          dataIndex={["user", "id"]}
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
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column dataIndex="status_color" title="Status Color" />
        <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["publishedAt"]}
          title="Published At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="image"
          title="Image"
          render={(value: any[]) => (
            <>
              {value?.map((item, index) => (
                <ImageField
                  style={{ maxWidth: "100px" }}
                  value={item?.url}
                  key={index}
                />
              ))}
            </>
          )}
        />
        <Table.Column
          dataIndex="tags"
          title="Tags"
          render={(value: any[]) =>
            tagsIsLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.map((item, index) => (
                  <TagField
                    key={index}
                    value={
                      tagsData?.data?.find(
                        (resourceItems) =>
                          resourceItems.id === item,
                      )?.title
                    }
                  />
                ))}
              </>
            )
          }
        />
        <Table.Column
          dataIndex={["language"]}
          title="Language"
          render={(value) =>
            languageIsLoading ? (
              <>Loading...</>
            ) : (
              languageData?.data?.find(
                (item) => item.id === value,
              )?.title
            )
          }
        />
      </Table>
    </List>
  );
};
