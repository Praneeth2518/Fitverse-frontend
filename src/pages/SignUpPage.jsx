import { useForm } from "react-hook-form"
import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function SignUp() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, getValues} = useForm();
    const [apiError, setApiError] = useState(null);
    const {signUpFunc} = useAuth();

    async function onSubmit(data) {
        setApiError(null);
        const { confirmPassword, ...signUpData } = data;
        try {
            await signUpFunc(signUpData);
        } catch(e) {
            console.log(e);
            setApiError(e.response?.data?.message || "Something went wrong");
        }

    }

    return (
        <div className="auth-page">
            <div className="form-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="auth-form-section">
                        <input autoComplete="username" placeholder="Username..." className="username-input"
                               {...register("username", {
                                   required: "Username is required",
                                   minLength: {
                                       value: 3,
                                       message: "Username must be at least 3 characters"
                                   },
                                   maxLength: {
                                       value: 20,
                                       message: "Username must be at most 20 characters"
                                   }
                               })}
                        />

                        {errors.username && <p className="error-message">{errors.username.message}</p>}

                        <input type="email" autoComplete="email" placeholder="Email..." className="email-input"
                               {...register("email", {
                                   required: "Email is required",
                                   pattern: {
                                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                       message: "Invalid email"
                                   }

                               })}
                        />

                        {errors.email && <p className="error-message">{errors.email.message}</p>}

                        <input type="password" autoComplete="new-password" placeholder="Password..." className="password-input"
                               {...register("password", {
                                   required: "Password is required",
                                   minLength: {
                                       value: 8,
                                       message: "Minimum 8 characters",
                                       pattern: {
                                           value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                           message: "Must contain an uppercase letter, lowercase letter and a number"
                                       }
                                   }
                               })}
                        />

                        {errors.password && <p className="error-message">{errors.password.message}</p>}

                        <input type="password" autoComplete="new-password" placeholder="Confirm Password..." className="confirm-password-input"
                               {...register("confirmPassword", {
                                   required: "Confirm Password is required",
                                   validate: (value) => value === getValues("password") || "Passwords do not match"
                               })}
                        />

                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="details-form-section">
                        <input placeholder="Height... (cm)" className="height-input" type="number" step="0.1"
                               {...register("height", {
                                   required: "Height is required",
                                   min: {
                                       value: 100,
                                       message: "Height must be at least 100 cm"
                                   },
                                   max: {
                                       value: 250,
                                       message: "Height cannot exceed 250 cm"
                                   },
                                   valueAsNumber: true
                               })}
                        />

                        {errors.height && <p className="error-message">{errors.height.message}</p>}

                        <input placeholder="Current Weight... (kg)" className="currentWeight-input" type="number" step="0.1"
                               {...register("currentWeight", {
                                   required: "Current Weight is required",
                                   valueAsNumber: true,
                                   min: {
                                       value: 20,
                                       message: "Weight must be at least 20 kg"
                                   },
                                   max: {
                                       value: 300,
                                       message: "Weight cannot exceed 300 kg"
                                   },
                               })}
                        />

                        {errors.currentWeight && <p className="error-message">{errors.currentWeight.message}</p>}

                        <input placeholder="Target Weight... (kg)" className="targetWeight-input" type="number" step="0.1"
                               {...register("targetWeight", {
                                   required: "Target Weight is required",
                                   valueAsNumber: true,
                                   min: {
                                       value: 20,
                                       message: "Weight must be at least 20 kg"
                                   },
                                   max: {
                                       value: 300,
                                       message: "Weight cannot exceed 300 kg"
                                   },
                               })}
                        />

                        {errors.targetWeight && <p className="error-message">{errors.targetWeight.message}</p>}

                        <label>Gender</label>
                        <label>
                            <input type="radio" value="male" {...register("gender", {required: "Select your gender"})}/>
                            Male
                        </label>
                        <label>
                            <input type="radio" value="female" {...register("gender")}/>
                            Female
                        </label>
                        <p>{errors.gender?.message}</p>

                        <input type="date" className="dob-input" max={new Date().toISOString().split("T")[0]}
                               {...register("dob", {
                                   required: "Date Of Birth is required"
                               })}
                        />

                        {errors.dob && <p className="error-message">{errors.dob.message}</p>}
                    </div>

                    {apiError && <p className="error-message">{apiError}</p>}

                    <button type="submit" className="login-button" disabled={isSubmitting}>
                        { isSubmitting ? "Please wait..." : "Sign In" }
                    </button>
                </form>
                <p>Already have an account?? <Link to="/sign-in">Sign In</Link></p>
            </div>
        </div>
    )
}