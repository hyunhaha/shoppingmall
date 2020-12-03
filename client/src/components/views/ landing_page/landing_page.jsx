import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LandingPage = props => {
  const history = useHistory();
  useEffect(() => {
    axios.get("/api/hello").then(response => console.log(response.data));
  }, []);
  const onClick = () => {
    axios
      .get("/api/users/logout") //
      .then(response => {
        console.log(response.data);
        if (response.data.logoutSuccess) {
          history.push("/login");
        }
      });
  };
  return (
    <div>
      <div>LandingPage</div>
      <button onClick={onClick}>logout</button>
    </div>
  );
};

export default LandingPage;
