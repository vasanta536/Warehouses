import React, { useState, useEffect } from 'react';
import homeLogo from '../assets/homeLogo.jpg';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/custom.scss"
import ImageModal from "./ImageModal"
import stateCityMap from '../data/stateCityMap';
import Button from "@mui/material/Button";

type WarehouseFormValues = {
    name: string;
    address1: string;
    address2: string;
    stateName: string;
    city: string;
    area: string;
    gstNo: string;
    pincode: string;       
    plotArea: string;
    noOfDocs: string;
    storageHeight: string;
    coveredArea: string;
    noOfGate: string;
    parkingArea: string;
    frontViewImage: File | null;
    gateViewImage: File | null;
    coveredAreaImage: File | null;
    outsideImage: File | null;
};

const WarehouseSchema = Yup.object().shape({
    name: Yup.string().min(3).required("Warehouse name is required"),
    address2: Yup.string().nullable(),
    stateName: Yup.string().required("State is required"),
    pincode: Yup.string().matches(/^\d+$/, "Pincode must be numeric").length(6, "Pincode must be exactly 6 digits").required("Pincode is required"),

    plotArea: Yup.number().typeError("Plot Area must be a number").positive().required("Plot area is required"),
    noOfDocs: Yup.number().typeError("No of Docs must be a number").positive("Must be positive").nullable(),
    storageHeight: Yup.number().typeError("Storage Height must be a number").required("Storage Height is required"),
    frontViewImage: Yup.mixed<File | string>()
        .test("fileSize", "File size must be less than 2MB", (value) => {
            if (!value || typeof value === "string") return true; 
            return value.size <= 2 * 1024 * 1024;
        })
        .test("fileType", "Only image files are allowed", (value) => {
            if (!value || typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        })
        .nullable(),


    gateViewImage: Yup.mixed<File | string>()
        .test("fileSize", "File size must be less than 2MB", (value) => {
            if (!value || typeof value === "string") return true; 
            return value.size <= 2 * 1024 * 1024;
        })
        .test("fileType", "Only image files are allowed", (value) => {
            if (!value || typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        })
        .nullable(),

    coveredAreaImage: Yup.mixed<File | string>()
        .test("fileSize", "File size must be less than 2MB", (value) => {
            if (!value || typeof value === "string") return true; 
            return value.size <= 2 * 1024 * 1024;
        })
        .test("fileType", "Only image files are allowed", (value) => {
            if (!value || typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        })
        .nullable(),

    outsideImage: Yup.mixed<File | string>()
        .test("fileSize", "File size must be less than 2MB", (value) => {
            if (!value || typeof value === "string") return true; 
            return value.size <= 2 * 1024 * 1024;
        })
        .test("fileType", "Only image files are allowed", (value) => {
            if (!value || typeof value === "string") return true;
            return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        })
        .nullable(),

    address1: Yup.string().required("Address is required"),
    area: Yup.string().required("Area is required"),
    city: Yup.string().required("City is required"),
    gstNo: Yup.string().nullable(),
    coveredArea: Yup.number().typeError("Covered Area must be a number").positive().required("Covered Area is required"),
    noOfGate: Yup.number().typeError("No Of Gate must be a number").positive("Must be positive").nullable(),
    parkingArea: Yup.number().typeError("Parking Area must be a number").positive("Must be positive").nullable(),
});


export default function AddWarehouseForm(): React.ReactElement {
    // const API_URL = process.env.REACT_APP_MONGODB_API_URL ||"http://localhost:5000/api"; 
    const API_URL = process.env.REACT_APP_POSTGRES_API_URL || "http://localhost:5001/api";

    const navigate = useNavigate()
    const location = useLocation();
    const { id } = location.state || {};
    const [success, setSuccess] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [data, setData] = useState<WarehouseFormValues>({
        name: "",
        address1: "",
        address2: "",
        stateName: "",
        pincode: "",          
        plotArea: "",
        noOfDocs: "",
        storageHeight: "",
        frontViewImage: null,
        gateViewImage: null,
        coveredAreaImage: null,
        outsideImage: null,
        area: "",
        city: "",
        gstNo: "",
        coveredArea: "",
        noOfGate: "",
        parkingArea: "",
    })

    useEffect(() => {
        if (id) {

            axios.get(`${API_URL}/warehouse/${id}`)
                .then(res => {
                    console.log("get by id result", res.data)
                    setData(res.data)
                })
                .catch(err => console.error("Error fetching warehouses:", err));
        }

    }, [id])

    useEffect(() => {
        if (success || errorMessage) {
            const timer = setTimeout(() => {
                setSuccess(null);
                setErrorMessage(null);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [success, errorMessage]);


    const onSubmit = async (
        values: WarehouseFormValues,
        { resetForm }: { resetForm: () => void }
    ) => {

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("stateName", values.stateName);
        formData.append("pincode", values.pincode);
        formData.append("plotArea", values.plotArea);
        formData.append("storageHeight", values.storageHeight);
        formData.append("address1", values.address1);
        formData.append("area", values.area);
        formData.append("city", values.city);
        formData.append("coveredArea", values.coveredArea);

        if (values.address2) formData.append("address2", values.address2);
        if (values.noOfDocs) formData.append("noOfDocs", values.noOfDocs);
        if (values.gstNo) formData.append("gstNo", values.gstNo);
        if (values.noOfGate) formData.append("noOfGate", values.noOfGate);
        if (values.parkingArea) formData.append("parkingArea", values.parkingArea);

        if (values.frontViewImage instanceof File) {
            formData.append("frontViewImage", values.frontViewImage); 
        } else if (values.frontViewImage) {
            formData.append("frontViewImage", values.frontViewImage);
        }

        if (values.gateViewImage instanceof File) {
            formData.append("gateViewImage", values.gateViewImage);
        } else if (values.gateViewImage) {
            formData.append("gateViewImage", values.gateViewImage);
        }
        if (values.coveredAreaImage instanceof File) {
            formData.append("coveredAreaImage", values.coveredAreaImage);
        } else if (values.coveredAreaImage) {
            formData.append("coveredAreaImage", values.coveredAreaImage);
        }
        if (values.outsideImage instanceof File) {
            formData.append("outsideImage", values.outsideImage);
        } else if (values.outsideImage) {
            formData.append("outsideImage", values.outsideImage);
        }

        try {

            if (id) {
                const res = await axios.put(`${API_URL}/warehouse/${id}`, formData, //  use formData 
                    { headers: { "Content-Type": "multipart/form-data" } });
                console.log("Updated:", res.data);

            } else {
                const response = await axios.post(`${API_URL}/warehouses`, formData, { headers: { "Content-Type": "multipart/form-data" } });
                console.log("Response:", response.data);
            }

            resetForm();

            setSuccess("Warehouse added successfully");
            navigate("/listed-warehouse", { state: { dropdown: "ListedWarehouse" } });

        } catch (err: any) {
            console.error("Error submitting form:", err.response?.data || err.message);
            setErrorMessage(err.response?.data?.error || "An error occurred while submitting the form.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log("22222222222", e);
        const { name, value } = e.target;
        console.log("jjjjjjjjjjj", name, value)
        // Update state 
        setData((prev) => ({ ...prev, [name]: value, }));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target; if (files && files[0]) {
            setData((prev) => ({
                ...prev, [name]: files[0], 
            }));
        }
        console.log("name files", name, files)
    };

    const handleBack = () => {
        // navigate("/listed-warehouse");
        navigate("/listed-warehouse", { state: { dropdown: "ListedWarehouse" } });
    }
    const [show, setShow] = useState(false);
    function getDisplayName(value: string | File | null): string { if (!value) return ""; return value instanceof File ? value.name : value; }


    return (
        <div className="p-4  bg-light" data-testid="add-warehouse-form">

            <Formik<WarehouseFormValues>
                initialValues={{
                    name: data?.name || "",
                    address1: data?.address1 || "",
                    address2: data?.address2 || "",
                    stateName: data?.stateName || "",
                    pincode: data?.pincode || "",          
                    plotArea: data?.plotArea || "",
                    noOfDocs: data?.noOfDocs || "",
                    storageHeight: data?.storageHeight || "",
                    frontViewImage: data?.frontViewImage || null,
                    gateViewImage: data?.gateViewImage || null,
                    coveredAreaImage: data?.coveredAreaImage || null,
                    outsideImage: data?.outsideImage || null,
                    area: data?.area || "",
                    city: data?.city || "",
                    gstNo: data?.gstNo || "",
                    coveredArea: data?.coveredArea || "",
                    noOfGate: data?.noOfGate || "",
                    parkingArea: data?.parkingArea || "",
                }}
                validationSchema={WarehouseSchema}
                onSubmit={onSubmit}   
                enableReinitialize={true}
            >
                {({ setFieldValue, values, errors, touched }) => (

                    <Form className="form-tag bg-white rounded">
                        <div className='d-flex align-items-center bg-white p-2 rounded form-title'><img className="my-2 form-title-logo h-2em" src={homeLogo} alt="home logo" /><h1 className='fs-6'>Add Warehouse</h1></div>
                        <div className='bg-light my-3 p-0 hr-line' ></div>
                        <div className='d-lg-flex d-xl-flex d-xxl-flex m-3 justify-content-evenly gap-2"'>
                            <div>
                                <h2 className='position-relative fs-6 fw-bold my-3 r-lg-15'>Basic information :</h2>
                                <div>
                                    <div className="d-lg-flex mb-3 ">
                                        <label htmlFor="name" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Warehouse Name  <span className="text-danger">*</span></label>
                                        <div className='flex-grow-1'>
                                            <Field id="name" name="name"
                                                className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100"
                                                autoComplete="name"
                                                onChange={handleChange} />
                                            <ErrorMessage name="name" component="div" className="text-danger mt-1 fs-small" />

                                        </div>
                                    </div>

                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="address2" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Address2</label>
                                        <div className="flex-grow-1">
                                            <Field
                                                id="address2"
                                                name="address2"
                                                className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100"
                                                onChange={handleChange}

                                            />
                                            <ErrorMessage name="address2" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>

                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="stateName" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>State  <span className="text-danger">*</span></label>
                                        <Field as="select"
                                            id="stateName" 
                                            name="stateName" 
                                            className="form-control form-control-sm w-lg-20em w-md-100 w-sm-100 form-select" 
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                setFieldValue("stateName", e.target.value); 
                                                setFieldValue("city", "");
                                                handleChange(e) 
                                            }} >
                                                 <option value="">Select State</option> 
                                                 {Object.keys(stateCityMap).map((state) => (
                                                    <option key={state} value={state}>
                                                         {state}
                                                     </option>))} 
                                        </Field>

                                    </div>

                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="pincode" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Pincode  <span className="text-danger">*</span></label>
                                        <div className='flex-grow-1'>
                                            <Field
                                                id="pincode"
                                                name="pincode"
                                                type="text"
                                                maxLength={6} 
                                                className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100"
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage name="pincode" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                </div>
                                <h2 className='position-relative fs-6 fw-bold my-3 r-lg-15'>Warehouse information :</h2>
                                <div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="plotArea" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Total Plot Area(sqft)  <span className="text-danger">*</span></label>
                                        <div className='flex-grow-1'>
                                            <Field id="plotArea" name="plotArea" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="plotArea" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="noOfDocs" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>No. of Docs</label>
                                        <div className="flex-grow-1">
                                            <Field id="noOfDocs" name="noOfDocs" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="noOfDocs" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="storageHeight" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Storage Height(ft)  <span className="text-danger">*</span></label>
                                        <div className='flex-grow-1'>
                                            <Field id="storageHeight" name="storageHeight" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="storageHeight" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <h2 className='position-relative fs-6 fw-bold my-3 r-lg-15'>Warehouse Photo Gallery:</h2>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="frontViewImage" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Front View Photo:</label>
                                        <div className="flex-grow-1">
                                            <input
                                                id="frontViewImage"
                                                name="frontViewImage"
                                                type="file"
                                                accept="image/*"
                                                className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100"
                                                onChange={(event) => {
                                                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                                                        setFieldValue("frontViewImage", event.currentTarget.files[0]);
                                                        handleFileChange(event)
                                                    }
                                                }}
                                            />
                                            {values.frontViewImage && (
                                                <>
                                                   
                                                    <button type="button" className="btn btn-link p-0 mt-1 fs-small text-primary"
                                                        onClick={() => setShow(true)}>{getDisplayName(values.frontViewImage)}</button>
                                                    <ImageModal
                                                        show={show}
                                                        onHide={() => setShow(false)}
                                                        imageSrc={
                                                            values.frontViewImage instanceof File
                                                                ? URL.createObjectURL(values.frontViewImage)
                                                                : `http://localhost:5001/uploads/${values.frontViewImage}`
                                                        }
                                                    />
                                                </>
                                            )}
                                            <ErrorMessage name="frontViewImage" component="div" className="text-danger fs-small" />
                                        </div>

                                    </div>

                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="gateViewImage" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Docs/Gate View Photo:</label>
                                        <div className='flex-grow-1'>

                                            <input
                                                id="gateViewImage"
                                                className='form-control form-control-sm w-lg-23em w-md-100 w-sm-100'
                                                name="gateViewImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                                                        setFieldValue("gateViewImage", event.currentTarget.files[0]);
                                                        handleFileChange(event)
                                                    }
                                                }}
                                            />
                                            {values.gateViewImage && (
                                                <>
                                                    <button type="button" className="btn btn-link p-0 mt-1 fs-small text-primary"
                                                        onClick={() => setShow(true)}>{getDisplayName(values.gateViewImage)}</button>
                                                    <ImageModal
                                                        show={show}
                                                        onHide={() => setShow(false)}
                                                        imageSrc={
                                                            values.gateViewImage instanceof File
                                                                ? URL.createObjectURL(values.gateViewImage)
                                                                : `http://localhost:5001/uploads/${values.gateViewImage}`
                                                        }
                                                    />
                                                </>
                                            )}
                                            <ErrorMessage name="gateViewImage" component="div" className="text-danger fs-small" />

                                        </div>
                                    </div>


                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="coveredAreaImage" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Covered Area Photo:</label>
                                        <div className='flex-grow-1'>
                                            <input
                                                id="coveredAreaImage"
                                                className='form-control form-control-sm w-lg-23em w-md-100 w-sm-100'
                                                name="coveredAreaImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                                                        setFieldValue("coveredAreaImage", event.currentTarget.files[0]);
                                                        handleFileChange(event)
                                                    }
                                                }}
                                            />
                                            {values.coveredAreaImage && (
                                                <>
                                                    <button type="button" className="btn btn-link p-0 mt-1 fs-small text-primary"
                                                        onClick={() => setShow(true)}>{getDisplayName(values.coveredAreaImage)}</button>
                                                    <ImageModal
                                                        show={show}
                                                        onHide={() => setShow(false)}
                                                        imageSrc={
                                                            values.coveredAreaImage instanceof File
                                                                ? URL.createObjectURL(values.coveredAreaImage)
                                                                : `http://localhost:5001/uploads/${values.coveredAreaImage}`
                                                        }
                                                    />
                                                </>
                                            )}
                                            <ErrorMessage name="coveredAreaImage" component="div" className="text-danger fs-small" />

                                        </div>
                                    </div>

                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="outsideImage" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Outside Photo:</label>
                                        <div className='flex-grow-1'>
                                            <input
                                                id="outsideImage"
                                                className='form-control form-control-sm w-lg-23em w-md-100 w-sm-100'
                                                name="outsideImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => {
                                                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                                                        setFieldValue("outsideImage", event.currentTarget.files[0]);
                                                        handleFileChange(event)
                                                    }
                                                }}
                                            />
                                            {values.outsideImage && (
                                                <>
                                                    <button type="button" className="btn btn-link p-0 mt-1 fs-small text-primary"
                                                        onClick={() => setShow(true)}>{getDisplayName(values.outsideImage)}</button>
                                                    <ImageModal
                                                        show={show}
                                                        onHide={() => setShow(false)}
                                                        imageSrc={
                                                            values.outsideImage instanceof File
                                                                ? URL.createObjectURL(values.outsideImage)
                                                                : `http://localhost:5001/uploads/${values.outsideImage}`
                                                        }
                                                    />
                                                </>
                                            )}
                                            <ErrorMessage name="outsideImage" component="div" className="text-danger fs-small" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='form-info'>
                                <div className='mt-lg-5'>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="address1" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Address1  <span className="text-danger">*</span></label>
                                        <div className='flex-grow-1'>
                                            <Field id="address1" name="address1" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100 w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="address1" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="area" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Area/Locality  <span className="text-danger">*</span></label>
                                        <div className='flex-grow-1'>
                                            <Field id="area" name="area" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="area" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="city" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>City  <span className="text-danger">*</span></label>
                                        <div className="flex-grow-1">
                                            <Field
                                                as="select"
                                                id="city"
                                                name="city"
                                                className="form-control form-control-sm w-lg-20em w-md-100 w-sm-100 form-select"
                                                disabled={!values.stateName}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {handleChange(e)}}
                                            >
                                                <option value="">Select City</option>
                                                {stateCityMap[values.stateName]?.map((city) => (
                                                    <option key={city} value={city}>
                                                        {city}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="city"
                                                component="div"
                                                className="text-danger mt-1 fs-small"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="gstNo" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>GST No</label>
                                        <div className="flex-grow-1">
                                            <Field id="gstNo" name="gstNo" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="gstNo" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <div className='mt-lg-5'></div>

                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="coveredArea" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>covered Area(sqft) <span className="text-danger">*</span>:</label>
                                        <div className='flex-grow-1'>
                                            <Field id="coveredArea" name="coveredArea" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="coveredArea" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="noOfGate" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>No of gate:</label>
                                        <div className="flex-grow-1">
                                            <Field id="noOfGate" name="noOfGate" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="noOfGate" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                    <div className="d-lg-flex mb-3">
                                        <label htmlFor="parkingArea" className='fw-bold text-end me-2 mb-1 fs-small d-inline-block text-nowrap w-lg-150px'>Parking Area(sqft)</label>
                                        <div className="flex-grow-1">
                                            <Field id="parkingArea" name="parkingArea" className="form-control form-control-sm w-lg-23em w-md-100 w-sm-100" onChange={handleChange} />
                                            <ErrorMessage name="parkingArea" component="div" className="text-danger mt-1 fs-small" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-light my-3 p-0 hr-line'></div>
                        <div className="d-flex justify-content-center gap-2 mt-2 mb-4">
                            {/* <button type="submit" className='btn btn-info mb-4 text-white'>Submit</button> */}
                            <Button variant="contained" color="info" className=' mb-4 text-white' type="submit">Submit</Button>
                            {/* <button className='btn btn-outline-secondary mb-4' onClick={handleBack}>Back</button> */}
                            <Button className='mb-4' onClick={handleBack} variant="outlined"
                            //  style={{color:"black", borderColor:"black"}}
                            color="black"
                            > Back </Button>
                        </div>
                        {success && <div className="text-success fw-semibold text-center" role="status">{success}</div>}
                        {errorMessage && <div className="text-danger fw-semibold text-center" role="alert">{errorMessage}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
