import requests
import pandas as pd
import json
import csv
from geojson import Feature, FeatureCollection, Point

def converter(csv_filepath, pred_filepath, output_path, date_col, y_col):

    data_df = pd.read_csv(csv_filepath)
    pred_df = pd.read_csv(pred_filepath)
    
    features = []

    for row in data_df.iterrows():
        features.append(
            {
                "year": f'{int(row[1][date_col])}-01-01 00:00',
                "observed": row[1][y_col]
            }
        )

    for row in pred_df.iterrows():    
        features.append(
            {
                "year": f'{int(row[1][date_col])}-01-01 00:00',
                "easing": row[1]["easing"],
                "maintaining": row[1]["maintaining"],
                "increasing": row[1]["increase"] 
            }
        )
    with open(output_path, "w") as f:
        f.write("%s" % features)

# converter("static/data/dfFilt.csv","static/data/TMAX_pred_df.csv","static/data/TMAX.json","Year","TMAX")
converter("static/data/dfFilt.csv","static/data/snow_pred_df.csv","static/data/snow.json","Year","SNOW")