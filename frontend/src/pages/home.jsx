import React from "react";

const Home = () => {
    return (
        <section className="vh-100">
            <div className="row">
                <div className="col-12">
                    Hello { localStorage.getItem('user')}!
                </div>
            </div>
        </section>

    )
}


export default Home;