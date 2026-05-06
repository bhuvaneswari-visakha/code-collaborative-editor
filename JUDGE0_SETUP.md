# Judge0 API Integration Setup

## Overview
The application now uses Judge0 API for code execution instead of local program execution. This provides:
- ✅ Support for multiple programming languages
- ✅ Secure sandboxed execution
- ✅ No need to install compilers/interpreters locally
- ✅ Consistent execution environment

## Supported Languages

| Language   | Judge0 ID | Status |
|------------|-----------|--------|
| JavaScript | 63        | ✅     |
| Python     | 71        | ✅     |
| Java       | 62        | ✅     |
| C++        | 54        | ✅     |
| C          | 50        | ✅     |
| C#         | 51        | ✅     |
| Ruby       | 72        | ✅     |
| Go         | 60        | ✅     |
| PHP        | 68        | ✅     |
| TypeScript | 74        | ✅     |

## Setup Instructions

### 1. Get RapidAPI Key

1. Go to [RapidAPI Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Sign up or log in to RapidAPI
3. Subscribe to the Judge0 CE API (Free tier available)
4. Copy your API key from the dashboard

### 2. Configure Backend

1. Open `backend/.env`
2. Replace the placeholder with your actual API key:
   ```
   JUDGE0_API_KEY=your-actual-rapidapi-key-here
   ```

### 3. Restart Backend Server

```bash
cd backend
npm start
```

## API Endpoint

**POST** `/documents/:docId/run`

### Request Body:
```json
{
  "content": "console.log('Hello World');",
  "language": "javascript"
}
```

### Response:
```json
{
  "output": "Hello World\n"
}
```

## How It Works

1. User writes code in the editor
2. Frontend sends code + language to backend
3. Backend maps language to Judge0 language ID
4. Code is submitted to Judge0 API
5. Judge0 executes code in a secure sandbox
6. Output is returned to the user

## Error Handling

- **Invalid language**: Returns error message
- **Compilation errors**: Returns compiler output
- **Runtime errors**: Returns stderr output
- **API unavailable**: Returns service unavailable message

## Free Tier Limits

Judge0 CE on RapidAPI Free Tier:
- 50 requests per day
- Rate limit: 1 request per second

For production use, consider upgrading to a paid plan.

## Testing

Test the integration by:
1. Login to the application
2. Create a new document
3. Write code in any supported language
4. Click "Run" button
5. View output in the console

## Troubleshooting

### "Code execution service unavailable"
- Check if JUDGE0_API_KEY is set correctly in .env
- Verify your RapidAPI subscription is active
- Check if you've exceeded rate limits

### "Unsupported language"
- Ensure the language name matches the supported list
- Language names are case-insensitive

### No output returned
- Check if the code has any print/console statements
- Verify the code syntax is correct
