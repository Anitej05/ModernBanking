import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [currentIndex, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            const Username = localStorage.getItem('Username');
            try {
                const response = await fetch('http://localhost:5000/accounts/get-account', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Username }),
                });
                const result = await response.json();
                setAccounts(result);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const nextCard = () => {
        setIndex((index) => (index + 1) % accounts.length);
    };

    const prevCard = () => {
        setIndex((index) => (index - 1 + accounts.length) % accounts.length);
    };

    const formatAmount = (amount) => {
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        return formatter.format(amount);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!accounts.length) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <i className="bi bi-wallet2 display-1 mb-3 text-secondary"></i>
                <p className="h4 text-secondary">No accounts found</p>
            </div>
        );
    }

    return (
        <div className="w-100" style={{ backgroundColor: 'transparent' }}>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="text-center mb-4">
                            <h2 className="display-5 fw-semibold text-primary">
                                <i className="bi bi-wallet-fill me-2"></i>Your Accounts
                            </h2>
                            <small className="text-muted">
                                Account {currentIndex + 1} of {accounts.length}
                            </small>
                        </div>
                        
                        <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                            <button 
                                onClick={prevCard}
                                className="btn btn-light rounded-circle p-2 border shadow-sm"
                                style={{ width: '45px', height: '45px' }}
                                aria-label="Previous account"
                            >
                                <i className="bi bi-chevron-left fs-4"></i>
                            </button>

                            <div className="card shadow border-0" style={{ maxWidth: '500px', width: '100%' }}>
                                <div className="card-body p-4">
                                    <div className="mb-4">
                                        <p className="text-muted small text-uppercase mb-1">Account Name</p>
                                        <p className="h4 text-dark mb-0">{accounts[currentIndex].accountName}</p>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <p className="text-muted small text-uppercase mb-1">Account Type</p>
                                        <p className="h5 text-dark mb-0">{accounts[currentIndex].accountType}</p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-muted small text-uppercase mb-1">Balance</p>
                                        <p className="h3 text-danger mb-0">
                                            {formatAmount(accounts[currentIndex].amount)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={nextCard}
                                className="btn btn-light rounded-circle p-2 border shadow-sm"
                                style={{ width: '45px', height: '45px' }}
                                aria-label="Next account"
                            >
                                <i className="bi bi-chevron-right fs-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
