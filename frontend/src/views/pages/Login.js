/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import { useState } from "react";
import useApi from "components/api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const api = useApi
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [data, setData] = useState({
    email: "",
    pass: ""
  });

  const handlerLogin = async () => {
    const res = await api.signin(data.email, data.pass);
    if (!res.error) {
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/admin');
    } else {
      setError(true)
      setErrorMsg(res.error)
    }
  }


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small className={error ? "text-danger" : ""}>{error ? errorMsg : "Fill in the fields below to enter"}</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => setData({
                      email: e.target.value,
                      pass: data.pass
                    })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setData({
                      email: data.email,
                      pass: e.target.value,
                    })}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button onClick={handlerLogin} className="my-4" color="primary" type="button">
                  Signin
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
