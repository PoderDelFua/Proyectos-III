"use client"

// source code: https://github.com/prutya/tutorial-multi-select-dropdown/blob/main/

import { useState, useEffect, useRef } from "react";

export default function MultiSelect2({
    formFieldName,
    options,
    onChange,
    prompt = "Select one or more options",
}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const optionsListRef = useRef(null);

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const option = e.target.value;

        var selectedOptionSet = new Set(selectedOptions);

        if (isChecked) {
            selectedOptionSet.add(option);
        } else {
            selectedOptionSet.delete(option);
        }

        const newSelectedOptions = Array.from(selectedOptionSet);

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    const isSelectAllEnabled = selectedOptions.length < options.length;

    const handleSelectAllClick = (e) => {
        e.preventDefault();

        const optionsInputs = optionsListRef.current.querySelectorAll("input");
        optionsInputs.forEach((input) => {
            input.checked = true;
        });

        setSelectedOptions([...options]);
        onChange([...options]);
    };

    const isClearSelectionEnabled = selectedOptions.length > 0;
    const handleClearSelectionClick = (e) => {
        e.preventDefault();

        const optionsInputs = optionsListRef.current.querySelectorAll("input");
        optionsInputs.forEach((input) => {
            input.checked = false;
        });

        setSelectedOptions([]);
        onChange([]);
    };

    return (
        <label className="relative">
            <input type="checkbox" className="hidden peer" />

            <div className="text-gray-500 cursor-pointer after:content-['▼'] after:text-xs after:inline-flex after:items-center peer-checked:text-blue peer-checked:after:-rotate-180 after:transition-transform inline-flex rounded px-3 py-2">
            {/* <div className="text-gray-500 cursor-pointer after:content-['▼'] after:text-xs after:inline-flex after:items-center peer-checked:text-blue-500 peer-checked:after:-rotate-180 after:transition-transform" onClick={(e) => e.target.classList.toggle('text-gray-500')}> */}
                {prompt}
            </div>

            <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-96 max-h-96 overflow-y-scroll mt-2 py-2" style={{ right: "0%", transform: "translateX(0%)" }}>
                {(
                    <ul>
                        <li>
                            <button
                                onClick={handleSelectAllClick}
                                disabled={!isSelectAllEnabled}
                                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
                            >
                                {"Seleccionar todos"}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleClearSelectionClick}
                                disabled={!isClearSelectionEnabled}
                                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
                            >
                                {"Eliminar todos"}
                            </button>
                        </li>
                    </ul>
                )}
                <ul ref={optionsListRef}>
                    {options.map((option, i) => {
                        return (
                            <li key={option}>
                                <label
                                    className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-dark-blue hover:text-white ${selectedOptions.includes(option) ? 'bg-blue text-white' : 'bg-soft-blue text-blue'}`}
                                >
                                    <input
                                        type="checkbox"
                                        name={formFieldName}
                                        value={option}
                                        className="cursor-pointer"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-1">{option}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </label>
    );
}
