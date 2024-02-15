"use client"
import { useEffect, useState, useTransition } from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { fetchPropertyDetails } from "@/lib/fetchers";
import { toast } from "sonner";
import { Property } from "@/lib/types";

export default function PropertyDetails({ params }: { params: { id: string } }) {
    const [property, setProperty] = useState<Property>({
        summary: {
            absenteeInd: '',
            propclass: '',
            propsubtype: '',
            yearbuilt: 0,
            legal1: ''
        },
        area: {
            blockNum: '',
            loctype: '',
            countrysecsubd: '',
            countyuse1: '',
            munname: '',
            muncode: '',
            subdname: '',
        },
        address: {
            country: '',
            oneLine: ''
        }
    });
    const [transition, startTransition] = useTransition()

    useEffect(() => {
        startTransition(async () => {
            await fetchPropertyDetails(+params.id).then(res => {
                if (res.error) {
                    toast.error(res.error)
                    return
                }
                setProperty(res)
            })

        })
    }, [params.id])

    return (
        <div className="flex-1 container mx-auto my-10">
            <div className="grid md:grid-cols-2 gap-5">
                <Card className="rounded">
                    <CardHeader className="text-white rounded-t-xl bg-black">
                        <h3 className="text-lg">Property Summary</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            Absentee/Occupied:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.summary.absenteeInd}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            Type of property:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.summary.propclass}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            Year built:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.summary.yearbuilt}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            Legal description:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.summary.legal1}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            Country:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.address.country}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                            Property address:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.address.oneLine}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded">
                    <CardHeader className="text-white rounded-t-xl bg-black">
                        <h3 className="text-lg">Property Area</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            Block number:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.area.blockNum}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                            Type of location:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.area.loctype}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                            "County" name in the U.S. :
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.area.countrysecsubd}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                            County-specific use code:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.area.countyuse1}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                            Municipality / Township Name:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.area.munname} <sup><Badge>{property.area.muncode}</Badge></sup>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                            Subdivision:
                                        </th>
                                        <td className="px-6 py-4">
                                            {property.area.subdname}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}