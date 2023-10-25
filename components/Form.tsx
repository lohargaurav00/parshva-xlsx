"use client"
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip } from "react-tooltip";



const FormSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required.",
  }),
  startTime: z.string().nonempty({
    message: "Start time is required.",
  }),
  endTime: z.string().nonempty({
    message: "End time is required.",
  }),
  noOfHoursWorked: z.string().nonempty({
    message: "No of hours worked is required.",
  }),
  ratePerHour: z.string().nonempty({
    message: "Rate per hour is required.",
  }),
  suppliers: z.string().nonempty({
    message: "Suppliers is required.",
  }),
  purchaseOrder: z.string().nonempty({
    message: "Purchase order is required.",
  })

});

type PurchaseOrder = {
  poNumber: string
  description: string
}[]


export default function InputForm() {

  const [suppliers, setSuppliers] = useState([])
  const [posAndDesc, setPosAndDesc] = useState<PurchaseOrder | []>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      noOfHoursWorked: "",
      ratePerHour: "",
      suppliers: "",
      purchaseOrder: ""
    }
  });

  const onSubmit: any = (data: z.infer<typeof FormSchema>) => {

    fetch("/api/post-docket", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
        noOfHoursWorked: data.noOfHoursWorked,
        ratePerHour: data.ratePerHour,
        suppliers: data.suppliers,
        purchaseOrder: posAndDesc[parseInt(data.purchaseOrder)].poNumber,
        description: posAndDesc[parseInt(data.purchaseOrder)].description
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    form.reset();
  };

  const getPurchaseOrders = async (supplier: string) => {
    const data = await fetch(`/api/get-pos-of-suppliers?supplierName=${supplier}`)
    const response = await data.json()
    setPosAndDesc(response)
  }
  useEffect(() => {
    const suppliers = async () => {
      const data = await fetch("/api/get-suppliers")
      const response = await data.json()
      setSuppliers(response)
    }

    suppliers()

  }, []);



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 justify-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Start Time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input placeholder="Enter the End Time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}

        />

        <FormField
          control={form.control}
          name="noOfHoursWorked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No of hours worked</FormLabel>
              <FormControl>
                <Input placeholder="Enter the no of hours worked" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ratePerHour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate per hour</FormLabel>
              <FormControl>
                <Input placeholder="Enter the rate per hour" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suppliers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suppliers</FormLabel>
              <Select onValueChange={(e) => {
                field.onChange(e)
                getPurchaseOrders(e)
              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Supplier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-[300px]" >
                  {suppliers.map((supplier, index) => (
                    <SelectItem key={index} value={supplier}>
                      {supplier}
                    </SelectItem>

                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchaseOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Order</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger >
                    <SelectValue placeholder="Select a Purchase Order" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-[300px]" >
                  {posAndDesc.map((po, index) => (
                    <>
                      <SelectItem key={`${po}-${index}`} value={`${index}`} data-tooltip-id={`tooltip`} data-tooltip-content={po.description}>
                        {po.poNumber}
                      </SelectItem>
                      <Tooltip id={'tooltip'} variant="info" />
                    </>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
