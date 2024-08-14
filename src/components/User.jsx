function User( { data } ) {
    return (
        <div>
            <h2>{data.display_name}</h2>
            <img src={data.images[0].url} alt={data.display_name} />
            <p>ID: {data.id}</p>
            <p>Country: {data.country}</p>
            <p>Email: {data.email}</p>
        </div>
    );
};

export default User;