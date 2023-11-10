import { useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import AccountMenuLeft from "./component/Account/Account-menuleft";

function App(props) {
  let param1 = useLocation();
  return (
    <div>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            {/* <Sidebar /> */}
            {param1["pathname"].includes("account") ? (
              <AccountMenuLeft />
            ) : (
              <Sidebar />
            )}

            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
