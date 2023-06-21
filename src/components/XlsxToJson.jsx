import * as xlsx from 'xlsx'
import * as React from 'react'
import StrictNumberChars from './StrictNumberChars'

const XlsxToJson = () => {
 const [json, setJson] = React.useState([ { "Exemplo": "Teste"} ])

 const StrictNumberChars = (str) => {

  for(let i = str.length; i <= 49; ++i) {
   str += '_';
  }

  return(
    <td>{`| ${str}`}</td>
  );
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
         {Object.keys(json[0]).map((key) => (
           <th >{key}</th>
         ))}
       </tr>
       {json.map((item) => (
         <tr key={item.id}>
           {Object.values(item).map((val) => (
             StrictNumberChars(val)
             
           ))}
         </tr>
       ))}
     </table>

    </div>
    </div>
 );
}

export default XlsxToJson;
