import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format") // must be valid email 
        .required("Email is required"), // cannot be empty 
    // password: Yup.string().min(4, "Password must be at least 4 characters") // minimum length 
    //     .required("Password is required"), // cannot be empty 
    password: Yup.string().min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .required("Password is required"),
});

export default function Register() {
    const navigate = useNavigate()
    const { doRegister } = useAuth();

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            await doRegister(values.email, values.password);
            navigate("/");
        } catch (err: any) {
            console.log(err.response.data.error)
            alert(err.response.data.error || err.response.data.message || "an error occured");
        }
    };

    return (
        <div className="d-flex flex-row">
            <div className="d-flex justify-content-center align-items-center w-50 bg-light flex-column">
                <img className="ms-3 w-7em mb-3" src="https://wms2.odwen.co.in/static/media/logo.4c5287a0.svg" alt="Logo" />
                <div className="bg-white w-35em rounded-1">
                    <div className="p-4">
                        <Formik initialValues={{ email: "", password: "" }}
                            validationSchema={RegisterSchema}
                            onSubmit={handleSubmit} >
                            <Form >
                                <h2 className="fs-1p5em">Sign up</h2>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <div >

                                        <Field name="email" type="email" className="w-100 mb-3 p-2" placeholder="Email" />
                                        <ErrorMessage name="email" component="div" className="text-danger mt-1 fs-small" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password">password</label>
                                    <div >

                                        <Field name="password" type="password" className="w-100 mb-3 p-2" placeholder="Password" />
                                        <ErrorMessage name="password" component="div" className="text-danger mt-1 fs-small" />
                                    </div>
                                </div>
                                <button className="w-100 bg-primary mt-3 rounded-1 text-white border-0 p-1" type="submit">Register</button>
                            </Form>
                        </Formik>
                        <p className="text-center">Already have an account? <a href="/login"> Sign In instead</a></p>
                    </div>
                </div>
            </div>
            <div className=" w-50">
                <img className="w-100 h-100 object-fit-cover object-position-center vh-100" src="https://wms2.odwen.co.in/static/media/auth-bg.2cdc28ca.JPG" alt="signUpImg" />
            </div>
        </div >
    );
}
