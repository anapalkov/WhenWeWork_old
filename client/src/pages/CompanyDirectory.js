import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import "react-table/react-table.css"


function CompanyDirectory() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch("/companies")
            .then((r) => r.json())
            .then(setCompanies);
    }, []);

    return (
        <div>
            <h2>Company Directory</h2>
            <table class="content-table">
                <tr>
                    <th>Company Name</th>
                    <th>Key</th>
                    <th>Admins</th>
                </tr>

                {companies.length > 0 ? (
                    companies.map((company) => (
                        <tr>
                            <th>{company.name}</th>
                            <th>{company.secretkey}</th>
                            <th>{company.users.map(user => user.admin ? user.username + " " : "")}</th>
                        </tr>
                    ))


                ) : (
                    <>
                        <h2>No Users Found</h2>
                        {/* <Button as={Link} to="/new">
            Make a New Recipe
          </Button> */}
                    </>
                )}
            </table>
        </div>
    );



}





export default CompanyDirectory;
