import { v4 as uuidv4 } from 'uuid';

export function generateRequestId():string {
    return uuidv4();
}

export function formatRequestTime():string {
    return new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date());
}