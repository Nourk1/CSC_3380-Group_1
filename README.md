# TripIt: A Minimal Itinerary Planner (Group 1 - CSC 3380)

> Plan trips, keep flight & lodging info, track activities, check the weather, and pack smarter — all in one simple website you can deploy on GitHub Pages.

## Why This Exists
Planning a trip often means bouncing between flight apps, lodging emails, calendars, and weather sites. That’s confusing and time-consuming. TripIt centralizes the essentials (flights, lodging details, daily plan) in one place, so travelers spend less time hunting for info and more time enjoying the trip. 

## Core Feature
**Itinerary Manager:** add flights, accommodation details (w/ check-in notes), and day-by-day activities, all attached to a named trip. This reduces context-switching and helps keep the trip on track.

## Supplemental Features
- **Weather page:** built-in weather lookup so you can plan your days according to the weather without leaving the app.  
- **Packing list:** use a smart template (based on trip length and forecast) or make your own checklist. 

## Pages & Navigation
- **Home:** create/select a trip (stored in your browser via `localStorage`).  
- **Calendar:** quick agenda for each day (travel times, activities, check-in/out).
- **Calendar View:** 
- **Weather:** search a city and view a daily 7-day forecast (Open-Meteo, no API key).  
- **Packing List:** add/remove items, check them off, or auto-generate a starter list.

## Usage Tips
- Create a trip on **Home**, then navigate to Calendar/Weather/Packing.
- Make sure you have created and selected a trip. Otherwise, some features like the packing list and using trip dates on the weather page **will not work** unless you have a trip added and selected.
- **Weather:** search a city; the app geocodes and fetches a simple 7-day outlook (no hourly breakdown). If you see an error message, your network likely blocks Open-Meteo. 
- **Packing:** click **Generate suggestions** (optional), then edit/checkbox as you like.

## How To Open The Project
- **Use Git Hub Pages:** https://madisonharman.github.io/CSC_3380-Group_1/

## Acknowledgements & Learning Resources
- W3Schools: basic website layouts and HTML/CSS how-tos.
- GeeksforGeeks: beginner-friendly JS app patterns and weather app tutorial ideas.  
- Open-Meteo API (no key) for forecast data.
