import getXlsxData from "./getXlsxData"

const getSuppliers = () => {

  return getXlsxData().then((data) => {

    const suppliers = data.reduce((uniqueSuppliers: string[], item: any) => {
      const supplier = item['Supplier'].trim(); // for getting suppliers and removing white spaces

      // if supplier is not empty and not already in the array, add it
      if (supplier !== '' && !uniqueSuppliers.includes(supplier)) {
        uniqueSuppliers.push(supplier); // add supplier to array
      }

      return uniqueSuppliers; // return array
    }, []);


    return { suppliers}
  }).catch((err) => {
    new Error(err.message)
  })
}

export default getSuppliers