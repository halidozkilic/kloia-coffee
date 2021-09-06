import React from "react";
import { Container, Row, Col } from "reactstrap";

import CoffeePage from "./pages/CoffeePage";

function App() {
  return (
    <div className="App">
      <Container className="mt-5">
        <CoffeePage></CoffeePage>
      </Container>
    </div>
  );
}

export default App;
