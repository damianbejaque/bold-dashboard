import "./App.css";
import { MyBussiness } from "./components/pages";
import { Header } from "./components/shared";

function App() {
  return (
    <>
      <Header />
      <div className="mt-16">
        <MyBussiness />
      </div>
    </>
  );
}

export default App;
