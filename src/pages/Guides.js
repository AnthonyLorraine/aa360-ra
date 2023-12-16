import {ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const Guides = () => {
    const navigate = useNavigate();
    const guidesData = [{
        file: "query-text-csv-using-sql",
        name: "Querying Text or CSV files using SQL Syntax",
        summary: "This guide explains how to overcome limitations when reading large text or CSV files in Automation Anywhere. It introduces the use of the Connect action to establish connections with various databases and file types. The guide covers prerequisites, installation of ODBC drivers, and provides connection string examples. Users are guided through setting up a session, reading data with SQL queries, and utilizing loops. Troubleshooting tips address issues like incorrect data reading, suggesting solutions such as creating XLSX files or defining schema files. Overall, the guide empowers users to efficiently query and manipulate data from text and CSV files in Automation Anywhere."
    }, {
        file: "query-text-csv-using-sql",
        name: "Placeholder 1",
        summary: "This guide explains how to overcome limitations when reading large text or CSV files in Automation Anywhere. It introduces the use of the Connect action to establish connections with various databases and file types. The guide covers prerequisites, installation of ODBC drivers, and provides connection string examples. Users are guided through setting up a session, reading data with SQL queries, and utilizing loops. Troubleshooting tips address issues like incorrect data reading, suggesting solutions such as creating XLSX files or defining schema files. Overall, the guide empowers users to efficiently query and manipulate data from text and CSV files in Automation Anywhere."
    }]

    const handleOpenGuide = (event) => {
        let guideName = event.target.dataset.guide
        navigate(`/aa360-ra/guide/${guideName}`);
    }
    return (
        <div className={"container d-flex flex-column"}>
            <h1 className={"text-center my-5"}>Guides</h1>
            <section className={"w-75 align-self-center"}>
                <ListGroup variant="flush">
                    {guidesData.map((guide, index) => (
                        <>
                            <ListGroup.Item key={index}>
                                <div className="ms-2 me-auto my-5">
                                    <span className="fw-bold mb-3 text-decoration-underline cursor-pointer" data-guide={guide.file} onClick={handleOpenGuide}>{guide.name}</span>
                                    <div className={"fst-italic mt-3"}>{guide.summary}</div>
                                </div>
                            </ListGroup.Item>
                        </>
                    ))}
                </ListGroup>
            </section>
        </div>
    )
}


export default Guides;