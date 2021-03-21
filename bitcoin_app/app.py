import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
import json
import numpy as np
import pandas as pd

app = Flask(__name__)


# Create an engine 

server= "bootcampdb.cmwhqarpyd9v.ca-central-1.rds.amazonaws.com"
database = "postgres"
port ="5432"
username = "root"
password = "xy92Hdie"

conn = f"postgres://{username}:{password}@{server}:{port}/{database}"

engine = create_engine(conn, echo=False)

# Reflect Database into ORM classes
Base = automap_base()
Base.prepare(engine, reflect=True)

btc_news = Base.classes.btc_news
coin_price = Base.classes.coin_price
market_cap = Base.classes.market_cap
rating = Base.classes.rating
fb_predictions = Base.classes.fb_predictions

session = Session(engine)

## FRONT_END ROUTES
@app.route("/")
def main(): 
    return render_template("index.html")

## SERVICE ROUTES

@app.route("/api/main/news")
def newsRoute(): 
    news = session.query(btc_news.Date,btc_news.Headline, btc_news.Paragraph).all()

    news_data = []

    for i in news:
        date = i[0]

        event = i[1]
        story = i[2]

        news_output = {"News_Date": date ,"Headline": event, "Paragraph": story}

        news_data.append(news_output)
    
    return jsonify(news_data)


@app.route("/api/main/price")
def priceRoute(): 
    
    price_data = session.query(coin_price.Date,coin_price.Open_USD, coin_price.High_USD, coin_price.Low_USD, coin_price.Close_USD, coin_price.Volume).all()
    
    price_Date = []
    for item in price_data:
        price_Date.append(item[0])
    
    price_Open = []
    for item in price_data:
        price_Open.append(item[1])
    
    price_High = []
    for item in price_data:
        price_High.append(item[2])
    
    price_Low = []
    for item in price_data:
        price_Low.append(item[3])
    
    price_Close = []
    for item in price_data:
        price_Close.append(item[4])

    volume = []
    for item in price_data:
        volume.append(item[5])
    
    price_output = [{ "price_Date" : price_Date,
               "price_Open" : price_Open,
               "price_High" : price_High,
               "price_Low" : price_Low,
               "price_Close" : price_Close, 
               "volume": volume
     }]

    return jsonify(price_output)

@app.route("/api/main/marketcap")
def marketcapRoute(): 
    
    Cryptocurrencies = session.query(market_cap.Cryptocurrencies).all()
    Markets = session.query(market_cap.Markets).all()
    Market_Cap = session.query(market_cap.Total_Market_Cap).all()
    BTC_Dominance = session.query(market_cap.BTC_Dominance).all()
    BTC_MC = session.query(market_cap.BTC_Market_Cap_T).all()
    
    market_cap_output = {
        "Cryptocurrencies": Cryptocurrencies, 
        "Markets": Markets, 
        "Market_Cap": Market_Cap, 
        "BTC_Dominance": BTC_Dominance, 
        "BTC_Market_Cap_T": BTC_MC
    }

    return jsonify(market_cap_output)

# @app.route("/api/main/rating")
# def ratingRoute(): 
#     rating_data = session.query(rating.Rank).all()

#     rating_date = session.query(rating.Date).all()

#     rating_score = session.query(rating.Score).all()
  
    
#     rating_output = { "date": rating_date,
#                     "rating": rating_data, 
#                     "score": rating_score                    

#     }

#     return jsonify(rating_output)

@app.route("/api/main/fbpredictions")
def fbpredictions():
    fb_data = session.query(fb_predictions.date, fb_predictions.BTC_price_USD, fb_predictions.day).all()

    btc_Date = []
    for item in fb_data:
        btc_Date.append(item[0])
    
    btc_Price = []
    for item in fb_data:
        btc_Price.append(item[1])

    btc_Day = []
    for item in fb_data:
        btc_Day.append(item[2])
    
    
    fb_output = [{ "Date": btc_Date, 
                "Price": btc_Price, 
                "Day": btc_Day}]

    return jsonify(fb_output)

@app.route("/api/main/fbpredictionsday")
def fbpredictionsday():
    day_data = session.query(fb_predictions.day, func.avg(fb_predictions.BTC_price_USD)).group_by(fb_predictions.day).all()

    btc_Day = []
    for item in day_data:
        btc_Day.append(item[0])
    
    day_Price = []
    for item in day_data:
        day_Price.append(item[1])

   
    
    day_output = [{ "Day": btc_Day, 
                "Price": day_Price
    }]

    return jsonify(day_output)

if __name__ == "__main__":
    app.run()

