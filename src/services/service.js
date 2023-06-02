let tableRows = [];
tableRows.push(['num', 'user-agent', 'method', 'URL'])


class Service {
    pushRow(row){
        row.unshift(tableRows.length)
        tableRows.push(row);
    }
    generateHTMLTable() {
        let html = '<table>\n';

        for (let i = 0; i < tableRows.length; i++) {
            html += '<tr>';
            tableRows[i].forEach(element => {
                html += `<td style=\"border: 1px solid #333; padding: 1rem\">${element}</td>\n`;
            });
            html += '</tr>\n';
        }
        html += '</table>\n';
        return html;
    }
}

module.exports = new Service();
