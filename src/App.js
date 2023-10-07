import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";

function App(props) {
  return (
    <div>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <Sidebar />
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
