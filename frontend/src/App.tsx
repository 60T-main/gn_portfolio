import "./App.css";
import IPhoneScene from "./components/IphoneModel";
import Footer from "./components/Footer";
import { PageProvider } from "./hooks/PageStates";

function App() {
  return (
    <>
      <PageProvider>
        <IPhoneScene />
        <Footer />
      </PageProvider>
    </>
  );
}

export default App;
