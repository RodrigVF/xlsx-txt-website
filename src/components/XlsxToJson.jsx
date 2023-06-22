import * as xlsx from 'xlsx'
import * as React from 'react'

const XlsxToJson = () => {
 const [json, setJson] = React.useState([ { "Exemplo": "Teste"} ])

 const StrictNumberChars = (str) => {
  for(let i = str.length; i <= 49; ++i) {
   str += '\u00A0';
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

 const AddZeros = (value) => {
  let stringValue = value.toString();
  for(let i = stringValue.length; i <= 12; ++i) {
    stringValue = '0' + stringValue;
   }
  
  return (
    `\u00A0 \u00A0 ${stringValue}`
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
             
             console.log(jsonReturn)
             // Object.keys(jsonReturn).forEach(key=>{
             //  console.log(key ,jsonReturn[key]);
             // })

             var str = JSON.stringify(jsonReturn, null, 2); // spacing level = 2

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
       <table>
       <tr key={"header"}>
           <th> {`\u00A0 \u00A0 \u00A0 \u00A0\u00A0`} MATRICULA/NOME </th>
           <th> {`\u00A0 \u00A0 \u00A0 \u00A0 \u00A0\u00A0 \u00A0 \u00A0 \u00A0 \u00A0`}</th>
           <th> {`\u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 `} CONTA CAPITAL </th>
           <th> {`\u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 `} VALOR </th>
       </tr>
       {json.map((item) => (
         <tr>
          <td key='MATRICULA/NOME'>
          {StrictNumberChars(`${item.Documento}${item.NomeCliente}`)}
          </td>
          
          <td key={'NONE'}>
          {`00000000000000`}
          </td>
          
          <td key={'MATRICULA'}>
            {AddZeros(`${item.ContaCapital}`)}
          </td>

          <td key={'VALOR '}>
            {FormatValue(`${item.ValorIntegralizaçãoFolha}`)}
          </td>
        </tr>
       ))}
     </table>

    </div>
    </div>
 );
}

export default XlsxToJson;
