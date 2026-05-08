# PID Downtime

This app tracks the unavailibility of public transport services in Prague (and other areas operated by PID). All events are also saved to an internal database for historical lookups and SLA evaluations.

The collected data is presented in a design resembling status pages for online services, such as [Statuspage](https://www.atlassian.com/software/statuspage).

This project is split into two parts:
* A Python script that collects the data from a GTFS feed, saves it to a database and acts as an HTTP API to serve this data
* A Next.js web app for end-user interactivity (calls the API described above)

## Used data resources
This app uses [GTFS Static](http://data.pid.cz/PID_GTFS.zip) and [GTFS Realtime](https://api.golemio.cz/pid/docs/openapi) feeds provided by PID.

In order to have up-to-date information about ongoing events, the GTFS Realtime Alerts feed is queried every 10 minutes and updates are sent to a database.

## How to deploy
Run the Next.JS web app portion as you would deploy any other Next.JS app. For now, the web app must be deployed on the same server as is the Python API.

For the Python portion, it's recommended to run the main.py script every 10 minutes with a task scheduler (e.g. Cron).

## AI Disclaimer
AI was used during the creation of this project for helping me better understand stuff or generate parts of the code.

Specifically, I used mainly Claude Chat and GitHub Copilot (including Code Completion) in my IDE.

I never use LLMs to generate code which I don't understand, rather I use it more like a tool to help me learn Next.js, since I'm still quite new to it. I keep soulless generation of code to an absolute minimum, and reserve that only for repetetive tasks. Generated code is usually manually modified to better suit my needs. 
