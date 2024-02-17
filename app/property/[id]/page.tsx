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
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LoadingCard from "@/components/loading-card";
import { useSearchParams } from "next/navigation";

export default function PropertyDetails({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
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
        },
        building: {
            size: {
                bldgsize: 0,
                grosssize: 0,
                grosssizeadjusted: 0,
                groundfloorsize: 0,
                livingsize: 0,
                sizeInd: '',
                universalsize: 0
            },
            rooms: {
                bathFixtures: 0,
                bathsFull: 0,
                bathsTotal: 0,
                beds: 0,
                roomsTotal: 0
            }
        },
        buildingPermits: [
            {
                effectiveDate: '',
                permitNumber: '',
                jobValue: 0,
                fees: 0,
                businessName: '',
                homeOwnerName: '',
                classifiers: []
            }
        ]
    });
    const [transition, startTransition] = useTransition()

    const address1 = searchParams.get('address1')
    const address2 = searchParams.get('address2')

    useEffect(() => {
        startTransition(async () => {
            await fetchPropertyDetails(+params.id, address1 as string, address2 as string).then(res => {
                if (res.error) {
                    toast.error(res.error)
                    return
                }
                setProperty(res)
            })

        })
    }, [params.id])

    return (
        <div className="flex-1 container mx-auto">
            <Button
                className="my-5"
                onClick={() => history.back()}
            >
                <ArrowLeft size={16} className="mr-5" /> Back to properties
            </Button>
            <div className="grid md:grid-cols-2 gap-5">
                {transition && (
                    Array.from({ length: 6 }).map((_, i) => (
                        <LoadingCard key={i} />
                    ))
                )}
                {!transition && (
                    <>
                        <Card className="rounded mb-10">
                            <CardHeader className="text-white rounded-t-xl bg-black">
                                <h3 className="text-lg">Property summary</h3>
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
                        <Card className="rounded mb-10">
                            <CardHeader className="text-white rounded-t-xl bg-black">
                                <h3 className="text-lg">Property area</h3>
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
                                                    &quot;County&quot; name in the U.S. :
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
                    </>
                )}
            </div>
            {!transition && (
                <>
                    <Card className="rounded mb-10">
                        <CardHeader className="text-white rounded-t-xl bg-black">
                            <h3 className="text-lg">Property building</h3>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-5 my-5">
                            <Card className="rounded">
                                <CardHeader className="text-white rounded-t-xl bg-black">
                                    <h3 className="text-sm">Size</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        Total square feet:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.size.bldgsize}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Gross square feet:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.size.grosssize}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Adjusted Gross Square Footage:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.size.grosssizeadjusted}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Sum of ground floor living square footage:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.size.groundfloorsize}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Living square feet:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.size.livingsize}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Building Square Footage:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.size.sizeInd}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Derived living or building square:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.size.universalsize}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="rounded">
                                <CardHeader className="text-white rounded-t-xl bg-black">
                                    <h3 className="text-sm">Rooms</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative overflow-x-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        Bath Fixtures:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.rooms.bathFixtures ?? '-'}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Baths Full:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.rooms.bathsFull ?? '-'}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Baths Total:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.rooms.bathsTotal ?? '-'}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Beds:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.rooms.beds ?? '-'}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 capitalize">
                                                        Rooms Total:
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {property.building.rooms.roomsTotal ?? '-'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                    <Card className="rounded mb-10">
                        <CardHeader className="text-white rounded-t-xl bg-black">
                            <h3 className="text-lg">Property building permits</h3>
                        </CardHeader>
                        <CardContent className="my-5">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Business Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Home Owner Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                classifiers
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Effective Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Permit Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Job Value
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                fees
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {property.buildingPermits && property.buildingPermits.map((permit, key) => (
                                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={key}>
                                                <td className="px-6 py-4">
                                                    {permit.businessName ?? '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {permit.homeOwnerName ?? '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {permit.classifiers}
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                                    {permit.effectiveDate ?? '-'}
                                                </th>
                                                <td className="px-6 py-4 uppercase">
                                                    {permit.permitNumber ?? '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {permit.jobValue ?? '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {permit.fees ?? '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div >
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}