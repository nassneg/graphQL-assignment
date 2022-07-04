import { Button } from "antd";
import { Link } from "react-router-dom";

const LearnMore = ({ id }) => {
  return (
    <Button type="primary">
      <Link to={`/people/${id}`}>Learn More</Link>
    </Button>
  );
};

export default LearnMore;
