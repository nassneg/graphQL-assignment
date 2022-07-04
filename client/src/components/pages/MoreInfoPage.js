import "../../App.css";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import Title from "../layout/Title";
import { useParams } from "react-router-dom";
import { GET_CARS_BY_PERSON } from "../../queries";
import { useQuery } from "@apollo/client";
import Car from "../listItems/Car";
import { List } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";

const More = () => {
  let { id } = useParams();

  // To disable submit button at the beginning.
  useEffect(() => {}, []);

  const { loading, error, data } = useQuery(GET_CARS_BY_PERSON, {
    variables: { personId: id, id: id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      <Button type="primary">
        <Link to={`/`}>GO BACK HOME</Link>
      </Button>
      <Title />
      {data.person.firstName} {data.person.lastName}
      {data.carByPerson.map(({ id, year, make, model, price, personId }) => {
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
      })}
    </div>
  );
};

export default More;
