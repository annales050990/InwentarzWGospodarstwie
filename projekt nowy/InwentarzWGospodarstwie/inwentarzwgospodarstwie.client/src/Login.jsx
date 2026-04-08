import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Pamiętaj, aby plik CSS był w tym samym folderze

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Zapytanie do Twojego nowego AccountController
            const response = await axios.post('/api/account/login', {
                email: email,
                password: password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard'; // Przekierowanie po sukcesie
            }
        } catch (err) {
            setError(err.response?.data || 'Błędne dane logowania lub błąd serwera');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Lewa strona - Ilustracja (Twoja krowa i klimat) */}
                <div className="panel-left">
                    <div className="cow-illustration">
                        <div className="cow-head">
                            <div className="ears"></div>
                            <div className="horns"></div>
                            <div className="eyes"></div>
                            <div className="nose"></div>
                        </div>
                        <div className="cow-body">
                            <div className="spots"></div>
                        </div>
                    </div>
                    <div className="brand-content">
                        <h1>Inwentarz</h1>
                        <p>Gospodarstwo pod kontrolą</p>
                    </div>
                </div>

                {/* Prawa strona - Formularz */}
                <div className="panel-right">
                    <div className="login-header">
                        <h2>Witaj ponownie</h2>
                        <p>Zaloguj się do swojego gospodarstwa</p>
                    </div>

                    {error && (
                        <div className="error-summary">
                            <ul>
                                <li>{error}</li>
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Adres e-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="twoj@email.pl"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Hasło</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? 'Logowanie...' : 'Zaloguj się'}
                        </button>
                    </form>

                    <div className="register-link">
                        Nie masz konta? <a href="/register">Zarejestruj się</a>
                    </div>
                    <div className="register-link" style={{ marginTop: '12px' }}>
                        <a href="/">← Wróć do strony głównej</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;