import React from 'react';
import './page.css';

const Page = () => {
    return (
        <div className="container">
            <h1>Login</h1>
            <p>Enter your username and password to login.</p>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Page;
