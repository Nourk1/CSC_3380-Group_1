# TripIt: A Minimal Itinerary Planner (Group 1 - CSC 3380)

> Plan trips, keep flight & lodging info, track activities, check the weather, and pack smarter — all in one simple website you can deploy on GitHub Pages.

## Why This Exists
Planning a trip often means bouncing between flight apps, lodging emails, calendars, and weather sites. That’s confusing and time-consuming. TripIt centralizes the essentials (flights, lodging details, daily plan) in one place, so travelers spend less time hunting for info and more time enjoying the trip. 

## Core Feature
**Itinerary Manager:** add flights, accommodation details (w/ check-in notes), and day-by-day activities, all attached to a named trip. This reduces context-switching and helps keep the trip on track.

## Supplemental Features
- **Weather page:** built-in weather lookup so you can plan your days according to the weather without leaving the app.  
- **Packing list:**  use a smart template (based on trip length and forecast) or make your own checklist. 

## Pages & Navigation
- **Home:** create/select a trip (stored in your browser via `localStorage`).  
- **Calendar:** quick agenda for each day (travel times, activities, check-in/out).  
- **Weather:** search a city and view a daily 7-day forecast (Open-Meteo, no API key).  
- **Packing List:** add/remove items, check them off, or auto-generate a starter list.

## Usage Tips
- Create a trip on **Home**, then navigate to Calendar/Weather/Packing.  
- **Weather:** search a city; the app geocodes and fetches a 7-day outlook.  
- **Packing:** click **Generate suggestions** (optional), then edit/checkbox as you like.

## How To Open The Project
- **Use Git Hub Pages:** Select the **<> Code** section at the top and find **Deployments** in the side bar on the right. Pick the most recent deployment.

## Acknowledgements & Learning Resources
- W3Schools: basic website layouts and HTML/CSS how-tos.
- GeeksforGeeks: beginner friendly JS app patterns and weather app tutorial ideas.  
- Open-Meteo API (no key) for forecast data.
