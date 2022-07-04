import { useState } from "react";
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";

import { EditOutlined } from "@ant-design/icons";
import UpdateCar from "../forms/UpdateCar";

const getStyles = () => ({
  card: {
    width: "450px",
  },
});

const Car = (props) => {
  const styles = getStyles();
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "year":
        setYear(value);
        break;

      case "make":
        setMake(value);
        break;

      case "model":
        setModel(value);
        break;

      case "price":
        setPrice(value);
        break;

      case "personId":
        setPersonId(value);
        break;

      default:
        break;
    }
  };

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });
  let formattedPrice = formatter.format(price);

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={props.id}
          year={props.year}
          make={props.make}
          model={props.model}
          price={props.price}
          personId={props.personId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
          style={styles.card}
        >
          {make} {model} ({year}) {formattedPrice}
        </Card>
      )}
    </div>
  );
};

export default Car;
