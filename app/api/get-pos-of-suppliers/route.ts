import getXlsxData from "@/actions/getXlsxData";
import { NextRequest} from "next/server";


export const GET = async (req: NextRequest) => {

    try {
        const url = new URL(req.url)
        const supplierName = url.searchParams.get('supplierName')

        const data = getXlsxData()
        const supplierData = data.filter((item: any) => {
            return item['Supplier'].trim() === supplierName
        })

        const allPos = supplierData.map((item: any) => item['PO Number']) // get all PO numbers

        const supplierPosAndDesc = data.reduce((posAndDesc: any, item: any) => {
            const po = item['PO Number'].trim() // for getting PO numbers and removing white spaces
            const desc = item['Description'].trim() // for getting descriptions and removing white spaces

            // if PO number is not empty and not already in the array, add it
            if (po !== '' && allPos.includes(po)) {
                posAndDesc.push({
                    "poNumber": po,
                    "description": desc
                })
                // add PO number and description to object
            }

            return posAndDesc // return object

        }, [])

        return new Response(JSON.stringify(supplierPosAndDesc), {
            status: 200,
        })
    } catch (error: any) {
        console.log(error.message);
        return new Response(JSON.stringify('Internal Server Error!!'), { status: 500 })
    }
}
