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

session = Session(engine)

## FRONT_END ROUTES
@app.route("/")
def main(): 
    return render_template("index.html")


if __name__ == "__main__":
    app.run()