import React from 'react';
import { useForm } from 'react-hook-form';
import './Userform.css';
import { useNavigate } from 'react-router-dom';
function Userform() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: data.username,
                    Password: data.password,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('Username', data.username)
                navigate('/', {replace: true})
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Something went wrong, please try again later.');
        }
    };

    return (
        <div style={{ width: '300px', margin: '0 auto', paddingTop: '50px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id='Username'
                        type='text'
                        {...register('username', {
                            required: "Username is required",
                            pattern: {
                                value: /^[a-zA-Z0-9_-]{3,20}$/,
                                message: "Invalid username!",
                            },
                        })}
                    />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        id='Password'
                        type='password'
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Invalid Password!",
                            },
                        })}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Userform;