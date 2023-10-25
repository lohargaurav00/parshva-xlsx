import getXlsxData from "./getXlsxData"

const getPosAndDesc = async (supplierName: string) => {
    return await getXlsxData().then((data) => {
        const supplierData =  data.filter((item: any) => {
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

        return { supplierPosAndDesc }

    }).catch((err) => {
        new Error(err.message)
    })
}

export default getPosAndDesc