import '../styles/dropdown.css'
import { CSSProperties, ReactNode, useState } from "react";
import React from 'react';

interface DropdownProps {
    classes?: string;
    style?: CSSProperties;
    children?: ReactNode;
    // Accept any string-based setter — callers cast as needed at the call site
    setSelectedType?: (value: string) => void;
}

function Dropdown({classes, style, children, setSelectedType}: DropdownProps) {
    const [title, setTitle] = useState('New Problem');

    const handleClick = (childLabel: string) => {
        const newType = childLabel.split(" ")[2].toLowerCase();

        if (setSelectedType)
            setSelectedType(newType);
        
        setTitle(childLabel);
    };

    return (
        <>
            <div style={style} className={`dropdown ${classes}`}>
                <button className="dropbtn" value={title}> {title} </button>
                <div className="dropdown-content" contentEditable={true} suppressContentEditableWarning={true}>
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            // Cast to any to satisfy cloneElement's strict props inference.
                            // Safe here because we're only adding an onClick to a div.
                            return React.cloneElement(child as React.ReactElement<any>, {
                                onClick: () => handleClick(child.props.children as string),
                            });
                        }
                        return child;
                    })}
                </div>
            </div>
        </>
    )
}

export default Dropdown;
