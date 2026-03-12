import fs from 'fs';
import path from 'path';
import {PDFParse, TextResult}  from 'pdf-parse';
import mammoth from 'mammoth';

export class ResumeParser {
    
    private async parsePDF(filePath: string): Promise<TextResult> {
        const dataBuffer = fs.readFileSync(filePath);
        const data = new PDFParse(dataBuffer);
        const text = await data.getText();
        return text;
    }

    
    private async parseDOCX(filePath: string): Promise<string> {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    /**
     * Main method to route the file to the correct parser
     */
    public async extractText(filePath: string): Promise<TextResult | string> {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }

        const ext = path.extname(filePath).toLowerCase();

        try {
            switch (ext) {
                case '.pdf':
                    return await this.parsePDF(filePath);
                case '.docx':
                    return await this.parseDOCX(filePath);
                default:
                    throw new Error(`Unsupported file type: ${ext}. Only PDF, and DOCX are supported.`);
            }
        } catch (error) {
            console.error(`Error parsing file ${filePath}:`, error);
            throw error;
        }
    }
}