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

session = Session(engine)

## FRONT_END ROUTES
@app.route("/")
def main(): 
    return render_template("index.html")

## SERVICE ROUTES

@app.route("/api/main/news")
def newsRoute(): 
    news = session.query(btc_news.Date,btc_news.Headline, btc_news.Paragraph).all()
    news_dataset = []
    for item in news:
        news_dataset.append(item)
    
    return jsonify(news_dataset)

@app.route("/api/main/price")
def priceRoute(): 
    price = session.query(coin_price.Date,coin_price.Open_USD, coin_price.High_USD, coin_price.Low_USD, coin_price.Close_USD).all()
    price_dataset = []
    for item in price:
        price_dataset.append(item)
    
    return jsonify(price_dataset)

@app.route("/api/main/marketcap")
def marketcapRoute(): 
    marketCap = session.query(market_cap.Cryptocurrencies, market_cap.Markets, market_cap.Market_Cap, market_cap.BTC_Dominance).all()
    marcap_dataset = []
    for item in marketCap:
        marcap_dataset.append(item)
    
    return jsonify(marcap_dataset)

@app.route("/api/main/rating")
def ratingRoute(): 
    rating_data = session.query(rating.Date, rating.Rank, rating.Score).all()
    rating_dataset = []
    for item in rating_data:
        rating_dataset.append(item)
    
    return jsonify(rating_dataset)

if __name__ == "__main__":
    app.run()

