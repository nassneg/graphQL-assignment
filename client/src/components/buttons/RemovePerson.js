import { useMutation } from "@apollo/client";
import { filter } from "lodash";

import { DeleteOutlined } from "@ant-design/icons";

import { GET_PEOPLE, REMOVE_PERSON } from "../../queries";

const RemovePerson = (props) => {
  const { id } = props;
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (c) => c.id !== removePerson.id),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to remove this person?");

    if (result) {
      removePerson({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
