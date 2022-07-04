import "../../App.css";
import "antd/dist/antd.css";
import Title from "../layout/Title";
import People from "../lists/People";
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar";

const Home = () => (
  <div className="App">
    <Title />
    <AddPerson />
    <AddCar />
    <People />
  </div>
);

export default Home;
