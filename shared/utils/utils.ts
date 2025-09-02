/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js';
import { format, parseISO } from 'date-fns';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

export function filterByUrl(array: any, url: string): any[] {
  let result: any = [];

  // Check if 'array' is actually an array
  if (!Array.isArray(array)) {
    //   console.error('filterByUrl expects an array as the first argument.');
      return result;
  }

  array.forEach((item: any) => {
      if (item.url && typeof item.url === 'string') {
          if (item.url.includes(url)) {
              result.push(item);
          }
      }
      if (
          item.subMenu &&
          Array.isArray(item.subMenu) &&
          item.subMenu.length > 0
      ) {
          const filteredSubmenu = filterByUrl(item.subMenu, url);
          result = result.concat(filteredSubmenu);
      }
  });

  return result;
}

export const extractUrls = (menuItems: any): string[] => {
    if (!menuItems || !Array.isArray(menuItems)) {
        return [];
    }
  
    let urls: string[] = [];
    menuItems.forEach((item: any) => {
        urls.push(item.url);
        if (item.submenu && Array.isArray(item.submenu)) {
            urls = [...urls, ...extractUrls(item.submenu)];
        }
    });
    return urls;
};
  
export const camelToSnake = (str: string) => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
  
export type Variant =
    | 'success'
    | 'waiting'
    | 'destructive'
    | 'request'
    | 'expired'
    | 'paid'
    | 'paidNotif'
    | 'danger'
    | 'gray'
    | 'cancel';

//get badge color for dashboard
export function getBadgeColor(status: string): Variant {
    let variant: Variant = 'success';

    switch (status) {
        case 'Success':
            variant = 'success';
            break;
        case 'Waiting':
            variant = 'waiting';
            break;
        case 'Failed':
            variant = 'destructive';
            break;
        case 'Request':
            variant = 'request';
            break;
        case 'Expired':
            variant = 'expired';
            break;
        case 'Paid':
            variant = 'paid';
            break;
        case 'Paid (Notif)':
            variant = 'paidNotif';
            break;
        case 'Cancel':
            variant = 'cancel';
            break;
        case 'Danger':
            variant = 'danger';
            break;
        case 'Gray':
            variant = 'gray';
            break;
        default:
            console.error(`Unknown status: ${status}`);
            break;
    }

    return variant;
}
  
//format currency
export function formatCurrency(amount: number | null, currency = 'IDR') {
    // console.log(amount, currency);
    if (amount === null || currency === null) {
        return '-';
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

//format number witout currency
export function formatNumber(amount: number, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}
  
export function formatRupiah(value: string): string {
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
}

export const formateDate = (date: string) => {
    if (!date) return '-';
    const dateFormated = format(parseISO(date), 'dd/MM/yyyy');
    return dateFormated;
};
  
export function maxMinLength(
      e: React.FormEvent<HTMLInputElement>,
      minValue: number,
      maxValue: number,
  ) {
    const inputElement = e.target as HTMLInputElement;
    let enteredValue = parseInt(inputElement.value);

    if (isNaN(enteredValue)) {
        enteredValue = 0;
    }

    let correctedValue = 0;
    if (maxValue === -999) {
        correctedValue = enteredValue < minValue ? minValue : enteredValue;
    } else {
        correctedValue =
            enteredValue < minValue
                ? minValue
                : enteredValue > maxValue
                ? maxValue
                : enteredValue;
    }

    inputElement.value = correctedValue.toString();
}

export function dateNow() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
}

export function startDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = '01';
    return `${year}/${month}/${day}`;
}

export function dateTimeNow() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function startDateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = '01';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function changeDateConnectore(date: any) {
   const replace = date.replaceAll('/', '-');
   return replace;
}

export function dateToString(date: Date) {
    // console.log(date.toString());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

export function dateToStringWithTime(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    // const day = date.getDate();
    const day = date.getDate();
    
    return `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`;
}

export function dateToStringWithTimeAndDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`;
}

export function encrypt(data: unknown) {
    const bytes = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY!);
    return encodeURIComponent(bytes.toString());
}

export function decrypt(data: string) {
    const decoded = decodeURIComponent(data);
    const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY!);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
}

export function capitalizeFirst(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getMenuPermission(menuPermission:any, url:string){
    const menu = filterByUrl(menuPermission, url);
    return menu;
}

export function extractPermissionNames(functions: any[] = []) {
    return functions.map((item) => item.name);
};

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
export function getDialogSizeClass(size: DialogSize = "lg"){
    switch (size) {
    case "sm":
        return "w-full max-w-md";
    case "md":
        return "w-full max-w-lg";
    case "lg":
        return "w-full max-w-3xl";
    case "xl":
        return "w-full max-w-5xl";
    case "full":
        return "w-full h-screen";
    default:
        return "w-full max-w-3xl";
    }
}

  

