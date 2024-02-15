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
export const fetchPropertyDetails = async (attomid: number) => {
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

    return data.property[0]
}