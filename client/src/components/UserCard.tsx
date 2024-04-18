interface UserProps {
  username: string;
  userHref: string;
}

const UserCard: React.FC<UserProps> = ({ username, userHref }) => {

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-header">
            <h5 className="card-title mb-0 text-secondary text-center">
              {username}
            </h5>
          </div>
          <div className="card-body text-center">
            <a href={`/user/${userHref}`} className="btn btn-custom text-secondary">
              Přejít na profil 
            </a> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
