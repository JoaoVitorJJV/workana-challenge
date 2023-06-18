import {
    Container,
    Row,
    Card,
    CardHeader,
    Button,
    Col,
    CardBody,
    Form,
    FormGroup,
    Input,
    Alert,
    Spinner
} from "reactstrap"

import HeaderPages from "components/Headers/HeaderPages"
import { useEffect, useState } from "react";
import useApi from "components/api/api.js";


const CreateProduct = () => {
    const api = useApi;
    const [productsType, setProductsType] = useState([]);
    const [tax, setTax] = useState({
        normal: 0,
        formated: "0",
        percentFormated: "0"
    })
    const [total, setTotal] = useState({
        formated: "0"
    })
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [data, setData] = useState({
        name: "",
        supplier: "",
        batch: 0,
        product_type_id: 0,
        unit_price: 0.00,
        unit_price_formatted: "0",
        quantity: 0,
    });

    const onDismiss = () => setAlertVisible(!alertVisible);

    const formatCurrency = (value) => {
        const numericValue = value.replace(/[^0-9]/g, "");

        const formattedValue = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(numericValue / 100);

        return formattedValue;
    };

    const formatDecimal = (value) => {
        const numericValue = value.replace(/[^0-9]/g, "");

        let formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numericValue / 100.00);

        formattedValue += " %"

        return formattedValue;
    };

    const handleChangePrice = (event) => {
        const inputValue = event.target.value;
        const formattedValue = formatCurrency(inputValue);
        const normal = convertToNumber(inputValue);
        let taxCurrencyValue = 0;

        if (inputValue !== 0) {
            taxCurrencyValue = (tax.normal / 100) * normal
        }

        let total = normal - taxCurrencyValue;
        total = total.toFixed(2)
        setData((prevData) => ({
            ...prevData,
            unit_price_formatted: formattedValue,
            unit_price: normal,
        }));

        setTotal({
            formated: formatCurrency(total.toString())
        });

        setTax({
            ...tax,
            formated: formatCurrency(taxCurrencyValue.toFixed(2).toString())
        })
    };

    const convertToNumber = (formattedValue) => {
        const numericValue = formattedValue.replace(/[^0-9]/g, "");
        const numberValue = parseFloat(numericValue) / 100;


        return numberValue;
    };

    const getProductsType = async () => {
        const res = await api.getProductsType();
        const valueNormal = parseFloat(res.productsType[0].tax);
        setProductsType(res.productsType);
        setTax({
            normal: valueNormal,
            formated: formatCurrency("0"),
            percentFormated: formatDecimal(res.productsType[0].tax)
        })
        setTotal({
            formated: formatCurrency(total.formated.toString())
        })
    }

    const handlerName = (e) => setData({
        ...data,
        name: e.target.value
    })

    const handlerSupplier = (e) => setData({
        ...data,
        supplier: e.target.value
    })

    const handlerBatch = (e) => setData({
        ...data,
        batch: e.target.value
    })

    const handlerProductType = (e) => {
        let valueFormated = "0";
        let value = 0;


        productsType.map((productType) => {
            if (productType.id === parseInt(e.target.value)) {
                valueFormated = productType.tax;
                value = parseFloat(productType.tax);
            }
        })

        let taxCurrencyValue = 0;

        if (data.unit_price !== 0) {
            taxCurrencyValue = data.unit_price * (value / 100);
        }

        let total = data.unit_price - taxCurrencyValue;

        setTax({
            normal: value,
            formated: formatCurrency(taxCurrencyValue.toString()),
            percentFormated: formatDecimal(valueFormated)
        })

        setData({
            ...data,
            product_type_id: e.target.value
        })
        setTotal({
            formated: formatCurrency(total.toString())
        })
    }

    const handlerQuantity = (e) => setData({
        ...data,
        quantity: e.target.value
    })

    const handlerSubmit = async () => {
        setLoader(true);
        data.product_type_id = data.product_type_id === 0 ? productsType[0].id : data.product_type_id;
        const res = await api.createProduct(data);

        setAlertContent(!res.error ? res.msg : res.error);
        setError(res.error ? true : false);
        setAlertVisible(true);
        setLoader(false);
    }


    useEffect(() => {
        getProductsType()
    }, [])

    return (
        <>
            <HeaderPages />
            <Container className="mt--7" fluid>
                <Row>
                    {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    <Button
                                        className="mr-4"
                                        color="info"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                    >
                                        Connect
                                    </Button>
                                    <Button
                                        className="float-right"
                                        color="default"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                    >
                                        Message
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            <div>
                                                <span className="heading">22</span>
                                                <span className="description">Friends</span>
                                            </div>
                                            <div>
                                                <span className="heading">10</span>
                                                <span className="description">Photos</span>
                                            </div>
                                            <div>
                                                <span className="heading">89</span>
                                                <span className="description">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div className="text-center">
                                    <h3>
                                        Jessica Jones
                                        <span className="font-weight-light">, 27</span>
                                    </h3>
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin mr-2" />
                                        Bucharest, Romania
                                    </div>
                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        Solution Manager - Creative Tim Officer
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                                        University of Computer Science
                                    </div>
                                    <hr className="my-4" />
                                    <p>
                                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                        Nick Murphy — writes, performs and records all of his own
                                        music.
                                    </p>
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        Show more
                                    </a>
                                </div>
                            </CardBody>
                        </Card>
                    </Col> */}
                    <Col>
                        <Alert color={error ? 'danger' : 'success'} isOpen={alertVisible} toggle={onDismiss}>
                            <strong>{alertContent}</strong>
                        </Alert>
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Create Product</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Product Information
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
                                                        onChange={handlerName}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-fornecedor"
                                                    >
                                                        Supplier*
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        type="text"
                                                        id="input-fornecedor"
                                                        onChange={handlerSupplier}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-lote"
                                                    >
                                                        Batch
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-lote"
                                                        onChange={handlerBatch}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-lote"
                                                    >
                                                        Product Type*
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-lote"
                                                        type="select"
                                                        onChange={handlerProductType}
                                                        required
                                                    >
                                                        {productsType.map((ptype => (<option key={ptype.id} value={ptype.id}>{ptype.name}</option>)))}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Product Values
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-unit-price"
                                                    >
                                                        Unit Price*
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-unit-price"
                                                        type="text"
                                                        value={formatCurrency(data.unit_price_formatted)}
                                                        onChange={handleChangePrice}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-tax"
                                                    >
                                                        Monetary Value Tax
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-tax"
                                                        type="text"
                                                        value={tax.formated}
                                                        readOnly
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-quantity"
                                                    >
                                                        Quantity*
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-quantity"
                                                        type="number"
                                                        onChange={handlerQuantity}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-total"
                                                    >
                                                        Total Profit per Unit
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-total"
                                                        type="text"
                                                        value={total.formated}
                                                        readOnly
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-total"
                                                    >
                                                        Tribute Percentage
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-total"
                                                        type="text"
                                                        value={tax.percentFormated}
                                                        readOnly
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

export default CreateProduct