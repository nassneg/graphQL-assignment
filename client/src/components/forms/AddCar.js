import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
const AddCar = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [personId, setPersonId] = useState("");

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS });
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return data.people.length === 0 ? (
    ""
  ) : (
    <Form
      form={form}
      name="add-contact-form"
      // layout="inline"
      onFinish={onFinish}
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input car producer!" }]}
      >
        <Input placeholder="i.e. Volkswagen" />
      </Form.Item>

      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input the car model!" }]}
      >
        <Input placeholder="i.e. Golf" />
      </Form.Item>

      <Form.Item
        name="year"
        rules={[
          { required: true, message: "Please input the year of the car!" },
        ]}
      >
        <Input placeholder="i.e. 1998" />
      </Form.Item>

      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the car price!" }]}
      >
        <Input placeholder="i.e. 55000" />
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
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
