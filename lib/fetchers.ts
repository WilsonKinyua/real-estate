"use server";
export const fetchProperties = async (addressOne: string, addressTwo: string) => {
    const res = await fetch(`${process.env.API_BASE_URL}/basicprofile?address1=${addressOne}&address2=${addressTwo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.ATTOM_API_KEY as string
        }
    })
    const data = await res.json()
    return data.property
}