import React, { useState, useEffect } from 'react';

const Controller = ({ onClose }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Theme Controller
                        </h3>
                        <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-96 mt-4">
                            {["light", "dark", "cyberpunk", "lofi", "valentine", "business", "acid", "cmyk", "cupcake", "bumblebee", "corporate", "synthwave", "retro", "halloween", "garden"].map((themeOption) => (
                                <label key={themeOption} className="btn theme-controller join-item" aria-label={themeOption}>
                                    <input
                                        type="radio"
                                        name="theme-buttons"
                                        value={themeOption}
                                        checked={theme === themeOption}
                                        onChange={handleThemeChange}
                                    />
                                    {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="btn btn-primary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controller;