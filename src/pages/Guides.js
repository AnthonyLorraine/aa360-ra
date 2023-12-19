import {ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const Guides = () => {
    const navigate = useNavigate();
    const guidesData = [{
        file: "query-text-csv-using-sql",
        name: "Querying Text or CSV files using SQL Syntax",
        summary: "This guide explains how to overcome limitations when reading large text or CSV files in Automation Anywhere. It introduces the use of the Connect action to establish connections with various databases and file types. The guide covers prerequisites, installation of ODBC drivers, and provides connection string examples. Users are guided through setting up a session, reading data with SQL queries, and utilizing loops. Troubleshooting tips address issues like incorrect data reading, suggesting solutions such as creating XLSX files or defining schema files. Overall, the guide empowers users to efficiently query and manipulate data from text and CSV files in Automation Anywhere."
    },
        {
            file: "promoting-code-from-dev-to-prod",
            name: "Promoting code from DEV to PROD v27 & Earlier (On-Prem)",
            summary: "This guide outlines the process of promoting code from Development to Production in on-premises control rooms (v27 or earlier). It emphasizes planning, proper export procedures, and careful import into Production. The steps include exporting code with dependencies, downloading files, and troubleshooting using the audit log."
        }
    ]

    const handleOpenGuide = (event) => {
        let guideName = event.target.dataset.guide
        navigate(`/guide/${guideName}`);
    }
    return (
        <div className={"container-md d-flex flex-column"}>
            <h1 className={"text-center my-5"}>Guides</h1>
            <section className={"align-self-center"}>
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