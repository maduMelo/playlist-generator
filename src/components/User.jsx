import './User.css';

function User( { data } ) {
    return (
        <div className="user-container">
            <img src={data.images[0].url} alt={data.display_name} />

            <div>
               <h3>{data.display_name}</h3>
                <p>{data.email}</p> 
            </div>
            
        </div>
    );
};

export default User;