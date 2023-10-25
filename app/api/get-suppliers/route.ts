import getXlsxData from "@/actions/getXlsxData";
import { NextResponse } from "next/server";


export const GET = () => {
    try {

        const data = getXlsxData();

        const suppliers = data.map((item: any) => item["Supplier"]); // for getting all suppliers
        const uniqueSuppliers = [...new Set(suppliers) as any]; // for getting unique suppliers

        const allSuppliers = uniqueSuppliers.filter((supplier: string) => supplier !== ''); // for removing empty suppliers

        return NextResponse.json(allSuppliers);
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.error();
    }
}
