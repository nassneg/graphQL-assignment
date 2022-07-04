import { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/RemovePerson";
import LearnMore from "../buttons/LearnMore";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../forms/UpdatePerson";
import Car from "../listItems/Car";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import { List } from "antd";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const Person = (props) => {
  const styles = getStyles();
  const [idTest] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <LearnMore id={props.id} />,
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={idTest} />,
          ]}
          style={styles.card}
        >
          {firstName} {lastName}
          {data.cars.map(({ id, year, make, model, price, personId }) => {
            if (personId === idTest) {
              return (
                <List.Item key={id}>
                  <Car
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                  />
                </List.Item>
              );
            }
          })}
        </Card>
      )}
    </div>
  );
};

export default Person;
