import styled from "styled-components";
import CompanyDirectory from "./CompanyDirectory";
import CompanyQueue from "./CompanyQueue";
import UserList from "./UserList";
import { useState, useEffect } from "react";

function CompanySettings(props) {
    const { user } = props;
    const [MyCompany, setMyCompany] = useState([]);
    useEffect(() => {
        fetch("/mycompany")
            .then((r) => r.json())
            .then((data) => {
                setMyCompany(data);
                console.log(data); // Logging the data received from the API call
            })
            .catch((error) => {
                console.error("Error fetching MyCompany data:", error);
            });
    }, []);


    return (
        <div>
            {user.company.id === 1 ? (
                <Wrapper>
                    Welcome {user.fname}! Please request to join a company from the directory.
                    <CompanyDirectory user={user} />
                </Wrapper>
            ) : user.admin === false ? (

                <Wrapper><h1>you're in a company but you are not boss</h1>
                    <UserList user={user} MyCompany={MyCompany} setMyCompany={setMyCompany} />
                </Wrapper>

            ) : (

                <Wrapper><h1>you're in a company, boss</h1>
                    <CompanyQueue user={user} setMyCompany={setMyCompany} />
                    <UserList user={user} MyCompany={MyCompany} setMyCompany={setMyCompany} />
                </Wrapper>
            )
            }
        </div>

        //     }
        // }
        //if not user.admin (give option to leave company, view userlist)
        //if user.username.company != default && user == admin then display CompanyManagementPage (change company name, userlist, approve new users)



    );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 120px auto;
  padding: 16px;
`;

export default CompanySettings;