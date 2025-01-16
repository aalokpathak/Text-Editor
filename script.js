document.addEventListener('DOMContentLoaded', (event) => {
    const textEditor = document.getElementById('textEditor');
    const saveTxtBtn = document.getElementById('saveTxt');
    const savePdfBtn = document.getElementById('savePdf');
    const clearTextBtn = document.getElementById('clearText');

    // Load text from localStorage if exists
    const savedText = localStorage.getItem('textEditorContent');
    if (savedText) {
        textEditor.value = savedText;
    }

    // Save to localStorage in real-time
    textEditor.addEventListener('input', function() {
        localStorage.setItem('textEditorContent', this.value);
    });

    // Save as TXT
    saveTxtBtn.addEventListener('click', function() {
        const blob = new Blob([textEditor.value], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'text.txt';
        link.click();
    });

    // Save as PDF using jsPDF
    savePdfBtn.addEventListener('click', function() {
        const doc = new jspdf.jsPDF();  // Correct way to initialize jsPDF from UMD build
        
        // Split the text into lines for better formatting
        const lines = doc.splitTextToSize(textEditor.value, 180);
        
        // Add the text to the PDF
        doc.text(lines, 10, 10);
        
        // Save the PDF
        doc.save('text.pdf');
    });

    // Clear text
    clearTextBtn.addEventListener('click', function() {
        textEditor.value = '';
        localStorage.removeItem('textEditorContent');
    });
});