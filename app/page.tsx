"use client"
import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { DataTable } from "@/components/table";
import { propertyColumns } from "@/components/table/columns/property";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fetchProperties } from "@/lib/fetchers";

export default function Home() {
  const [propertiesData, setPropertiesData] = useState([])
  const [transition, startTransition] = useTransition()
  const [formState, setFormState] = useState({
    address1: '4529 Winona Court',
    address2: 'Denver, CO'
  })
  return (
    <div className="flex-1 container mx-auto">
      <div className="my-5">
        <h2 className="text-lg font-bold tracking-tight">
          Welcome Back!
        </h2>
      </div>
      <Card>
        <CardHeader >
          <div className="md:flex justify-between">
            <h3 className="text-xl">
              Properties
            </h3>
            <form className="md:flex gap-5 items-center"
              onSubmit={(e) => {
                e.preventDefault()
                if (!formState.address1 || !formState.address2) return toast.error('Please enter addresses')
                startTransition(async () => {
                  await fetchProperties(formState.address1, formState.address2).then(res => {
                    if (res.error) {
                      toast.error(res.error)
                      return
                    }
                    res.forEach((property: any) => {
                      property.address1 = formState.address1
                      property.address2 = formState.address2
                    })
                    setPropertiesData(res)
                  })
                })
              }}
            >
              <div>
                <Input
                  type="text"
                  placeholder="Enter address one"
                  className="focus:ring-0 active:outline-none focus-visible:ring-0 block w-full shadow-sm sm:text-sm rounded-md bg-gray-50 h-11"
                  onChange={(e) => setFormState({ ...formState, address1: e.target.value })}
                  value={formState.address1}
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Enter address two"
                  className="focus:ring-0 active:outline-none focus-visible:ring-0 block w-full shadow-sm sm:text-sm rounded-md bg-gray-50 h-11"
                  onChange={(e) => setFormState({ ...formState, address2: e.target.value })}
                  value={formState.address2}
                />
              </div>
              <Button className="h-11"
                disabled={transition}
              >
                {transition ? <span className="flex"><span>Loading...</span> <Loader className="animate-spin h-5 w-5 ml-2" /></span> : "Search"}
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent className="uppercase">
          <DataTable
            data={propertiesData}
            columns={propertyColumns}
          />
        </CardContent>
      </Card>
    </div>
  )
}