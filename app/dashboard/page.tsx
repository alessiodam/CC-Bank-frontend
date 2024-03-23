"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./page.css";

interface Transaction {
    id: number;
    from_user: string;
    to_user: string;
    amount: number;
}

const DashboardPage = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [username, setUsername] = useState<string>('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const sessionToken = document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('session_token'));

        if (!sessionToken) {
            window.location.href = '/login';
        }

        axios.defaults.headers.common['Session-Token'] = sessionToken?.split("=")[1];
    }, []);

    useEffect(() => {
        const usernamcookie = document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('username'));

        if (!usernamcookie) {
            window.location.href = '/login';
            return;
        }

        setUsername(usernamcookie.split("=")[1]);
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('http://localhost:8123/api/v1/balance');
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8123/api/v1/transactions/list');
                console.log(response.data);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleCreateTransaction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const targetUsername = event.currentTarget.targetUsername.value;
        const amount = event.currentTarget.amount.value;
    
        try {
            const response = await axios.post('http://localhost:8123/api/v1/transactions/new', {
                username: targetUsername,
                amount: amount,
            });
    
            console.log('Transaction created:', response.data);
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <div>
                <h2>Username: {username}</h2>
                <h2>Balance: {balance}</h2>
            </div>

            <h2>Recent Transactions:</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        From: {transaction.from_user}
                        To: {transaction.to_user}
                        Amount: {transaction.amount}
                    </li>
                ))}
            </ul>

            <h2>Create Transaction:</h2>
            <form onSubmit={handleCreateTransaction}>
                <input type="text" name="targetUsername" placeholder="Target Username" required />
                <input type="number" name="amount" placeholder="Amount" required />
                <button type="submit">Create Transaction</button>
            </form>
        </div>
    );
};

export default DashboardPage;
