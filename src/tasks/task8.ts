// Задание 8: Функция преобразования CSV в JSON
export function csvToJSON(input: string[], delimiter: string): object[] {

    if (!input || input.length === 0) {
        throw new Error('Input array is empty');
    }

    const nonEmptyLines = input.filter(line => line.trim() !== '');
    
    if (nonEmptyLines.length === 0) {
        throw new Error('Input array is empty');
    }

    const headers = nonEmptyLines[0].split(delimiter).map(h => h.trim());

    if (headers.length === 0) {
        throw new Error('No headers found');
    }

    const allHeadersValid = headers.every(header => header !== '');
    if (!allHeadersValid) {
        throw new Error('No headers found');
    }

    const result: object[] = [];

    for (let i = 1; i < nonEmptyLines.length; i++) {
        const values = nonEmptyLines[i].split(delimiter).map(v => v.trim());
        
        if (values.length !== headers.length) {
            throw new Error(`Line ${i + 1}: Number of values (${values.length}) does not match number of headers (${headers.length})`);
        }

        const obj: Record<string, any> = {};

        for (let j = 0; j < headers.length; j++) {
            const header = headers[j];
            let value: any = values[j];
            if (/^-?\d+$/.test(value)) {
                value = parseInt(value, 10);
            } else if (/^-?\d+\.\d+$/.test(value)) {
                value = parseFloat(value);
            }
            
            obj[header] = value;
        }
        
        result.push(obj);
    }

    return result;
}