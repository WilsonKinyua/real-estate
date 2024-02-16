"use server";

// fetch properties
export const fetchProperties = async (addressOne: string, addressTwo: string) => {
    const res = await fetch(`${process.env.API_BASE_URL}/basicprofile?address1=${addressOne}&address2=${addressTwo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.ATTOM_API_KEY as string
        }
    })
    const data = await res.json()

    if (data.Response) {
        return { error: data.Response.status.code + " - " + data.Response.status.msg }
    }

    return data.property
}

// fetch property details
export const fetchPropertyDetails = async (attomid: number, address1: string, address2: string) => {
    const res = await fetch(`${process.env.API_BASE_URL}/detail?attomid=${attomid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.ATTOM_API_KEY as string
        }
    })
    const data = await res.json()

    if (data.Response) {
        return { error: data.Response.status.code + " - " + data.Response.status.msg }
    }

    const property = data.property[0]

    const buildingRes = await fetch(`${process.env.API_BASE_URL}/buildingpermits?address1=${address1}&address2=${address2}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.ATTOM_API_KEY as string
        }
    })
    const buildingData = await buildingRes.json()

    if (buildingData.Response) {
        return { error: buildingData.Response.status.code + " - " + buildingData.Response.status.msg }
    }

    buildingData.property.forEach((building: any) => {
        if (building.identifier.attomId === attomid) {
            property.buildingPermits = building.buildingPermits
        }
    })

    return property
}
