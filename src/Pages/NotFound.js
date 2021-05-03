import { Link } from "react-router-dom";
import Page from "../Components/Layout/Page";

const NotFound = () => {
  return (
    <Page title="Not found">
      <div className="text-center">
        <h2>404 Not Found</h2>
        <p className="lead text-muted">
          Back to{" "}
          <Link to="/" className="">
            {" "}
            homepage
          </Link>
        </p>
      </div>
    </Page>
  );
};

export default NotFound;
