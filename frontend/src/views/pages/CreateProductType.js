
import {
    Col,
    Container,
    Row,
    Form,
    FormGroup,
    Card,
    CardBody,
    Input,
    Button,
    CardHeader,
    Spinner,
    Alert
} from "reactstrap";

import HeaderPages from "components/Headers/HeaderPages"
import { useState } from "react";
import useApi from "components/api/api.js";

const CreateProductType = () => {
    const api = useApi;
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        name: "",
        taxFormated: "0",
        tax: 0
    })
    const [error, setError] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    const onDismiss = () => setAlertVisible(!alertVisible);

    const formatNumber = (value) => {
        const numericValue = value.replace(/[^0-9]/g, "");

        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numericValue / 100.00);

        return formattedValue;
    };

    const handleChangeTax = (event) => {
        const inputValue = event.target.value;
        const formattedValue = formatNumber(inputValue);
        const normal = convertToNumber(inputValue);

        setData((prevData) => ({
            ...prevData,
            taxFormated: formattedValue,
            tax: normal,
        }));
    };

    const convertToNumber = (formattedValue) => {
        const numericValue = formattedValue.replace(/[^0-9]/g, "");
        const numberValue = parseFloat(numericValue) / 100;

        return numberValue;
    };

    const handlerSubmit = async () => {
        setLoader(true);

        const res = await api.createProductType(data);

        setAlertContent(!res.error ? res.msg : res.error);
        setError(res.error ? true : false);
        setAlertVisible(true);
        setLoader(false);
    }

    return (
        <>
            <HeaderPages />
            <Container className="mt--7" fluid>
                <Row>
                    <Col>
                        <Alert color={error ? 'danger' : 'success'} isOpen={alertVisible} toggle={onDismiss}>
                            <strong>{alertContent}</strong>
                        </Alert>
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Create Product Type</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Product Type Information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-name"
                                                    >
                                                        Name*
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        id="input-name"
                                                        onChange={(e) => setData({
                                                            ...data,
                                                            name: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-tax"
                                                    >
                                                        Tax Percentage Value*
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        id="input-tax"
                                                        value={formatNumber(data.taxFormated)}
                                                        onChange={handleChangeTax}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>

                                    <hr className="my-4" />
                                    {/* Description */}
                                    <div className="pl-lg-4">
                                        <Button
                                            onClick={handlerSubmit}
                                            className="my-4"
                                            color="success"
                                            type="button"
                                            disabled={loader}
                                        >
                                            {loader && (<><Spinner size="sm" />&nbsp;&nbsp;</>)}Register
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CreateProductType