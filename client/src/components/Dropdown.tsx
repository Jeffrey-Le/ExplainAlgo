import '../styles/dropdown.css'
import { CSSProperties, ReactNode, useState } from "react";
import React from 'react';

interface DropdownProps {
    classes?: string;
    style?: CSSProperties;
    children?: ReactNode;
    setSelectedType?: (value: React.SetStateAction<string>) => void
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
                    {/* Clone each child to add an onClick event */}
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
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