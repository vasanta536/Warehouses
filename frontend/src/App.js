import React from "react";
import { Routes, Route } from "react-router-dom";
import AddWarehouseForm from "./components/AddWarehouseForm";
import Header from "./components/Header";
import ListedWarehouse from "./components/ListedWarehouse";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { AuthProvider, useAuth } from "./auth/useAuth";
import Logout from "./auth/Logout";

function AppContent() {
    const { user, loading } = useAuth();
    console.log("aaaaaaaaaaa",user)
    if (loading) {
        return <div>Loading...</div>;
    }

    // If logged in, show warehouse pages
    if (user) {
        return (
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<ListedWarehouse />} />
                    <Route path="/listed-warehouse" element={<ListedWarehouse />} />
                    <Route path="/add-warehouse" element={<AddWarehouseForm />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </>
        );
    }

    // If not logged in, show auth pages
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
