import { google } from 'googleapis';
import { sheets_v4 } from 'googleapis';
import { config } from '../config';

class SheetManager {
    private sheets: sheets_v4.Sheets
    private spreadsheetId: string

    constructor(spreadsheetId: string, privateKey: string, clienteEmail: string) {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clienteEmail,
                private_key: privateKey.replace(/\\n/g, '\n')
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        })

        this.sheets = google.sheets({
            version: 'v4',
            auth: auth
        })

        this.spreadsheetId = spreadsheetId
    }

    async userExists(number: string): Promise<boolean> {
        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: 'Users!A:A'
            })

            const values = response.data.values

            return values?.some((row) => row[0] === number) ?? false
        } catch (error) {
            console.error('Error on userExists', error)
            return false
        }
    }

    async createUser(number: string, name: string, email: string): Promise<void> {
        try {
            await this.sheets.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: 'Users!A:C',
                valueInputOption: 'RAW',
                requestBody: {
                    values: [[number, name, email]]
                }
            })


            //Create a new tab with the name, email and number
            await this.sheets.spreadsheets.batchUpdate({
                spreadsheetId: this.spreadsheetId,
                requestBody: {
                    requests: [
                        {
                            addSheet: {
                                properties: {
                                    title: number
                                }
                            }
                        }
                    ]
                }
            })

        } catch (error) {
            console.error('Error on createUser', error)
        }
    }

    //Obtain questions/anwers inverted

    async getUserConv(number: string): Promise<any> {
        try {
            const result = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `${number}!A:B`
            })

            const rows = result.data.values
            if (!rows || rows.length === 0) {
                return []
            }

            //Take last 3 and reverse
            const lastConversations = rows.slice(-3).reverse()

            //Format to OpenAi format { role: 'user', content: 'question' }
            const formattedMessages = []
            lastConversations.forEach((row) => {
                const [userQuestion, botAnswer] = row
                formattedMessages.push(
                    { role: 'user', content: userQuestion },
                    { role: 'assistant', content: botAnswer }
                )
            }
            )



            return formattedMessages

        } catch (error) {
            console.error('Error on getQuestions', error)
            return []
        }
    }

    async addConvertToUser(number: string, conversation: { role: string, content: string }[]): Promise<void> {
        try {
            const question = conversation.find((message) => message.role === 'user')?.content
            const answer = conversation.find((message) => message.role === 'assistant')?.content
            const date = new Date().toISOString()

            //REad current rows to push the down
            const result = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `${number}!A:C`
            })

            const rows = result.data.values || []

            //Add new row
            rows.unshift([question, answer, date])

            //Update sheet
            await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: `${number}!A:C`,
                valueInputOption: 'RAW',
                requestBody: {
                    values: rows
                }
            })

        } catch (error) {
            console.error('Error on addConertToUser', error)
        }
    }

}





export default new SheetManager(config.googleSheets.spreadsheetId, config.googleSheets.privateKey, config.googleSheets.clientEmail)