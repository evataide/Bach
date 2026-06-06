# 🌸 Evey's Bach Weekend Website

A whimsical, pink & red bachelorette weekend website for Evey's Bach Weekend — July 18–20, 2025 in Wheaton, MD!

## Pages

- **index.html** — Welcome / Landing page
- **itinerary.html** — High-level weekend overview
- **friday.html** — Friday night deep dive
- **saturday.html** — Saturday adventure deep dive
- **sunday.html** — Sunday morning deep dive
- **guests.html** — The Girls (edit with real guest info!)
- **packing.html** — What to Bring (interactive checklist)
- **movies.html** — Movie Night voting + suggestions
- **menu.html** — Snacks & Eats for the whole weekend

## Features

- 🐭 Custom sparkle cursor (2000s nostalgia!)
- ✨ Sparkle trail that follows your mouse
- 📦 Movie voting saved in localStorage
- ☑️ Interactive packing checklist
- 🎬 Movie suggestion form
- 📱 Mobile-responsive with hamburger nav
- 🎀 Pink & red illustrated aesthetic matching your invite

## Customizing

### Add Real Guests
Open `guests.html` and edit the `.guest-card` blocks with actual names, bios, and fun facts!

### Update the Menu
Edit `menu.html` to reflect what you're actually serving. Add or remove `.menu-item` cards.

### Change Movie Options
Edit `movies.html` to update the movie options in the `.movie-grid` section.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `eveys-bach`)
2. Upload all files to the repository:
   ```
   index.html, itinerary.html, friday.html, saturday.html, sunday.html,
   guests.html, packing.html, movies.html, menu.html, style.css, main.js
   ```
3. Go to **Settings → Pages**
4. Under "Source", select **Deploy from a branch**
5. Choose **main** branch, **/ (root)** folder
6. Click **Save**
7. Your site will be live at: `https://yourusername.github.io/eveys-bach/`

### Using GitHub CLI (fastest)
```bash
# In the bach-site folder:
git init
git add .
git commit -m "🌸 Evey's Bach Weekend site"
gh repo create eveys-bach --public --source=. --remote=origin --push

# Then enable Pages in GitHub Settings
```

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no frameworks needed!)
- Google Fonts: Caveat, DM Serif Display, Quicksand
- localStorage for interactive features
- 100% static — GitHub Pages ready!
