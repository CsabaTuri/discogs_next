
import React from "react";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import { useTranslation } from "next-i18next";

const Searching = (props: any): any => {
    const { handleChange, searchData, reset } = props
    console.log(JSON.stringify(props))
    const { query, artist, type, country, year, label, style, genre } = searchData
    const [open, setOpen] = React.useState<boolean>(false);
    const { t } = useTranslation("common");

    function clean(obj: any) {
        for (var propName in obj) {
            if (obj[propName] === "" || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return obj
    }

    return (
        <Row className="justify-content-md-center">
            <Col md={6}>
                <Form className="form-signin" >
                    <Collapse in={!open}>
                        <div id="simple-search">
                            <Form.Group controlId="artist">
                                <Form.Label>{t("search")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="query"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={query}
                                />
                            </Form.Group>
                        </div>
                    </Collapse>
                    <Collapse in={open}>
                        <div id="advanced-search">
                            <Form.Group controlId="artist">
                                <Form.Label>{t("artist")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="artist"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={artist}
                                />
                            </Form.Group>
                            <Form.Group controlId="label">
                                <Form.Label>{t("label")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="label"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={label}
                                />
                            </Form.Group>
                            <Form.Group controlId="year">
                                <Form.Label>{t("year")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="year"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={year}
                                    maxLength={4}
                                />
                            </Form.Group>
                            <Form.Group controlId="style">
                                <Form.Label>{t("style")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="style"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={style}
                                />
                            </Form.Group>

                            <Form.Group controlId="genre">
                                <Form.Label>{t("genre")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="genre"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={genre}
                                />
                            </Form.Group>

                            <Form.Group controlId="type">
                                <Form.Label>{t("type")}</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="type"
                                    onChange={handleChange}
                                    value={type}
                                >
                                    <option value="">{t("all")}</option>
                                    <option value="master">{t("master")}</option>
                                    <option value="release">{t("release")}</option>
                                    <option value="artist">{t("artist")}</option>
                                    <option value="label">{t("label")}</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="type">
                                <Form.Label>{t("country")}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    onChange={handleChange}
                                    autoComplete="off"
                                    value={country}
                                />
                            </Form.Group>
                        </div>
                    </Collapse>
                    <Link href={{
                        pathname: '/', query: clean(searchData)
                    }}><Button variant="outline-info" >{t("search")}</Button></Link>
                    <Link href={{
                        pathname: '/'
                    }}><Button onClick={reset} variant="outline-info" >{t("reset")}</Button></Link>

                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="form-collapse"
                        variant="outline-info"
                        aria-expanded={open}
                    >
                        {open ? t("simple") : t("advanced")}
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Searching