import {
  Button,
  CardBody,
  Container,
  Container2,
  Header,
  TittleHeader,
} from "./CurrencyApp-style";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";

import { MoneyOptions } from "./components/money-options.jsx";
import axios from "axios";

const { VITE_APP_API, VITE_APP_API_KEY } = import.meta.env;

const BASE_URL = `${VITE_APP_API}?apikey=${VITE_APP_API_KEY}`;

function formatMoney(amount) {
  const formatter = new Intl.NumberFormat();
  return formatter.format(amount);
}

function CurrencyApp() {
  const [moneys, setMoneys] = useState({ data: {}, meta: "" });
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [amount, setAmount] = useState(window.localStorage.getItem("amount"));
  const [total, setTotal] = useState(0);

  const setLocalStorage = (value) => {
    try {
      setAmount(value);
      window.localStorage.setItem("amount", value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getMoney() {
      const { data: response } = await axios.get(BASE_URL);
      setMoneys(response);
    }

    getMoney().catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    async function Convert() {
      const { data: response } = await axios.get(BASE_URL, {
        params: { base_currency: convertFrom, currencies: convertTo },
      });
      const ConvertToValue = response.data[convertTo].value;
      setTotal(amount * ConvertToValue);
    }
    if (amount < 0) {
      return;
    }
    Convert();
  }, [amount, convertTo, convertFrom]);

  function exchangeCurrencies() {
    setConvertTo(convertFrom);
    setConvertFrom(convertTo);
  }

  return (
    <>
      <Container className="container-fluid">
        <Header>
          <TittleHeader>Currency Exchange</TittleHeader>
        </Header>
      </Container>

      <Container2>
        <CardBody className="rounded" md={12}>
          <div className="row mb-5 text-center">
            <div className="col-12 text-secondary">
              Select your currency conversion.
            </div>
          </div>

          <Row className="mb-4">
            <Col md={2}>
              <FormGroup>
                <Label for="exampleConvert">Convert</Label>
                <Input
                  id="exampleConvert"
                  className="border-top-0 border-start-0 border-end-0 border-info"
                  name="convert"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setLocalStorage(e.target.value || 0)}
                  type="number"
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <Label>Base currency</Label>
              <MoneyOptions
                moneys={Object.values(moneys.data)}
                value={convertFrom}
                onChange={setConvertFrom}
              />
            </Col>

            <Button
              className="btn btn-outline-info fs-4 p-0 border-top-0 border-start-0 border-end-0"
              onClick={exchangeCurrencies}
            >
              ←→
            </Button>

            <Col md={4}>
              <Label>Destination currency</Label>
              <MoneyOptions
                moneys={Object.values(moneys.data)}
                value={convertTo}
                onChange={setConvertTo}
              />
            </Col>
          </Row>

          <div>
            <Col md={11}>
              <FormGroup>
                <Label for="exampleResponse">Response</Label>
                <Input
                  className="border-top-0 border-start-0 border-end-0 border-info fs-3 text-secondary"
                  id="exampleResponse"
                  name="response"
                  type="text"
                  value={formatMoney(total)}
                  readOnly
                />
              </FormGroup>
            </Col>
          </div>

          <div>
            <Col md={11}>
              <FormGroup>
                <Label className="fs-6 text-secondary" for="exampleMeta">
                  Last meta update
                </Label>
                <Input
                  className="border-0 fs-6 text-secondary"
                  id="exampleMeta"
                  name="meta"
                  type="text"
                  value={Object.values(moneys.meta)}
                  readOnly
                />
              </FormGroup>
            </Col>
          </div>
        </CardBody>
      </Container2>
    </>
  );
}

export default CurrencyApp;
