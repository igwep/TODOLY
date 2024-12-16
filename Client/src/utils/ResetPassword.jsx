import React, { useState } from "react";
import { handlePasswordResetOrSet } from "../FirebaseFunctions/profileUpdate";

const ResetOrSetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSetPassword, setShowSetPassword] = useState(false);

    const handleSubmit = () => {
        handlePasswordResetOrSet(
            email,
            setLoading,
            setShowSetPassword,
        );
    };

    const handleSetPassword = async (newPassword) => {
        // Logic to set a new password
        console.log("New password set:", newPassword);
    };

    return (
        <div className="tablet:pl-[25vw] pt-32 py-8 bg-gray-100 h-screen px-16 w-full">
            {!showSetPassword ? (
                <div>
                    <h3>Reset or Set Password</h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Processing..." : "Submit"}
                    </button>
                  
                </div>
            ) : (
                <div>
                    <h3>No Password Set</h3>
                    <p>You don't have a password set for your account.</p>
                    <input
                        type="password"
                        placeholder="Enter a new password"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSetPassword(e.target.value);
                            }
                        }}
                    />
                    <button onClick={() => setShowSetPassword(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ResetOrSetPassword;
