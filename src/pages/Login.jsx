import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Add a loading state
    const history = useNavigate(); // Access the history object

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const configuration = {
            method: "post",
            url: "https://auth-server-sigma.vercel.app/login",
            data: {
                email: email,
                password: password,
            },
        };
        axios(configuration)
            .then((result) => {
                cookies.set("TOKEN", result.data.token, { path: "/" });
                cookies.set("USER", result.data._id, { path: "/" });
                //console.log(cookies.get("TOKEN"));
                setIsLoading(false);
                history("/");
                window.location.reload(); // Reload the page
            })
            .catch((err) => {
                console.error("Error fetching jobs:", err);
                err = new Error();
            })

    }
    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Login
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Selamat Datang! Silakan masukkan email dan passsword untuk masuk.
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            className="mt-6"
                            fullWidth
                            onClick={handleLogin}
                            disabled={isLoading} 
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Belum punya akun?{" "}
                            <a href="/register" className="font-medium text-gray-900">
                                Register
                            </a>
                        </Typography>
                    </form>
                </Card>
            </div>
        </div>
    );
}