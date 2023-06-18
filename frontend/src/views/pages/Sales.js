import {
    Container,
    Row,
    Card,
    Col,
    CardHeader,
    CardBody,
    Button,
    Modal,
    Form,
    FormGroup,
    Input,
    Alert,
    Spinner
} from "reactstrap";


import HeaderPages from "components/Headers/HeaderPages";
import useApi from "components/api/api";
import { useState, useEffect } from "react";

const date = new Date();
const today = date.toISOString().split('T')[0];

const getUserId = () => {
    const storage = localStorage.getItem('user');
    const user = JSON.parse(storage);
    const userId = user.id;

    return userId;
}

const Sales = () => {
    const api = useApi;
    const [modalActive, setModalActive] = useState(false);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({
        product_id: 0,
        user_id: getUserId(),
        price: 0,
        multipliedPriceFormatted: "0",
        datetime: today,
        quantity: 1
    });
    const [loader, setLoader] = useState(false);
    const [productName, setProductName] = useState("");

    const [error, setError] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const getProducts = async () => {
        const res = await api.getProducts();

        setProducts(res.products);
    }

    const formatCurrency = (value) => {
        const numericValue = value.replace(/[^0-9]/g, "");

        const formattedValue = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(numericValue / 100);

        const formattedValueWithoutCurrency = formattedValue.replace(/\$/g, "");
        return formattedValueWithoutCurrency;
    };

    const handlerQuantity = (e) => {
        let quantity = parseInt(e.target.value);
        const multiply = quantity > 0 ? data.price * quantity : 0;

        setData({
            ...data,
            multipliedPriceFormatted: "$ " + formatCurrency(multiply.toFixed(2).toString()),
            quantity
        })
    }

    const handlerOpenModal = (product_id, price, productName) => {
        setData({
            ...data,
            product_id,
            price: parseFloat(price),
            multipliedPriceFormatted: "$ " + formatCurrency(price)
        })
        setProductName(productName);

        toggleModal();
    }

    const handlerSubmitSale = async () => {
        setLoader(true);
        let actualData = data;

        delete actualData.multipliedPriceFormatted;
        const res = await api.createSale(actualData);

        setAlertContent(!res.error ? res.msg : res.error);
        setError(res.error ? true : false);
        setAlertVisible(true);
        setLoader(false);
        toggleModal();
    }

    const onDismiss = () => setAlertVisible(!alertVisible);

    const toggleModal = () => setModalActive(!modalActive);

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <>
            <HeaderPages />
            <Container className="mt--7" fluid>
                <Alert color={error ? 'danger' : 'success'} isOpen={alertVisible} toggle={onDismiss}>
                    <strong>{alertContent}</strong>
                </Alert>
                <Row>

                    {products.map((product) => {
                        let unitPrices = {
                            formated: formatCurrency(product.price),
                            normal: parseFloat(product.price)
                        };

                        let taxes = {
                            formated: "0",
                            normal: 0
                        };

                        let total = {
                            total_taxes_formated: "0",
                            total_taxes_normal: 0,
                            total_purchases_formated: "0",
                            total_purchases_normal: 0
                        }

                        let taxCurrencyValue = 0;
                        let quantity = parseInt(product.quantity);
                        taxCurrencyValue = unitPrices.normal * (product.product_type_tax / 100);

                        taxes.formated = formatCurrency(taxCurrencyValue.toFixed(2).toString());
                        taxes.normal = taxCurrencyValue;

                        let handlerTotalTaxes = taxes.normal * quantity;
                        let handlerTotalPurchases = unitPrices.normal * quantity;

                        total.total_taxes_formated = formatCurrency(handlerTotalTaxes.toFixed(2).toString());
                        total.total_taxes_normal = handlerTotalTaxes.toFixed(2);
                        total.total_purchases_formated = formatCurrency(handlerTotalPurchases.toFixed(2).toString());
                        total.total_purchases_normal = handlerTotalPurchases.toFixed(2);

                        return (
                            <Col key={product.id} className="mb-5 mt-5 mb-xl-0" xl="4">
                                <Card className="card-profile shadow">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href="#" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="rounded-circle"
                                                        src={require("../../assets/img/icons/common/product.png")}
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
                                                href="#"
                                                onClick={() => handlerOpenModal(product.id, product.price, product.name)}
                                                size="sm"
                                            >
                                                Sell
                                            </Button>
                                            <Button
                                                className="float-right"
                                                color="default"
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                $ {unitPrices.formated}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-0 pt-md-4">
                                        <Row>
                                            <div className="col">
                                                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                                    <div>
                                                        <span className="heading">$ {unitPrices.formated}</span>
                                                        <span className="description">Unit</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">$ {taxes.formated}</span>
                                                        <span className="description">Tax ({product.product_type_tax}%)</span>
                                                    </div>
                                                    <div>
                                                        <span className="heading">{product.quantity}</span>
                                                        <span className="description">Quantity</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Row>
                                        <div className="text-center">
                                            <h3>
                                                {product.name}
                                            </h3>
                                            <div className="h5 font-weight-300">
                                                <i className="ni location_pin mr-2" />
                                                {product.supplier}, {product.product_type_name}
                                            </div>
                                            <div>
                                                <span className="description">Total Purchases: </span>
                                                <span className="heading">$ {total.total_purchases_formated}</span>
                                            </div>
                                            <div>
                                                <span className="description">Total Taxes: </span>
                                                <span className="heading">$ {total.total_taxes_formated}</span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}

                </Row>

                <Modal
                    className="modal-dialog-centered"
                    isOpen={modalActive}
                    toggle={toggleModal}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Sell
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={toggleModal}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <div className="pl-lg-2">
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-product"
                                            >
                                                Product:
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                id="input-product"
                                                value={productName}
                                                readOnly
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-price"
                                            >
                                                Sale Value
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                id="input-price"
                                                value={data.multipliedPriceFormatted}
                                                readOnly
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
                                                Quantity*
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-lote"
                                                type="number"
                                                defaultValue={1}
                                                onChange={handlerQuantity}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-lote"
                                            >
                                                Date of Sale*
                                            </label>
                                            <Input
                                                className="form-control-alternative"
                                                id="input-lote"
                                                type="date"
                                                defaultValue={data.datetime}
                                                required
                                            />

                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={toggleModal}
                        >
                            Close
                        </Button>
                        <Button onClick={handlerSubmitSale} disabled={loader} color="success" type="button">
                            {loader && (<><Spinner size="sm" />&nbsp;&nbsp;</>)}Create Sale
                        </Button>
                    </div>
                </Modal>
            </Container>
        </>
    )
}

export default Sales;