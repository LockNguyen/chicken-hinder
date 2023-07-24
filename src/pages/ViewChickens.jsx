import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Table } from "reactstrap";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteChicken, getAllChickens } from "../utils/api";

function ViewChickens() {
  const [loading, setLoading] = useState(false);
  const [chickens, setChickens] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  function refreshChickens() {
    setErrorMsg(null);
    setLoading(true);
    getAllChickens()
      .then((data) => setChickens(data))
      .catch((e) => setErrorMsg(e))
      .finally(() => setLoading(false));
  }

  useEffect(refreshChickens, []);

  function handleDelete(id) {
    setErrorMsg(null);
    setLoading(true);
    deleteChicken(id)
      .then(() => refreshChickens())
      .catch((e) => setErrorMsg(e))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <Header />
      <hr></hr>
      <h2 className="text-center text-primary">
        <b>CHICKEN LEADERBOARD</b>
      </h2>
      <h5 className="text-center text-primary">
        All Chickens Below a Total Score of 5 Will Be FRIED!
      </h5>
      <hr></hr>
      <h2 className="ms-2 mt-5 text-primary">
        All Chickens{" "}
        <Button
          size="sm"
          style={{ color: "primary" }}
          onClick={() => navigate("/submit")}
        >
          + Add New
        </Button>
      </h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
          <Table dark hover className="mt-5">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>👎</th>
                <th>👍</th>
                <th>Total Score</th>
                <th style={{ color: "red" }}>Danger Zone</th>
              </tr>
            </thead>
            <tbody>
              {_.map(chickens, (c) => (
                <tr key={c.id}>
                  <td>
                    <img
                      src={c.imgurl}
                      style={{
                        height: "48px",
                        width: "48px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td
                    className={
                      "fw-bold " +
                      (c.score > 6 ? "text-primary" : "text-danger")
                    }
                  >
                    {c.name}
                  </td>
                  <td>{c.location}</td>
                  <td>{c.updoots}</td>
                  <td>{c.downdoots}</td>
                  <td
                    className={
                      "fw-bold " + (c.score > 0 ? "text-danger" : "text-muted")
                    }
                  >
                    {c.score} {c.score > 5 ? "🔥" : "❄️"}
                  </td>
                  <td>
                    <Button
                      style={{ color: "primary" }}
                      size="sm"
                      onClick={() => {
                        if (c.score <= 5)
                          handleDelete(c.id)}}
                    >
                      🍗 Fry
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default ViewChickens;
