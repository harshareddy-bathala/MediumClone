# Security Policy

## 🚨 URGENT: Exposed Credentials

**If you cloned this repository before the security fix on October 31, 2025**, the Prisma Accelerate API key was exposed in the `wrangler.jsonc` file. This key has been committed to version control and should be considered compromised.

### Immediate Actions Required

#### 1. Rotate Your Prisma Accelerate API Key

1. **Go to Prisma Data Platform Console**
   - Visit: https://console.prisma.io/
   - Log in to your account

2. **Navigate to Your Project**
   - Select your Medium Clone project
   - Go to the "Accelerate" section

3. **Regenerate API Key**
   - Find the "API Keys" section
   - Click "Rotate Key" or "Generate New Key"
   - Copy the new connection string
   - **IMPORTANT**: The old key will stop working immediately

4. **Update Your Configuration**
   - Update your `.dev.vars` file with the new connection string
   - Update Cloudflare Workers secrets (if deployed):
     ```bash
     cd backend
     npx wrangler secret put DATABASE_URL
     # Paste your new connection string when prompted
     ```

5. **Redeploy Your Application**
   ```bash
   npx wrangler deploy
   ```

#### 2. Generate a New JWT Secret

1. **Generate a secure random string:**
   ```bash
   # On Linux/Mac:
   openssl rand -base64 32
   
   # On Windows (PowerShell):
   $bytes = New-Object byte[] 32
   [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
   [Convert]::ToBase64String($bytes)
   ```

2. **Update your `.dev.vars` file** with the new JWT secret

3. **Update Cloudflare Workers secrets** (if deployed):
   ```bash
   npx wrangler secret put JWT_SECRET
   # Paste your new secret when prompted
   ```

⚠️ **Note**: Changing the JWT secret will invalidate all existing user sessions.

---

## Security Best Practices

### Never Commit Sensitive Data

The following files should **NEVER** be committed to version control:
- `.env` - Local environment variables
- `.dev.vars` - Cloudflare Workers local development variables
- Any file containing API keys, passwords, or secrets

Always use `.example` files to document required environment variables without exposing actual values.

### Environment Variables

- Use strong, randomly generated secrets for production
- Rotate credentials regularly
- Use different credentials for development, staging, and production
- Store production secrets in Cloudflare Workers dashboard, not in code

### Password Security

✅ **FIXED**: Passwords are now securely hashed using bcrypt before being stored in the database.

**Implementation Details**:
- Uses bcryptjs with a salt round of 10
- Password minimum length: 6 characters
- Passwords are never stored in plain text
- Password comparison uses bcrypt.compare() for secure verification

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please:

1. **DO NOT** open a public GitHub issue
2. Email the repository owner directly
3. Include details about the vulnerability and steps to reproduce
4. Allow reasonable time for a fix before public disclosure

---

## Security Updates

| Date | Issue | Status |
|------|-------|--------|
| Oct 31, 2025 | Exposed Prisma Accelerate API key | ✅ Fixed |
| Oct 31, 2025 | Plain text password storage | ✅ Fixed |
| Oct 31, 2025 | Missing input validation | 🔄 Partial (email & password) |
| Oct 31, 2025 | No CORS configuration | ⏳ Planned |

---

## Secure Configuration Checklist

- [x] Remove hardcoded credentials from code
- [x] Add `.env.example` files
- [x] Update `.gitignore` to exclude sensitive files
- [x] Document environment variable setup
- [x] Implement password hashing (bcrypt)
- [x] Add basic input validation (email format, password length)
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Add security headers
- [ ] Set up monitoring and alerting
- [ ] Add SQL injection protection (using Prisma ORM - ✅ already protected)
- [ ] Implement account lockout after failed login attempts

---

Last Updated: October 31, 2025
