import styled from "styled-components";
import CompanyDirectory from "./CompanyDirectory";
import CompanyQueue from "./CompanyQueue";
import UserList from "./UserList";
import { useState, useEffect } from "react";
import CompanyCreation from "./CompanyCreation";

function CompanySettings({ user, myCompany, setMyCompany }) {

    return (
        <div>
            {user.company.id === 1 && user.admin ? (
                <Wrapper>
                    Welcome <span className="bold-text">{user.username}</span>! Please create a company.
                    <CompanyCreation user={user} />

                </Wrapper>
            ) : user.company.id === 1 && !user.admin ? (
                <Wrapper>
                    Welcome <span className="bold-text">{user.username}</span>! Please request to join a company.
                    <CompanyDirectory user={user} />
                </Wrapper>
            ) : user.admin === false ? (

                <Wrapper>
                    Welcome <span className="bold-text">{user.username}</span>!
                    You're an <span className="bold-text">EMPLOYEE</span> at <span className="bold-text">{myCompany.name}</span>!
                    <UserList myCompany={myCompany} setMyCompany={setMyCompany} />
                </Wrapper>

            ) : (

                <Wrapper>
                    Welcome <span className="bold-text">{user.username}</span>! You're an <span className="bold-text">ADMIN</span> at <span className="bold-text">{myCompany.name}</span>!
                    <CompanyQueue user={user} setMyCompany={setMyCompany} />
                    <UserList myCompany={myCompany} setMyCompany={setMyCompany} />
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