export default function Property({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Property {params.id}</h1>
        </div>
    )
}