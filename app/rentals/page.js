import Sidebar from "../../components/Sidebar";

export default function Rentals() {
  return (
    <div style={{ display: "flex", background: "#050816", minHeight: "100vh", color: "white" }}>
      <Sidebar />
      <div style={{ padding: 30 }}>
        <h1>Rentals Page</h1>
      </div>
    </div>
  );
}