import styled from "styled-components";
import CompanyDirectory from "./CompanyDirectory";
import CompanyQueue from "./CompanyQueue";
import UserList from "./UserList";
import { useState, useEffect } from "react";
import CompanyCreation from "./CompanyCreation";

function CompanySettings({ user, MyCompany, setMyCompany }) {

    return (
        <div>
            {user.company.id === 1 && user.admin ? (
                <Wrapper>
                    Welcome {user.username}! Please create a company.
                    <CompanyCreation user={user} />

                </Wrapper>
            ) : user.company.id === 1 && !user.admin ? (
                <Wrapper>
                    Welcome {user.username}! Please request to join a company.
                    <CompanyDirectory user={user} />
                </Wrapper>
            ) : user.admin === false ? (

                <Wrapper><h1>you're in a company but you are not boss</h1>
                    <UserList MyCompany={MyCompany} setMyCompany={setMyCompany} />
                </Wrapper>

            ) : (

                <Wrapper><h1>you're in a company, boss</h1>
                    <CompanyQueue user={user} setMyCompany={setMyCompany} />
                    <UserList MyCompany={MyCompany} setMyCompany={setMyCompany} />
                </Wrapper>
            )
            }
        </div>

    );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 120px auto;
  padding: 16px;
`;

export default CompanySettings;