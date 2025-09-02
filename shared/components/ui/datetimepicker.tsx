/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import { Calendar, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import ReactDOM from "react-dom";

export default function InputDateTimePicker({ ...rest }) {
    const [selectedDate, setSelectedDate] = useState(new DateObject());
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputOffset, setInputOffset] = useState<DOMRect | null>(null);

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        // The pop-up should close only after a full date AND time are selected.
        // A full selection includes both the date and a time value.
        // In this library, the 'HH:mm:ss' format includes ':' only when a time is selected.
        if (date.format('HH:mm:ss').includes(':')) {
            setIsOpen(false);
            rest.onChange(date.format('YYYY/MM/DD HH:mm:ss'));
        }
    };

    const handleOpen = () => {
        const rect = inputRef.current?.getBoundingClientRect();
        if (rect) {
            setInputOffset(rect);
            setIsOpen(true);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside BOTH the date picker and the input field.
            if (
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        // Keep the position updated on scroll to prevent the calendar from "floating" away.
        const updatePosition = () => {
            const rect = inputRef.current?.getBoundingClientRect();
            if (rect) {
                setInputOffset(rect);
            }
        };

        if (isOpen) {
            window.addEventListener('scroll', updatePosition, true);
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isOpen]);

    useEffect(() => {
        // This ensures the component correctly handles an initial value passed via props.
        if (rest.value) {
            setSelectedDate(new DateObject(rest.value));
        }
    }, [rest.value]);

    // Calculate the calendar's position to prevent overflow.
    const calendarStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 99999,
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        top: 0,
        left: 0,
    };

    if (inputOffset) {
        const calendarWidth = 350; // Approximate width of the calendar
        const calendarHeight = 350; // Approximate height of the calendar
        const spaceRight = window.innerWidth - inputOffset.right;
        const spaceBelow = window.innerHeight - inputOffset.bottom;

        // Position horizontally: If not enough space on the right, align to the right edge of the input.
        if (spaceRight < calendarWidth && inputOffset.left >= calendarWidth) {
            calendarStyle.left = inputOffset.right - calendarWidth;
        } else {
            calendarStyle.left = inputOffset.left;
        }

        // Position vertically: If not enough space below, place it above the input.
        if (spaceBelow < calendarHeight && inputOffset.top >= calendarHeight) {
            calendarStyle.top = inputOffset.top - calendarHeight;
        } else {
            calendarStyle.top = inputOffset.bottom;
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <input
                ref={inputRef}
                type="text"
                readOnly
                value={selectedDate.format('YYYY/MM/DD HH:mm:ss')}
                onClick={handleOpen}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
        
            {isOpen && inputOffset &&
                ReactDOM.createPortal(
                    <div
                        ref={datePickerRef}
                        style={calendarStyle}
                    >
                        <Calendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            format="YYYY/MM/DD HH:mm:ss"
                            plugins={[
                                <TimePicker key="time-picker" position="left" />
                            ]}
                            {...rest}
                        />
                    </div>,
                    document.body
                )
            }
        </div>
    );
}