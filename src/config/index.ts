import "dotenv/config"

export const config = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    numberId: process.env.JWT_NUMBER_ID,
    verifyToken: process.env.JWT_VERIFY_TOKEN,
  },
  openai: {
    key: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL_ID,
  },
  googleAi: {
    googleApiKey: process.env.GOOGLE_API_KEY,
    googleGeminiModelId: process.env.GOOGLE_GEMINI_MODEL_ID,
  },
  googleSheets: {
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  },
  phoneNumber: process.env.PHONE_NUMBER,
  version: "v20.0",
}