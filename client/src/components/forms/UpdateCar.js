import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";
import { useQuery } from "@apollo/client";

const UpdateCar = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);

  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
    });

    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
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

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Form
      form={form}
      name="update-contact-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input car producer!" }]}
      >
        <Input
          placeholder="i.e. Volkswagen"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input the car model!" }]}
      >
        <Input
          placeholder="i.e. Golf"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="year"
        rules={[
          { required: true, message: "Please input the year of the car!" },
        ]}
      >
        <Input
          placeholder="i.e. 1998"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the car price!" }]}
      >
        <Input
          placeholder="i.e. 55000"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please input the car price!" }]}
      >
        <Select
          placeholder="Select the owner ID"
          name="personId"
          onChange={(value) => setPersonId(value)}
        >
          {data.people.map((person) => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
