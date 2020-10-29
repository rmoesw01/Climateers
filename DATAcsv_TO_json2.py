#!/usr/bin/env python
# coding: utf-8

# In[4]:


import requests
import pandas as pd
import json
import csv
from geojson import Feature, FeatureCollection, Point


# In[5]:


def converter(csv_filepath, pred_filepath, output_path, date_col, y_col):

    data_df = pd.read_csv(csv_filepath)
    pred_df = pd.read_csv(pred_filepath)
    
    features = []

    for row in data_df.iterrows():
        features.append(
            {
                "date": "new Date("+row[1][date_col]+")",
                "observed": row[1][y_col]
            }
        )

    for row in pred_df.iterrows():    
        features.append(
            {
                "date": "new Date("+row[1][date_col]+")",
                "easing": row[1]["easing"],
                "maintaining": row[1]["maintaining"],
                "increasing": row[1]["increase"] 
            }
        )
    with open(output_path, "w") as f:
        f.write("%s" % features)


# In[3]:





# In[ ]:




