document.getElementById('add-row').addEventListener('click', function() {
    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);
    const index = table.rows.length + 1;
    newRow.querySelector('.index').textContent = index;
    newRow.querySelectorAll('input').forEach(input => input.value = '');
    newRow.querySelector('.amount').setAttribute('readonly', true);
    table.appendChild(newRow);
});

document.getElementById('invoice-table').addEventListener('input', function(event) {
    const row = event.target.closest('.invoice-row');
    const quantity = row.querySelector('.quantity').value;
    const rate = row.querySelector('.rate').value;
    const amount = row.querySelector('.amount');

    if (quantity && rate) {
        amount.value = (quantity * rate).toFixed(2);
    } else {
        amount.removeAttribute('readonly');
    }
});

document.getElementById('invoice-table').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-row')) {
        const row = event.target.closest('.invoice-row');
        row.remove();
        updateIndices();
        calculateTotal();
    }
});

document.getElementById('calculate-total').addEventListener('click', calculateTotal);

function updateIndices() {
    const rows = document.querySelectorAll('.invoice-row');
    rows.forEach((row, index) => {
        row.querySelector('.index').textContent = index + 1;
    });
}

function calculateTotal() {
    let total = 0;
    document.querySelectorAll('.amount').forEach(amount => {
        total += parseFloat(amount.value) || 0;
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

// Export functions
document.getElementById('export-pdf').addEventListener('click', function() {
    html2canvas(document.body).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('invoice.pdf');
    });
});

document.getElementById('export-png').addEventListener('click', function() {
    html2canvas(document.body).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'invoice.png';
        link.click();
    });
});

document.getElementById('export-excel').addEventListener('click', function() {
    const table = document.getElementById('invoice-table');
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, 'invoice.xlsx');
});