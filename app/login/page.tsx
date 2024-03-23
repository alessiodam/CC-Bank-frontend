"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import './page.css';
import { Button } from '@/components/ui/button';
import { Terminal } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const Page = () => {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8123/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    pin: parseInt(pin),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const { session_token } = data;

                document.cookie = `session_token=${session_token}; path=/`;
                document.cookie = `username=${username}; path=/`;
                console.log("Login successful");
                window.location.href = '/dashboard';
            } else {
                console.error("Login failed");

            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
        
    };

    useEffect(() => {
        const sessionToken = document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('session_token'));

        if (sessionToken) {
            window.location.href = '/dashboard';
        }
    });

    return (
        <div className="container">
            <p className="login-title">Login</p>
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    This is still very early and might not work as expected.
                </AlertDescription>
            </Alert>
            <p></p>
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <p></p>
            <Input type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
            <p></p>
            <Button className="w-full" onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Page;
