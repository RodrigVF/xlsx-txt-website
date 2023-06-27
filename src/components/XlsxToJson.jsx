import * as xlsx from 'xlsx'
import * as React from 'react'

const XlsxToJson = () => {

  let newDate = new Date()

  let day = newDate.getDate()
  let stringDay = day.toString()
  if (stringDay.length < 2) stringDay = '0' + stringDay

  let month = newDate.getMonth() + 1
  let stringMonth = month.toString()
  if (stringMonth.length < 2) stringMonth = '0' + stringMonth
  
  let year = newDate.getFullYear()

 const [json, setJson] = React.useState([ { "Documento": "1111", "NomeCliente":"Teste", "ContaCapital":"1111111", "ValorIntegralizaçãoFolha": "222", "TotalLinhas": "3333", "ValorTotal":"44444444"}  ])

 const StrictNumberChars = (str, number) => {

    while (str.length > number){
      str = str.slice(0, -1); 
   }
   
   for(let i = str.length; i <= number; ++i) {
     str += ' ';
  }

  return(
    `${str}`
  );
 }

 const FormatValue = (value) => {
  let floatValue = parseFloat(value).toFixed(2);
  let stringValue = floatValue.toString();
  for(let i = stringValue.length; i <= 17; ++i) {
    stringValue = '0' + stringValue
   }
  let formatedValue = stringValue.replace('.','')

  return (
    `${formatedValue}`
  )
 }

 const AddZeros = (value, number) => {
  let stringValue = value.toString();
  for(let i = stringValue.length; i <= number; ++i) {
    stringValue = '0' + stringValue;
   }
  
  return (
    `${stringValue}`
  )
 }
 
 const readUploadFile = (e) => {
     e.preventDefault();
     if (e.target.files) {
         const reader = new FileReader();
         reader.onload = (e) => {
             const data = e.target.result;
             const workbook = xlsx.read(data, { type: "array" });
             const sheetName = workbook.SheetNames[0];
             const worksheet = workbook.Sheets[sheetName];
             let jsonReturn = xlsx.utils.sheet_to_json(worksheet);

             // Object.keys(jsonReturn).forEach(key=>{
             //  console.log(key ,jsonReturn[key]);
             // })
             //var str = JSON.stringify(jsonReturn, null, 2); // spacing level = 2

             setJson(jsonReturn)
             return (
                 <div>
                  <p> testando!!!</p>
                 </div>
             )
         };
         reader.readAsArrayBuffer(e.target.files[0]);
     }
 }
 return(
    <div>
      <form>
      <label htmlFor="upload">Selecione um arquivo .xlsx </label>
      <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
      />
      </form>
      <h1> Resultado: </h1>
      <div id='myInput'>
      <pre>

       <table id='resultTable'>
        <tr>
          <th colSpan={6}>
            {StrictNumberChars(`0175643810000000NOMEEMPRES${stringDay}${stringMonth}${year}0000`, 199)}
          </th>
        </tr> 
       {json.map((item) => (
        <>
         <tr>
          {StrictNumberChars(`1C000${item.ContaCapital}${item.NomeCliente}`, 47)}
          {`    `}
          {`00000000000000            `}
          {AddZeros(`${item.ContaCapital}`,12)}
          {`                    `}
          {FormatValue(`${item.ValorIntegralizaçãoFolha}   `)}
          {`                                                                        `}
        </tr>
       </>
       ))}
       <tr>
        <td>
          {StrictNumberChars(`9${AddZeros(json[0].TotalLinhas,26)}${FormatValue(json[0].ValorTotal)}`, 199)}
        </td>
       </tr>
    </table>
    </pre>
    
    </div>
    </div>
 );
}

export default XlsxToJson;
