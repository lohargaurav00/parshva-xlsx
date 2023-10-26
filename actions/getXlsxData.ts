import xlsx from 'xlsx'
import path from 'path'

const getXlsxData = () => {
  const filePath = path.join(process.cwd(), 'public', 'export29913.xlsx');

  const workbook = xlsx.readFile(filePath);

  const sheet_name_list = workbook.SheetNames;
  const xlData = xlsx.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]]
  );

  return xlData

}

export default getXlsxData