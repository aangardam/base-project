/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
    console.log(amount, currency);
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
