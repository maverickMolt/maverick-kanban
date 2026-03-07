# Deploy Instructions for Cost Dashboard

## Current Status
✅ Dashboard created: `cost-dashboard.html`
✅ Committed to local git
⚠️  **Not yet pushed to GitHub** (auth issue)

## Manual Push Required

### Option 1: SSH Key (Recommended)
```bash
cd ~/clawd/maverick-kanban
git remote set-url origin git@github.com:maverickMolt/maverick-kanban.git
git push
```

If SSH key not set up:
```bash
# Generate key
ssh-keygen -t ed25519 -C "mattdkrameros@gmail.com"

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key and add to GitHub
cat ~/.ssh/id_ed25519.pub
# Go to GitHub Settings → SSH and GPG keys → New SSH key
```

### Option 2: Personal Access Token
```bash
# Create token at: https://github.com/settings/tokens
# Scope: repo (full control of private repositories)

cd ~/clawd/maverick-kanban
git remote set-url origin https://<TOKEN>@github.com/maverickMolt/maverick-kanban.git
git push
```

## After Successful Push

Dashboard will be live at:
**https://maverickmolt.github.io/maverick-kanban/cost-dashboard.html**

(GitHub Pages automatically deploys from main branch)

## Testing Locally

Open in browser:
```bash
open ~/clawd/maverick-kanban/cost-dashboard.html
```

## Next Steps After Deploy

1. Apply database schema to Supabase:
   - Go to Supabase SQL Editor
   - Copy/paste `~/clawd/tools/mission-control/cost-tracker-schema.sql`
   - Run to create tables and views

2. Test cost logging:
   ```bash
   ~/clawd/tools/mission-control/log-cost.sh \
     "test-session" \
     10000 \
     500 \
     0.042 \
     2000 \
     "openrouter/anthropic/claude-sonnet-4.5" \
     "test" \
     "Dashboard deployment test"
   ```

3. Refresh dashboard and verify data appears
