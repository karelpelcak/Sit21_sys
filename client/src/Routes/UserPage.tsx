import { useParams } from 'react-router-dom';
import { useData } from '../Checker';
 //FIXCODE: Do desing and connection to backend
const LoggedUser = () => {
    const { data } = useData();
    return (
        <div>
            <span>{data?.firstname} {data?.lastname}</span>
            <span>{data?.username}</span>
            <span>{data?.email}</span>
        </div>
    );
};

const NotLoggedUser = () => {
    return (
        <div>
            not logged
        </div>
    );
};

const UserPage = () => {
    const { data } = useData();
    let { username } = useParams();

    const isLoggedUser = () => {
        return username === data?.username;
    };

    return (
        <div>{isLoggedUser() ? <LoggedUser /> : <NotLoggedUser />}</div>
    );
};

export default UserPage;
