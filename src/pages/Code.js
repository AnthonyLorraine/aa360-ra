import {useEffect, useState} from "react";
import jsonData from '../code/small_example.json';
import Node from "../components/Node";
import VariableList from "../components/VariableList"; // Adjust the path based on your project structure

const Code = () => {
    const [loadedData, setLoadedData] = useState(null);

    useEffect(() => {
        // Process or set the data as needed
        setLoadedData(jsonData);
    }, []); // The empty dependency array ensures that the effect runs only once after the initial render

    return <>
        {loadedData ? (
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
        ) : (
            <p>Loading JSON data...</p>
        )}
    </>;
};

export default Code;