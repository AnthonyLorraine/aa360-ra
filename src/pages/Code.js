import {useContext, useEffect, useState} from "react";
import VariableList from "../components/VariableList";
import PropertiesContext from "../context/PropertiesContext";
import PropertyRenderer from "../components/PropertyRenderer";
import NodeList from "../components/NodeList";


const Code = ({jsonData, scriptTitle}) => {
    let jsonDataProvided = false
    if (jsonData) {
        localStorage.removeItem("json_data");
        localStorage.setItem("json_data", JSON.stringify(jsonData));
        jsonDataProvided = true
    }
    const [loadedData, setLoadedData] = useState(jsonData);
    const [errorMessage, setErrorMessage] = useState(null);
    const [titleName, setTitleName] = useState(scriptTitle);
    const {currentProperty} = useContext(PropertiesContext);

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
        setTitleName(file.name)
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
            const response = await fetch('/small_example.json');
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
        localStorage.removeItem("json_data");
        setLoadedData(null);
    };


    return (<>

        {loadedData ? (
            <div className={"d-flex flex-column"}>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <span className={"h1 text-capitalize"}>{titleName}</span>
                    <div>
                        {jsonDataProvided ? "" : <button className={"btn btn-outline-danger"} onClick={handleClearData}>Reset</button>}
                    </div>
                </div>

                <div className={"d-flex flex-column flex-md-row border p-md-2 rounded"}>
                    <aside style={{flex: 2, height: "80vh", overflowY: "auto"}} className={"order-1"}>
                        <VariableList variables={loadedData.variables}/>
                    </aside>

                    <main style={{flex: 6, maxHeight: "80vh", overflowY: "auto"}} className={"order-3 pe-md-4"}>
                        <ul className={"list-unstyled"}>
                            <NodeList nodes={loadedData.nodes} parentNode={{disabled: false}}/>
                        </ul>
                    </main>
                    <aside style={{flex: 3, height: "80vh", overflowY: "auto"}} className={"order-2 order-md-3 my-3 my-md-0 ms-md-2"}>
                        <hr className={"d-md-none"}/>
                        {currentProperty && (
                            <PropertyRenderer/>
                        )}
                        <hr className={"d-md-none mt-5"}/>
                        <h5 className={"d-md-none"}>Code</h5>
                    </aside>
                </div>
            </div>
        ) : (
            <>
                <input type="file" onChange={handleFileChange}/>
                Example: <button className={"btn btn-link"} onClick={handleDownload}>Download example JSON file</button>
            </>
        )}
        {errorMessage ? (<p>Error... {errorMessage}</p>) : ("")}
    </>);
};

export default Code;