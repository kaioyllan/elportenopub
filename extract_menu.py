import PyPDF2

pdf_path = r"c:\Users\Kaioyllan\Documents\LemanosGameJam\uploads\Cardápio Digital El Porteño Pub 2024.pdf"

with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"

print(text)