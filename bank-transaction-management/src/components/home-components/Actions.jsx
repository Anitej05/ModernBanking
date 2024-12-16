import React from 'react';
import { Link } from 'react-router-dom';

const Actions = () => {
  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <Link 
            to="/create-account" 
            className="btn btn-custom-primary w-100 d-flex align-items-center justify-content-center p-4 fs-4 fw-semibold shadow-sm hover-lift text-white"
          >
            Create Account
          </Link>
        </div>
        <div className="col-md-6">
          <Link 
            to="/credit-money" 
            className="btn btn-custom-success w-100 d-flex align-items-center justify-content-center p-4 fs-4 fw-semibold shadow-sm hover-lift text-white"
          >
            Credit Money
          </Link>
        </div>
        <div className="col-md-6">
          <Link 
            to="/debit-money" 
            className="btn btn-custom-warning w-100 d-flex align-items-center justify-content-center p-4 fs-4 fw-semibold shadow-sm hover-lift text-white"
          >
            Debit Money
          </Link>
        </div>
        <div className="col-md-6">
          <Link 
            to="/send-money" 
            className="btn btn-custom-secondary w-100 d-flex align-items-center justify-content-center p-4 fs-4 fw-semibold shadow-sm hover-lift text-white"
          >
            Send Money
          </Link>
        </div>
      </div>

      <style>{`
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2) !important;
        }

        .btn-custom-primary {
            background-color: #34495e; /* Lighter blue with more of a bluish tone */
            border-color: #34495e; /* Same color for the border */
        }

        .btn-custom-primary:hover {
            background-color: #2c3e50; /* Slightly darker on hover */
            border-color: #2c3e50; /* Same dark blue for border on hover */
        }
        
        /* Rich emerald */
        .btn-custom-success {
          background-color: #16a085;
          border-color: #16a085;
        }
        
        .btn-custom-success:hover {
          background-color: #0e8c73;
          border-color: #0e8c73;
        }
        
        /* Deep orange */
        .btn-custom-warning {
          background-color: #d35400;
          border-color: #d35400;
        }
        
        .btn-custom-warning:hover {
          background-color: #bf4000;
          border-color: #bf4000;
        }
        
        /* Deep purple */
        .btn-custom-secondary {
          background-color: #8e44ad;
          border-color: #8e44ad;
        }
        
        .btn-custom-secondary:hover {
          background-color: #763a8f;
          border-color: #763a8f;
        }

        /* Optional: Add subtle gradient overlays for more depth */
        .btn {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05));
        }

        /* Enhance shadow for better depth perception */
        .shadow-sm {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Actions;