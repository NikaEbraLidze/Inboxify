import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/firstpage.css';
import RegistrationF from '../components/RegistrationF';
import RegistrationS from '../components/RegistrationS';
import Success from '../components/Success';
import Error from '../components/Error';

export default function Create() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initFormData());
    const [page, setPage] = useState("firstPage");
    const [error, setError] = useState(null);

    function initFormData() {
        return {
            fName: "", lName: "", username: "", password: "", confPassword: ""
        };
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    }

    function checkPasswordMatch() {
        if (formData.password !== formData.confPassword) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    }

    async function checkEmail(e) {
        e.preventDefault();
        const res = await fetchData("http://localhost:3000/checkemail", formData);
        res.success ? setPage("secondPage") : setError(res.message || "Email already exists");
    }

    async function registerUser(e) {
        e.preventDefault();
        if (!checkPasswordMatch()) return;

        const res = await fetchData("http://localhost:3000/register", formData);
        res.success ? setPage("success") : setError(res.message || "Registration failed");
    }

    async function fetchData(url, data) {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return await res.json();
        } catch (err) {
            console.error(err);
            setError("Server error");
            return { success: false };
        }
    }

    function handleSuccess() {
        navigate('/');
    }

    function renderPage() {
        if (page === "firstPage") {
            return <RegistrationF formData={formData} handleChange={handleChange} handleSubmit={checkEmail} />;
        } else if (page === "secondPage") {
            return <RegistrationS formData={formData} handleChange={handleChange} handleSubmit={registerUser} />;
        } else if (page === "success") {
            return <Success formData={formData} handleClick={handleSuccess} />;
        }
    }

    return (
        <>
            {error && <Error message={error} />}
            {renderPage()}
        </>
    );
}
