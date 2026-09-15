# API Configuration for External Tools

## GitHub API Access

### Base URL
```
https://api.github.com/repos/Helldustxiii/holaOS
```

### Available Endpoints

#### Repository Information
```bash
GET /repos/Helldustxiii/holaOS
# Returns full repository metadata
```

#### Repository Contents
```bash
GET /repos/Helldustxiii/holaOS/contents/{path}
# Examples:
# GET /repos/Helldustxiii/holaOS/contents/README.md
# GET /repos/Helldustxiii/holaOS/contents/package.json
# GET /repos/Helldustxiii/holaOS/contents/apps/desktop
```

#### Branches
```bash
GET /repos/Helldustxiii/holaOS/branches
# Lists all branches (main, feature/nyx-agent-experimental)
```

#### README
```bash
GET /repos/Helldustxiii/holaOS/readme
# Fetches the main README.md
```

#### Commits
```bash
GET /repos/Helldustxiii/holaOS/commits
# Gets commit history
```

#### Issues
```bash
GET /repos/Helldustxiii/holaOS/issues
# Lists repository issues
```

#### Pull Requests
```bash
GET /repos/Helldustxiii/holaOS/pulls
# Lists pull requests
```

### Raw Content Access

#### Direct File URLs
```
https://raw.githubusercontent.com/Helldustxiii/holaOS/main/{path}

Examples:
- https://raw.githubusercontent.com/Helldustxiii/holaOS/main/README.md
- https://raw.githubusercontent.com/Helldustxiii/holaOS/main/package.json
- https://raw.githubusercontent.com/Helldustxiii/holaOS/main/apps/desktop/package.json
```

#### Blob URLs
```
https://github.com/Helldustxiii/holaOS/blob/main/{path}
https://github.com/Helldustxiii/holaOS/raw/main/{path}
```

## Authentication

### Public Access
- ✅ No authentication required
- ✅ Rate limit: 60 requests/hour (unauthenticated)
- ✅ Rate limit: 5,000 requests/hour (with token)

### Optional Token
Add to headers for higher rate limits:
```
Authorization: token YOUR_GITHUB_TOKEN
```

## Response Formats

### JSON Responses (Default)
```bash
curl https://api.github.com/repos/Helldustxiii/holaOS
```

### Raw Content
```bash
curl https://raw.githubusercontent.com/Helldustxiii/holaOS/main/README.md
```

## Error Handling

### Common Status Codes
- `200` - Success
- `401` - Unauthorized (use token if private)
- `403` - Forbidden (rate limit exceeded)
- `404` - Not found (file/path doesn't exist)
- `422` - Validation failed

### 404 Troubleshooting
1. Verify the repository is public ✅
2. Check the file path exists
3. Ensure correct branch name (`main`)
4. Use `/raw/` for raw content

## CORS Headers
The GitHub API supports CORS for browser requests. Include:
```
Access-Control-Allow-Origin: *
```

## Rate Limiting

### Unauthenticated Requests
- 60 per hour per IP address
- Rate limit reset: `X-RateLimit-Reset` header

### Authenticated Requests
- 5,000 per hour per user
- Check remaining: `X-RateLimit-Remaining` header

## Example Requests

### Get Repository Info
```bash
curl -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Helldustxiii/holaOS
```

### Get File Content
```bash
curl https://raw.githubusercontent.com/Helldustxiii/holaOS/main/README.md
```

### Get Branches
```bash
curl https://api.github.com/repos/Helldustxiii/holaOS/branches
```

### List Issues
```bash
curl https://api.github.com/repos/Helldustxiii/holaOS/issues
```

## Tools That Use These Endpoints

- ✅ ChatGPT / Claude (via API)
- ✅ GitHub Copilot
- ✅ Cursor
- ✅ Windsurf
- ✅ Custom integrations
- ✅ CI/CD pipelines

---

For questions or issues with API access, see:
- GitHub API Docs: https://docs.github.com/rest
- Repository: https://github.com/Helldustxiii/holaOS
