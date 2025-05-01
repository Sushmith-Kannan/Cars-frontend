import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msgUsername, setMsgUsername] = useState(null);
    const [msgPassword, setMsgPassword] = useState(null);
    const navigate = useNavigate();

    const login = () => {
        if (username === "" || username === null || username === undefined) {
            setMsgUsername("Username cannot be blank");
            return;
        } else {
            setMsgUsername(null);
        }

        if (password === "" || password === null || password === undefined) {
            setMsgPassword("Password cannot be blank");
            return;
        } else {
            setMsgPassword(null);
        }

        let body = { username, password };

        axios.post("http://localhost:8081/api/auth/token/generate", body)
            .then(response => {
                let token = response.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);

                axios.get("http://localhost:8081/api/auth/user/details", {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(resp => {
                        switch (resp.data.role) {
                            case 'RENTER':
                                navigate("/activerental");
                                break;
                            case 'MANAGER':
                                navigate("/manager");
                                break;
                            default:
                                setMsgUsername("Unknown role");
                        }
                    })
                    .catch(err => {
                        setMsgUsername("Invalid Credentials");
                        console.log(err);
                    });
            })
            .catch(err => {
                setMsgUsername("Invalid Credentials");
                console.log(err);
            });
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: "#1E2A38" }}>
            <div className="card p-4" style={{ backgroundColor: "#2E3A4E", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                <div className="card-body">
                    <h2 className="text-center text-white mb-2">Login</h2>
                    <p className="text-center text-muted mb-4">Please enter username.</p>

                    {msgUsername && <div className="alert alert-danger py-2">{msgUsername}</div>}
                    {msgPassword && <div className="alert alert-danger py-2">{msgPassword}</div>}

                    <div className="mb-3">
                        <label className="form-label text-success small">Enter your Username</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ backgroundColor: "#1E2A38", color: "white", border: "1px solid #4A5568" }}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setMsgUsername(null);
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-success small">Enter your password</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{ backgroundColor: "#1E2A38", color: "white", border: "1px solid #4A5568" }}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setMsgPassword(null);
                            }}
                        />
                    </div>

                    <div className="d-grid mb-3">
                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: "#10B981", color: "white", fontWeight: "bold", padding: "10px", borderRadius: "6px" }}
                            onClick={login}
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <Link to="/renter/signup" className="text-success small text-decoration-none">Signup</Link>
                        <div className="mt-2">
                            <Link to="/resetpassword" className="text-muted small text-decoration-none">Forgot Password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
