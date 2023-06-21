import XlsxToJson from "../components/XlsxToJson";

const Home = () => {

    const jsonToTxT = (json) => {
        setTimeout(() => {
            const element = document.createElement("a");
            const file = new Blob([document.getElementById('myInput').innerText], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "TestFile.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }, 1000);
    }

 return(
    <div>
        <h1>Arquivos</h1>
        <button onClick={jsonToTxT}>Baixar .txt</button>
        <XlsxToJson />
    </div>
 );
}

export default Home;
