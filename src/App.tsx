import "./App.css";
import TableCompany from "./components/TableCompany/TableCompany";
import { TableStaff } from "./components/TableStaff/TableStaff";

function App() {
  return (
    <div className="body">
      <div style={{ width: "100%" }}>
        <TableCompany />
      </div>
      <div style={{ width: "100%" }}>
      <TableStaff />
      </div>
    </div>
  );
}

export default App;
