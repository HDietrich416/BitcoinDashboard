# Bitcoin Dashboard
## Contributor: 
Heather Dietrich <br />


## Overview
This dashboard https://bitcoindash.herokuapp.com/ will track Bitcoin based on:
 
•	Volume (24hr) <br />
•	$USD Closing Price - daily <br />
•   % Change in Price (day over day) <br />
•   Trending of Bitcoin price over time including open, close, high, and low (daily) <br />
•	Market Cap ($USD) <br />
•	Market News <br />
 
Facebook Prophet https://facebook.github.io/prophet/ is applied to forecast the future price of Bitcoin and provide additional insight into trends on price (ie. Best days of the week to buy vs. sell). 

## Data Sources
### Data 1
Link: https://www.alphavantage.co/ <br />
Data Source: Alpha Vantage <br />
Data Type: API <br />
SQL: Postgres <br />
Description: Daily Bitcoin price and volume. <br />


### Data 2
Link: https://coinmarketcap.com/ <br />
Data Source: Coin Market Cap<br />
Data Type: Website - Scraping <br />
SQL: Postgres <br />
Description: Bitcoin Market Cap and data on overall Cryptocurrency market.<br />


### Data 3
Link:https://developer.nytimes.com/ <br />
Data Source: New York Times <br />
Data Type: API <br />
SQL: Postgres <br />
Description: Key Headlines and leading paragragh for most recent stories related to Bitcoin.<br />


## Process
### Extract:
Data was extracted from the web using API calls and web scraping (Python) 
### Transform:
Extracted data was transformed using pandas (Python).
### Load:
Data was loaded into PosgreSQL Database using SQL Alchemy. 
### Visualize:
•	Using SQLAlchemy, data was selected from  database and output in json format to Flask app route <br />
•	Visualizations were created in javascript pulling input data from Flask app routes and outputs were sent to HTML. <br />
•	Dashboard page format was built off of Bootstrap Made https://bootstrapmade.com/ template. <br />
•	App was deployed to Heroku https://dashboard.heroku.com/apps through GitHub. <br />

