import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />

      <div className="container">
        <h1>UdeSA Movies</h1>

        
        <form className="search-form">
          <input type="text" name="searchData" placeholder="Buscar..." />
          <button type="submit" className="btn btn-success btn-sm">
            Buscar
          </button>
        </form>

        <h2 className="alert alert-primary">Popular movies this week</h2>
        <section className="row cards">

          <article className="single-card-movie">
            <img
              src="https://image.tmdb.org/t/p/w500/tzrJulItjttxzoX0t3B2My46TS7.jpg"
              className="card-img-top"
              alt=""
            />
            <div className="cardBody">
              <h5>The Thursday Murder Club</h5>
              <p>A group of senior sleuths...</p>
              <button className="btn btn-primary">Ver más</button>
            </div>
          </article>

          

        </section>

        <h2 className="alert alert-primary">Movies now playing</h2>
        <section className="row cards">
          
        </section>

        <h2 className="alert alert-warning">Popular TV shows this week</h2>
        <section className="row cards">
          
        </section>

        <h2 className="alert alert-warning">TV shows airing today</h2>
        <section className="row cards">
          
        </section>

      </div>

      <Footer />
    </>
  );
}

export default Home;