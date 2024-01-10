import fs from 'fs/promises';

async function csvToJson(filePath: string) {
    let content = await fs.readFile(filePath, { encoding: 'utf-8' });    
    let lines = content.split('\r\n');
    let headers: string[] = lines.shift()?.trim().split(',') || [];

    if (lines[lines.length-1] == '')
        lines.pop();
    
    let json = [];
    for (let l of lines) {
        let record: { [key: string]: string | number } = {};
        let value = l.split(',');

        for (let i = 0; i < headers.length; i++) {
            record[headers[i]] = isNaN(+value[i]) ? value[i] : +value[i];
        }

        json.push(record);
    }
    
    fs.writeFile('./data/salary/2023.json', JSON.stringify(json), 'utf-8');
}

await csvToJson('./data/salary/2023.csv');