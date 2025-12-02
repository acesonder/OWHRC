# Quick GitHub Pages Setup

## 🚀 Deploy HopeVoice Hub in 5 Minutes

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/acesonder/OWHRC`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select **Deploy from a branch**
   - Select branch: **main** (or copilot/create-github-pages-guide)
   - Select folder: **/ (root)**
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will build your site (takes 30-60 seconds)
- Refresh the Pages settings page
- You'll see: **"Your site is live at https://acesonder.github.io/OWHRC/"**

### Step 3: Access Your Site

Visit: `https://acesonder.github.io/OWHRC/`

**That's it! Your platform is live!** 🎉

### Step 4: Share with Community

Share the URL with your community and direct them to the [TUTORIAL.md](TUTORIAL.md) for usage instructions.

---

## Recommended Next Steps

### 1. Enable HTTPS (Highly Recommended)
- In GitHub Pages settings, check **Enforce HTTPS**
- This ensures all data transmission is encrypted

### 2. Test All Features
Open the live site and test:
- [ ] Privacy consent modal appears
- [ ] Navigation menu works
- [ ] Each section loads correctly
- [ ] Audio recording works (requires HTTPS and microphone permission)
- [ ] Data persistence (create some content, refresh page, verify it's still there)
- [ ] Accessibility controls work

### 3. Customize (Optional)
You can customize:
- Add your organization logo to `index.html`
- Update default resources in Resource Radar
- Modify color scheme in `css/styles.css`
- Add local resource information

### 4. Train Users
- Print or share the [TUTORIAL.md](TUTORIAL.md)
- Conduct training sessions
- Create video tutorials (optional)
- Set up help desk/support

---

## Troubleshooting

**Site not loading?**
- Ensure branch is set correctly in Pages settings
- Check that repository is public (or you have GitHub Pro for private repos)
- Wait a few more minutes - initial deployment can take time

**404 Error?**
- Verify `index.html` is in the root directory
- Check that branch name is correct
- Try accessing: `https://acesonder.github.io/OWHRC/index.html`

**Features not working?**
- Open browser console (F12) and check for errors
- Ensure HTTPS is enforced (required for microphone access)
- Try a different modern browser (Chrome, Firefox, Safari)
- Check if localStorage is enabled

---

## Updating the Site

When you make changes:
1. Commit changes to the branch
2. Push to GitHub
3. GitHub automatically rebuilds the site
4. Changes appear within 1-2 minutes

---

## Custom Domain (Optional)

If you have a custom domain:
1. In Pages settings, enter your domain
2. Update DNS settings:
   - Add CNAME record → `acesonder.github.io`
3. Enable HTTPS enforcement

---

## Support

- **Full Deployment Guide**: See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
- **User Tutorial**: See [TUTORIAL.md](TUTORIAL.md)
- **Technical Issues**: Check GitHub Pages status and browser console

---

**Need more help?** Check the full [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.
