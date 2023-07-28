import styled from "styled-components";
import CompanyDirectory from "./CompanyDirectory";
import UserList from "./UserList";
function CompanySettings(props) {
    const { user } = props;
    return (
        <div>
            {user.company.id === 1 ? (
                <Wrapper>
                    Welcome {user.username}! Please request to join a company from the directory.
                    <CompanyDirectory user={user} />
                </Wrapper>
            ) : user.admin === false ? (

                <Wrapper><h1>you're in a company but you are not boss</h1>
                    <UserList />
                </Wrapper>

            ) : (

                <Wrapper><h1>you're in a company, boss</h1>
                    <UserList />
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