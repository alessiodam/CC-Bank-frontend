"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./page.css";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [transactionValues, setTransactionValues] = useState({ username: '', amount: 1 });

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
                const response = await axios.get('https://ccbank.tkbstudios.com/api/v1/balance');
                setBalance(response.data);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://ccbank.tkbstudios.com/api/v1/transactions/list');
                console.log(response.data);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleButtonClick = () => {
        setDialogOpen(true);
    };


    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionValues({ ...transactionValues, username: event.target.value });
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionValues({ ...transactionValues, amount: parseInt(event.target.value) });
    };

    const submitNewTransaction = async () => {
        try {
            const response = await axios.post('https://ccbank.tkbstudios.com/api/v1/transactions/new', {
                username: transactionValues.username,
                amount: transactionValues.amount,
            });
    
            if (response.status === 200) {
                console.log("Transaction created successfully");
                window.location.reload();
            } else {
                console.error("Failed to create transaction");
            }
        } catch (error) {
            console.error("An error occurred while creating the transaction:", error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <div>
                <h2>Username: {username}</h2>
                <h2>Balance: {balance}</h2>
            </div>
            <Dialog open={dialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={handleButtonClick}>
                        Create Transaction
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Transaction</DialogTitle>
                        <DialogDescription>
                            Send coins to someone here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue="TKB_Studios"
                                className="col-span-3"
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                defaultValue="1"
                                className="col-span-3"
                                type="number"
                                step="0.01"
                                min="0.01"
                                onChange={handleAmountChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => submitNewTransaction()}>Send coins</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Table>
                <TableCaption>A list of your recent transactions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.from_user}</TableCell>
                            <TableCell>{transaction.to_user}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DashboardPage;
