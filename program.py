import PyPDF2
import pandas as pd
import re

def extract_text_from_pdf(pdf_path):
    # Extract text from the PDF
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    
    # Print extracted text for debugging
    print("Extracted Text:\n", text)
    return text

def parse_timetable_data(text):
    # List of days to identify sections in the timetable
    days = ['Mo', 'Tu', 'We', 'Th', 'Fr']
    data = []

    # Split the text by lines
    lines = text.split('\n')
    current_day = None

    # Loop through the lines to extract the relevant information
    for line in lines:
        line = line.strip()
        
        # Check if the line indicates a day of the week
        if line in days:
            current_day = line
            continue
        
        # Attempt to match class-related information using regex patterns
        match = re.match(r'(?P<class>[\w\s&]+), (?P<venue>[A-Z]\d+-\d+), (?P<time>\d{2}:\d{2}\s*-\s*\d{2}:\d{2})', line)

        if match and current_day:
            data.append({
                'Day': current_day,
                'Class': match.group('class').strip(),
                'Time': match.group('time').strip(),
                'Teacher': '',  # Adjust if teachers are parsed separately
                'Venue': match.group('venue').strip(),
                'Section': ''  # Placeholder for section
            })

    # Print parsed data for debugging
    print("Parsed Data:\n", data)
    return data

def save_data_to_excel(data, output_path):
    # Create a DataFrame with the parsed data
    df = pd.DataFrame(data, columns=['Day', 'Class', 'Time', 'Teacher', 'Venue', 'Section'])
    
    # Save DataFrame to an Excel file
    df.to_excel(output_path, index=False)
    print(f"Data saved to {output_path}")

def main():
    pdf_path = r'C:\Users\sa983\OneDrive\Desktop\New folder\timetable.pdf'  # Path to your PDF file
    output_path = r'C:\Users\sa983\OneDrive\Desktop\New folder\timetable_output.xlsx'  # Desired output Excel file path
    
    # Extract text from the provided PDF
    text = extract_text_from_pdf(pdf_path)
    
    # Parse the extracted text into structured data
    data = parse_timetable_data(text)
    
    # Save the structured data to an Excel file
    save_data_to_excel(data, output_path)

if __name__ == '__main__':
    main()
