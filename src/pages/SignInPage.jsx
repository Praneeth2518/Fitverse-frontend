import { useForm } from "react-hook-form"
import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function SignIn() {
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm();
    const [apiError, setApiError] = useState(null);
    const {signInFunc} = useAuth();

    async function onSubmit(data) {
        setApiError(null);
        try {
            await signInFunc(data);
        } catch(e) {
            setApiError(e.response?.data?.message || "Something went wrong");
        }

    }

    return (
        <div className="auth-page">
            <div className="form-container">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input autoComplete="email" placeholder="Email..." className="email-input"
                           {...register("email", {
                               required: "Email is required"
                           })}
                    />

                    {errors.email && <p className="error-message">{errors.email.message}</p>}

                    <input type="password"  autoComplete="password" placeholder="Password..." className="password-input"
                           {...register("password", {
                               required: "Password is required"
                           })}
                    />

                    {errors.password && <p className="error-message">{errors.password.message}</p>}

                    {apiError && <p className="error-message">{apiError}</p>}

                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        { isSubmitting ? "Please wait..." : "Sign In" }
                    </button>
                </form>
                <p>Don't have an account?? <Link to="/sign-up">Sign Up</Link></p>
            </div>
        </div>
    )
}