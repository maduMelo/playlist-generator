import './User.css';

function User( { data } ) {
    return (
        <div className="user-container">
            <img src={data.images[1].url} alt={data.display_name} />

            <div>
               <h1>{data.display_name}</h1>
                <p>{data.email}</p> 
            </div>
            
        </div>
    );
};

export default User;