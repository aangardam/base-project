/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import { Calendar, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function InputDateTimePicker({ ...rest }) {
    // console.log(rest);
    // console.log(rest.position);
    const [selectedDate, setSelectedDate] = useState(new DateObject());
    const datePickerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleDateChange = (date:any) => {
        setSelectedDate(date);
        // Tetap buka popup jika waktu belum dipilih
        if (!date.format('HH:mm:ss').includes(':')) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
            rest.onChange(date.format('YYYY/MM/DD HH:mm:ss'));
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (rest.value && rest.value !== selectedDate.format('YYYY/MM/DD HH:mm:ss')) {
            setSelectedDate(new DateObject(rest.value));
        }
    }, [rest.value]);

    const posisition = rest.position || 'left';

    let top = '100%';
    let right = '0';
    if(posisition === 'left') {
        top = '-70%';
        right = '100%';
    }

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                readOnly
                value={selectedDate.format('YYYY/MM/DD HH:mm:ss')}
                onClick={() => setIsOpen(true)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 99999,
                        top: top,
                        left: 'auto',
                        right: right,
                        transform: 'translateX(-10px)',
                        backgroundColor: 'white',
                        padding: '10px',
                        border: '1px solid #ccc',
                    }}
                    ref={datePickerRef}
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
                </div>
            )}
        </div>
    );
}
