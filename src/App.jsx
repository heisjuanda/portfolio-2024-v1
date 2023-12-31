import { RoutesConfiguration } from "./routes/Route";
import PortfolioProvider from "./context/PortfolioContext";

import "./App.css";

function App() {
  return (
    <PortfolioProvider>
      <RoutesConfiguration />
    </PortfolioProvider>
  );
}

export default App;
