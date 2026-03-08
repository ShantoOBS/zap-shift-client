import React from 'react'
import { useNavigate } from 'react-router'

export default function PaymentCancel() {
  const navigate = useNavigate();

  const handelPaymetCancel = () => {
    navigate("/dashboard/my-parcels");
  };

  return (
    <div>
      <h1>Payment Cancel</h1>

      <button
        onClick={handelPaymetCancel}
        className="btn btn-xs sm:btn-sm md:btn-md"
      >
        Try Again
      </button>
    </div>
  );
}
