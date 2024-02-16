"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export const propertyColumns: ColumnDef<[]>[] = [
    {
        accessorKey: "Owner(s)",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="uppercase float-left"
                >
                    Owner(s)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const property = row.original as any
            return (
                <div className="flex space-x-2">
                    {property.assessment.owner.owner1 ? (property.assessment.owner.owner1.firstNameAndMi + property.assessment.owner.owner1.lastName) : 'N/A'}
                </div>
            )
        }
    },
    {
        accessorKey: "propertyClass",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="uppercase"
                >
                    Property Class
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const property = row.original as any
            return (
                <div className="flex space-x-2">
                    {property.summary.propClass}
                </div>
            )
        }
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="uppercase"
                >
                    Address
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const property = row.original as any
            return (
                <div className="flex space-x-2">
                    {property.address.oneLine}
                </div>
            )
        }
    },
    {
        accessorKey: "saleAmt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="uppercase"
                >
                    Sale Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const property = row.original as any
            return (
                <div className="flex space-x-2">
                    <Badge>$ {property.sale.saleAmountData.saleAmt.toLocaleString()}</Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "yearBuilt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="uppercase"
                >
                    Year Built
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const property = row.original as any
            return (
                <div className="flex space-x-2">
                    {property.summary.yearBuilt}
                </div>
            )
        }
    },
    {
        accessorKey: "pubDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="uppercase"
                >
                    Published
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const property = row.original as any
            return <>{new Date(property.vintage.pubDate).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</>
        },
    },
    // action
    {
        accessorKey: "action",
        cell: ({ row }) => {
            const property = row.original as any
            return (
                <Button asChild variant={"default"}>
                    <Link href={`/property/${property.identifier.Id}?address1=${property.address1}&address2=${property.address2}`}>
                        View
                    </Link>
                </Button>
            )
        }
    }
]