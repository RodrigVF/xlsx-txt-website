import XlsxToJson from "../components/XlsxToJson";

const Home = () => {

    const jsonToTxT = (json) => {
        try {
        setTimeout(() => {
            const element = document.createElement("a");
            const file = new Blob([document.getElementById('myInput').innerText], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "ResultFile.txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        }, 1000);
    }
    catch (error) {
        console.error(error);
        return (
            <p> {error} </p>
        );
    }
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
