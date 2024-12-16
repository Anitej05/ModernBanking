import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Credit() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isAuthenticated, setisAuthenticated] = useState();
    useEffect(() => {
        setisAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    }, []);
    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await fetch('http://localhost:5000/actions/credit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: localStorage.getItem('Username'),
                    accountName: data.accountName,
                    amount: data.amount,
                }),
            });
            if(response.ok){
                alert("Amount credited successfully!");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert(error);
        }
    };

    return (
        <div style={{ width: '300px', margin: '0 auto', paddingTop: '50px' }}>
            <h2>Credit</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="accountName">AccountName</label>
                    <input
                        id='accountName'
                        type='text'
                        {...register('accountName', {
                            required: "AccountName is required!",
                        })}
                    />
                    {errors.accountName && <p style={{ color: 'red' }}>{errors.accountName.message}</p>}

                    <label htmlFor="amount">Amount</label>
                    <input
                        id='amount'
                        type='text'
                        {...register('amount', {
                            required: "Amount is required!",
                        })}
                    />
                    {errors.amount && <p style={{ color: 'red' }}>{errors.amount.message}</p>}
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button type='submit'>Credit</button>
                </div>
            </form>
        </div>
    );
}

export default Credit;