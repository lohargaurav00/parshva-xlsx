import xlsx from 'xlsx'

const getXlsxData = async () => {
  const workbook = xlsx.readFile('./export29913.xlsx');
  
  const sheet_name_list = workbook.SheetNames;
  const xlData = xlsx.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]]
  );

  return xlData

}

export default getXlsxData