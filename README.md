# TripIt: A Minimal Itinerary Planner (Group 1 - CSC 3380)

> Plan trips, keep flight & lodging info, track activities, check the weather, and pack smarter — all in one simple website you can deploy on GitHub Pages.

## Why this exists
Planning a trip often means bouncing between flight apps, lodging emails, calendars, and weather sites. That’s confusing and time-consuming. TripIt centralizes the essentials (flights, stay details, daily plan) in one place, so travelers spend less time hunting info and more time enjoying the trip. 

## Core feature
**Itinerary Manager:** add flights, accommodation details (w/ check-in notes), and day-by-day activities, all attached to a named trip. This reduces context-switching and helps keep the trip on track. 

## Supplemental features
- **Weather glance:** built-in weather lookup so you can plan days without leaving the app.  
- **Packing list:** start from a smart template (based on trip length and forecast) or make your own checklist. 

## Pages & navigation
- **Home:** create/select a trip (stored in your browser via `localStorage`).  
- **Calendar:** quick agenda for each day (travel times, activities, check-in/out).  
- **Weather:** search a city and view a daily 7-day forecast (Open-Meteo, no API key).  
- **Packing List:** add/remove items, check them off, or auto-generate a starter list.

## Tech & design choices (based on your research notes)
- **HTML/CSS/JavaScript** for a beginner-friendly, portable site (works on GitHub Pages).  
- **No build step** — edit in VS Code and commit.  
- **Weather API:** Open-Meteo (no key, JSON). Your notes also mention Weather.gov / OpenWeather / Weatherstack; those work too, but some require keys or extra headers.  
- Starter layout ideas: W3Schools “basic website” patterns, plus GeeksforGeeks tutorials on beginner JS apps and weather apps.

## Quick start
1. **Clone** this repo and open the folder in VS Code.  
2. Put all files in project root (see structure below).  
3. Commit & push to `main`.  
4. **Enable GitHub Pages:**  
   - Settings → Pages → “Deploy from a branch”  
   - Branch: `main`, folder: `/ (root)` → Save  
5. Visit the public Pages URL GitHub shows you.

project/
├─ index.html
├─ calendar.html
├─ weather.html
├─ packing.html
├─ css/
│ └─ styles.css
├─ js/
│ ├─ storage.js
│ ├─ common.js
│ ├─ calendar.js
│ ├─ weather.js
│ └─ packing.js
└─ README.md

## Usage tips
- Create a trip on **Home**, then navigate to Calendar/Weather/Packing.  
- Your current trip persists in the browser. Switch trips anytime from the top bar.  
- Weather: search a city; the app geocodes and fetches a 7-day outlook.  
- Packing: click **Generate suggestions** (optional), then edit/checkbox as you like.

## Roadmap & open questions
- **AI assist?** Should TripIt recommend itineraries or just store plans?  
- **Number of layouts?** Current 4 pages (Home/Calendar/Weather/Packing).  
- **Packing strategy?** Keep simple checklists or auto-generate based on days + weather?  
- **Data model:** Multi-user or sync? (This starter is local-only.)

## Acknowledgements & learning resources
- W3Schools: basic website layouts and HTML/CSS how-tos  
- GeeksforGeeks: beginner friendly JS app patterns and weather app tutorial ideas  
- Open-Meteo API (no key) for forecast data

## License
MIT. Build on it, make it yours, and have a great trip! ✈️
