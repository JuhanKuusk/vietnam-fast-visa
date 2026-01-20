# Deployment Checklist & Troubleshooting

## Pre-Deployment Checklist

Before deploying to production, always verify:

- [ ] `npm run build` completes successfully with no errors
- [ ] All TypeScript errors are resolved
- [ ] Local build generates all app routes (not just `/404`)
- [ ] Test the deployment locally with `npm run dev`
- [ ] Verify environment variables are set in Vercel dashboard

## Post-Deployment Verification

Immediately after deploying, verify the following:

### 1. Site Accessibility Check
```bash
curl -I https://vietnamvisahelp.com
```
**Expected:** HTTP 200 status code
**Problem:** HTTP 404 or "Authentication Required"

### 2. Homepage Content Check
```bash
curl -s https://vietnamvisahelp.com | grep -i "vietnam.*visa"
```
**Expected:** Page content with "Vietnam" and "visa" keywords
**Problem:** 404 error page or empty response

### 3. Deployment Protection Status
- Go to: https://vercel.com/juhan-kuuskemaas-projects/app/settings/deployment-protection
- Verify: "Standard Protection" is **DISABLED**
- If enabled: Immediately disable it to restore public access

## Common Issues & Solutions

### Issue 1: Website Shows 404 Error

**Symptoms:**
- Production site returns HTTP 404
- Page shows "This page could not be found"
- `x-matched-path: /_not-found` in response headers

**Root Causes:**
1. **Deployment Protection Enabled**
   - Solution: Disable at https://vercel.com/juhan-kuuskemaas-projects/app/settings/deployment-protection

2. **Build Only Generated 404 Page**
   - Check build logs: `vercel inspect --logs <deployment-url>`
   - Look for "Route (app)" or "Route (pages)" in build output
   - If only `/404` route exists, the build failed

3. **Bad Deployment Promoted**
   - Solution: Rollback to last working deployment
   ```bash
   vercel list --prod  # Find working deployment
   vercel promote <working-deployment-url> --yes
   ```

### Issue 2: Authentication Required Page

**Symptoms:**
- Users see "Authentication Required" instead of website
- Page requires Vercel SSO login

**Solution:**
1. Go to: https://vercel.com/juhan-kuuskemaas-projects/app/settings/deployment-protection
2. Disable "Standard Protection"
3. Save changes
4. Verify site is publicly accessible within 30 seconds

### Issue 3: Recent Deployments All Failing

**Symptoms:**
- Multiple recent deployments show 404
- Older deployments (30+ minutes old) work fine

**Solution:**
1. Find last working deployment:
   ```bash
   vercel list --prod
   # Test older deployments until you find one that works:
   curl -I https://app-<deployment-id>-juhan-kuuskemaas-projects.vercel.app
   ```

2. Promote working deployment:
   ```bash
   vercel promote https://app-<working-id>-juhan-kuuskemaas-projects.vercel.app --yes
   ```

3. Investigate why recent builds failed:
   - Check git commits made between working and failing deployments
   - Review build logs for errors
   - Test local build: `npm run build`

## Prevention Measures

### 1. Automated Monitoring
Set up uptime monitoring (recommended: UptimeRobot, Pingdom):
- Monitor: https://vietnamvisahelp.com
- Check interval: Every 5 minutes
- Alert method: Email + SMS

### 2. Post-Deploy Script
Add to package.json:
```json
{
  "scripts": {
    "verify-deploy": "curl -I https://vietnamvisahelp.com && curl -s https://vietnamvisahelp.com | grep -q 'Vietnam.*visa' && echo '✅ Site is accessible' || echo '❌ Site verification failed'"
  }
}
```

Run after every deployment:
```bash
npm run verify-deploy
```

### 3. Deployment Settings Review
Monthly checklist:
- [ ] Verify deployment protection is disabled
- [ ] Check environment variables are current
- [ ] Review build settings in vercel.json
- [ ] Test production deployment process

## Emergency Rollback Procedure

If the site goes down, follow these steps immediately:

1. **Verify the issue:**
   ```bash
   curl -I https://vietnamvisahelp.com
   ```

2. **Find last working deployment:**
   ```bash
   vercel list --prod | head -20
   # Test deployments from oldest to newest until you find one that works
   ```

3. **Promote working deployment:**
   ```bash
   vercel promote <working-deployment-url> --yes
   ```

4. **Verify site is back up:**
   ```bash
   curl -I https://vietnamvisahelp.com
   ```

5. **Investigate root cause** (after site is restored)

## Today's Incident Report (Jan 20, 2026)

### What Happened
- Website showed 404 error to all users
- Multiple recent deployments (last 14 minutes) were affected
- Older deployment (39 minutes old) was working

### Root Cause
1. **Primary Issue:** Vercel Deployment Protection was enabled, requiring authentication
2. **Secondary Issue:** Recent builds may have had configuration issues

### Resolution
1. Disabled deployment protection in Vercel dashboard
2. Rolled back to deployment `app-idbffkm5f` (39 minutes old) which was working
3. Verified site accessibility with HTTP 200 status

### Lessons Learned
1. Always verify site accessibility immediately after deployment
2. Check deployment protection settings before and after deploy
3. Keep known-working deployment IDs documented
4. Implement automated uptime monitoring

### Prevention Actions Taken
✅ Created DEPLOYMENT_CHECKLIST.md
✅ Documented rollback procedure
⏳ TODO: Set up uptime monitoring (UptimeRobot)
⏳ TODO: Add post-deploy verification script
