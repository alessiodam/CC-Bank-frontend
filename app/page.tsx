import React from 'react';
import './page.css';

const Page = () => {
    return (
        <div className="container">
            <h1>Bank Of ComputerCraft</h1>
            <p>Welcome to the Bank Of ComputerCraft, your trusted source for advanced computer services. It is a bank system synced across all servers, allowing users to access their coins and funds seamlessly across different servers.</p>
            <p>To install Bank Of ComputerCraft into an Advanced Computer, use the following one-liner:</p>
            <p>Bank Of Computercraft has auto-updating, you won't need to do anything to update it.</p>
            <div className="code-box">
                <p>pastebin run RN5J9wvi</p>
            </div>
            <p>There is a web dashboard! (You will need to create the account in-game)</p>
            <h3><a href="/login">Login here</a></h3>
            <h3><a href="/dashboard">Dashboard here</a></h3>
        </div>
    );
};

export default Page;