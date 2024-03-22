import React from 'react';
import { Input } from "@/components/ui/input"
import './page.css';

const Page = () => {
    return (
        <div className="container">
            <Input type="email" placeholder="Email" />
        </div>
    );
};

export default Page;
