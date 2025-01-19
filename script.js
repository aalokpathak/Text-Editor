document.addEventListener('DOMContentLoaded', (event) => {
    const textEditor = document.getElementById('textEditor');
    const saveTxtBtn = document.getElementById('saveTxt');
    const savePdfBtn = document.getElementById('savePdf');
    const clearTextBtn = document.getElementById('clearText');

    saveTxtBtn.addEventListener('click', function() {
        const blob = new Blob([textEditor.value], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `document_${new Date().toISOString().slice(0,10)}.txt`;
        link.click();
    });

    savePdfBtn.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const text = textEditor.value;
        const margins = { top: 10, bottom: 10, left: 10, right: 10 }; // Minimum margins
        const fontSize = 12;

        doc.setFont("Times", "normal");
        doc.setFontSize(fontSize);

        // Split text into lines that fit the page width
        const pageWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
        const lines = doc.splitTextToSize(text, pageWidth);
        
        // Add lines to pages
        let currentPage = 1;
        let lineHeight = fontSize * 1.2; // Line height
        let y = margins.top;

        for (let i = 0; i < lines.length; i++) {
            if (y + lineHeight > doc.internal.pageSize.getHeight() - margins.bottom) {
                doc.addPage();
                y = margins.top; // Reset y position for new page
            }
            doc.text(lines[i], margins.left, y);
            y += lineHeight; // Move down for the next line
        }

        doc.save(`document_${new Date().toISOString().slice(0,10)}.pdf`);
    });

    clearTextBtn.addEventListener('click', function() {
        textEditor.value = '';
    });
});
