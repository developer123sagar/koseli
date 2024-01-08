function isDate(value: string | number | Date): value is Date {
    return value instanceof Date;
}

export const formatDate = (date: string | number | Date): string => {
    if (isDate(date)) {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
    } else if (typeof date === "string") {
        const parsedDate = new Date(date);

        if (!isNaN(parsedDate.getTime())) {
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return parsedDate.toLocaleDateString(undefined, options);
        }
    }

    return "";
};

export function formatTime(date: Date) {
    console.log(date)
    const hours = String(date?.getHours()).padStart(2, "0");
    const minutes = String(date?.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

export const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };