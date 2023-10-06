import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Content from "./component/MainContent";

function App(props) {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
