import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { submitChicken } from "../utils/api";

const emptyForm = {
  name: "",
  location: "",
  imgUrl: "",
  description: "",
};

function SubmitChicken() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  function submitForm() {
    setErrorMsg(null);
    setLoading(true);
    submitChicken(form)
      .then(() => navigate("/view"))
      .catch((e) => setErrorMsg(e))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <Header />
      <h2 className="ms-2 mt-5">Submit a Chicken</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
          <Form className="p-3">
            <FormGroup>
              <Label> Subject: </Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label>Location: </Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label> Profile Photo: </Label>
              <Input
                value={form.imgUrl}
                onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label> Tell us your Story: </Label>
              <Input
                type="textarea"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              
<div>
  <Label>When is this Chicken gonna die?</Label>
  <Input
    type="date"
  />
</div>
            </FormGroup>
            <Button color="primary" size="lg" onClick={submitForm}>
              To fry or not to fry
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

export default SubmitChicken;
