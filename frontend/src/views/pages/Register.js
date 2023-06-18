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
import useApi from "components/api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const strengthLevels = ['Strong', 'Medium', 'Weak'];
const strengthTextColor = ['text-success', 'text-warning', 'text-danger'];

const Register = () => {
  const api = useApi;
  const navigate = useNavigate();

  const [error, setError] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    level: strengthLevels[2],
    color: strengthTextColor[2]
  })
  const [errorMsg, setErrorMsg] = useState("")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const verifyPassword = (password) => {
    setData({
      name: data.name,
      email: data.email,
      password,
    })

    const passCount = data.password.length;
    if (passCount >= 8) {
      setPasswordStrength({
        level: strengthLevels[0],
        color: strengthTextColor[0]
      });
    } else if (passCount >= 4 && passCount <= 7) {
      setPasswordStrength({
        level: strengthLevels[1],
        color: strengthTextColor[1]
      });
    } else {
      setPasswordStrength({
        level: strengthLevels[2],
        color: strengthTextColor[2]
      });
    }
  }

  const handlerSubmit = async () => {
    const res = await api.signup(data);

    if (!res.error) {
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/admin')
    } else {
      setError(true);
      setErrorMsg(res.error);
    }
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className={error ? "text-center text-danger mb-4" : "text-center text-muted mb-4"}>
              <small>{error ? errorMsg : "Fill in the fields to register"}</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setData({
                      name: e.target.value,
                      email: data.email,
                      password: data.password
                    })} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                      name: data.name,
                      email: e.target.value,
                      password: data.password,
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
                    onChange={(e) => verifyPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className={passwordStrength.color + " font-weight-700"}>{passwordStrength.level}</span>
                </small>
              </div>
              <div className="text-center">
                <Button onClick={handlerSubmit} className="mt-4" color="primary" type="button">
                  Signup
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
