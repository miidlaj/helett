"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/tooltip";
import { IconBrandApple, IconBrandWindows } from "@tabler/icons-react";

import { ProductType } from "@/constants/products";

const columns = [
  { name: "File Name", uid: "file-name" },
  { name: "Version", uid: "version" },
  { name: "File Size", uid: "file-size" },
  { name: "Release Date", uid: "release-date" },
  { name: "Action", uid: "action" },
];

export default function DriverTable({
  products,
}: {
  products: ProductType[] | any[];
}) {
  const handleDownload = (filePath: string) => {
    const link = document.createElement("a");

    link.href = filePath;
    link.download = filePath.split("/").pop() || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderCell = React.useCallback(
    (product: ProductType, columnKey: React.Key) => {
      switch (columnKey) {
        case "file-name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: `${product.src}/${product.thumbnail}`,
              }}
              name={product.title + " Driver"}
            />
          );

        case "actions":
          const hasMacDriver = product.drivers?.mac;
          const hasWinDriver = product.drivers?.win;

          return (
            <div className="relative flex items-center justify-end gap-2">
              {hasWinDriver && (
                <Tooltip color="primary" content="Download for Windows">
                  <span
                    aria-label="Download for Win"
                    className="text-lg text-primary cursor-pointer active:opacity-50"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (product?.drivers?.win) {
                        handleDownload(product.drivers.win);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (product?.drivers?.win) {
                          handleDownload(product.drivers.win);
                        }
                      }
                    }}
                  >
                    <IconBrandWindows className="size-6" />
                  </span>
                </Tooltip>
              )}
              {hasMacDriver && (
                <Tooltip color="primary" content="Download for Mac">
                  <span
                    aria-label="Download for Mac"
                    className="text-lg text-primary cursor-pointer active:opacity-50"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (product?.drivers?.mac) {
                        handleDownload(product.drivers.mac);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (product?.drivers?.mac) {
                          handleDownload(product.drivers.mac);
                        }
                      }
                    }}
                  >
                    <IconBrandApple className="size-6" />
                  </span>
                </Tooltip>
              )}
              {!hasWinDriver && !hasMacDriver && (
                <span className="text-default-400">No drivers available</span>
              )}
            </div>
          );
        default:
          return <div></div>;
      }
    },
    [],
  );

  return (
    <Table
      isStriped
      aria-label="Product driver download table"
      className="mt-10"
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "end" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={products}>
        {(item: ProductType) => (
          <TableRow key={item.title}>
            {(columnKey: React.Key) => (
              <TableCell key={columnKey as string}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
