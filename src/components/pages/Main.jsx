function Main() {
    const accessToken = localStorage.getItem('access_token');

    return (
        <div>
            <h1>Main Page</h1>
            { accessToken ? <p>Gerou token</p> : <p>Não gerou token</p> }
        </div>
    );
};

export default Main;