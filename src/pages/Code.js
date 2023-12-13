import {useEffect, useState} from "react";
import Node from "../components/Node";
import VariableList from "../components/VariableList";

const Code = () => {
    const [loadedData, setLoadedData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            try {
                const storedData = localStorage.getItem("json_data");
                if (storedData) {
                    setLoadedData(JSON.parse(storedData));
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        fetchData();
    }, []);

    const handleFileChange = async (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setLoadedData(data);
                    // Save data to localStorage
                    localStorage.setItem("json_data", JSON.stringify(data));
                } catch (error) {
                    setErrorMessage(error);
                }
            };

            reader.readAsText(file);
        }
    };
    const handleDownload = async () => {
        try {
            const response = await fetch('/aa360-ra/small_example.json');
            const content = await response.text();

            const blob = new Blob([content], {type: 'application/json'});

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);

            link.download = 'small_example.json';
            link.click();

            URL.revokeObjectURL(link.href);
        } catch (error) {
            setErrorMessage(error)
        }
    };
    const handleClearData = () => {
        // Clear data from localStorage
        localStorage.removeItem("json_data");
        // Reset state
        setLoadedData(null);
    };

    return <>
        {loadedData ? (
            <div className={"d-flex flex-column"}>
                <div className={"d-flex justify-content-between"}>
                    <span className={"h1"}>Loaded Script</span>
                    <div>
                        <button className={"btn btn-outline-danger"} onClick={handleClearData}>Reset</button>
                    </div>
                </div>

                <div className={"d-flex"}>
                    <aside style={{flex: 1, height: "80vh", overflowY: "auto"}}>
                        <VariableList variables={loadedData.variables}/>
                    </aside>
                    <main style={{flex: 4, height: "80vh", overflowY: "auto"}} className={"me-3 pe-4"}>
                        <ul className={"list-unstyled ms-5"}>
                            <Node node={loadedData.nodes[0]}/>
                        </ul>
                    </main>
                    <aside style={{flex: 1, height: "80vh", overflowY: "auto"}}>Props</aside>
                </div>
            </div>
        ) : (
            <>
                <input type="file" onChange={handleFileChange}/>
                Example:  <button className={"btn btn-link"} onClick={handleDownload}>Download example JSON file</button>
            </>
        )}
        {errorMessage ? (<p>Error... {errorMessage}</p>) : ("")}
    </>;
};

export default Code;