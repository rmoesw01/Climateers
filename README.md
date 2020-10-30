# [Climateers](#)
**_Created by [Maria Dong](https://github.com/mariajdong), [Ryan Jones](https://github.com/Jonsey1696), [Rebecca Leeds](https://github.com/rmoesw01), & [Amber Pizzo](https://github.com/apizzo1)._**

A site that analyzes and predicts climate change and its effects.

**Access the deployed page [here](#).**

## Background
As our world progresses technologically, the health of our planet degrades day by day. Our group's aim was to analyze the trends seen today and model how our world could look in the future using machine learning.

## Topics
We explored several different phenomena and questions for our models to answer.

### Global Temperatures
_Is the Earth getting warmer?_


### Ocean Impacts
_How have the world's oceans been affected?_

**Sea level modeling**  
A linear regression machine learning model was used to predict the future trend of sea levels, as historical sea level temperatures displayed a linear increase over time. Input factors included historical cement emissions, global temperature, population, sea temperature change, and CO2 emissions. The testing score for this model was 0.98, indicating that this model is, in fact, reliable. Future sea levels were also predicted by fitting a trend line to historical sea level data. The result of this simplistic linear regression for the year 2200 was within 1.5in of the result for the machine learning model for the same year, which also boosts confidence in the machine learning model.

**Sea temperature modeling**  
Noting that the historical sea temperature trend is fairly linear, a linear regression machine learning model was employed to predict the future trend for sea temperature. The input factors used for this model were historical global temperature, population, glacier mass, and sea level changes. The testing score for this model was 0.97, and therefore can be considered a very reliable model. 

### Weather Impacts
_How have weather and natural disasters responded to climate change? Should we expect more extreme weather systems?_

**Hurricane Modeling**  
Hurricane data  collected from the National Hurricane Center ranged back to the 1850s, but did not include a storm intensity category, likely because the method to categorize hurricanes, the Saffir-Simpson Hurricane Wind Scale, was not introduced until 1971. Therefore, unsupervised learning was utilized, in the form of a k-means clustering model, to group hurricanes by their minimum pressure and maximum windspeed. This model was optimized to have four categories of hurricane intensity. From there, linear regression machine learning models were used to predict the frequency of total hurricanes, as well as the frequency of each category of hurricane. Most models prove to be relatively reliable, with testing scores at 0.75 and above. However, the model for category 4 hurricanes shows a less reliable testing score of 0.68. The k-means clustering model shows the category 4 data as the most diverse of the 4 categories, with both maximum wind speed and minimum pressure having a larger range than any of the other categories. This model could be further optimized by adding more categories, and thus reducing the large range in this particular category.  This may lead to more reliable modeling of future trends. The model inputs and testing scores can be seen below. 
- Total hurricanes:
    - Inputs: historical gas fuel emissions, sea temperature changes, global temperature, and sea level changes
    - Testing score: 0.83
- Category 1 hurricanes: 
    - Inputs: historical gas fuel emissions, sea temperature changes, global temperature, and sea level changes
    - Testing score: 0.79
- Category 2 hurricanes:
    - Inputs: historical gas fuel emissions, cement emissions, global temperature, sea temperature changes, and sea level changes
    - Testing score: 0.75
- Category 3 hurricanes: 
		- Inputs: historical gas fuel emissions, sea temperature changes, global temperature, and sea level changes  
    - Testing score: 0.78
- Category 4 hurricanes:  
    - Inputs: historical gas fuel emissions, liquid fuel emissions, global temperature, sea temperature changes, and sea level changes  
    - Testing score: 0.68

**Tornado Modeling**  
Linear regression models were used to predict the frequency of total tornadoes, as well as the frequency of tornado magnitudes 0 and 2 (based on the Fujita Scale). Reliable models could not be created for magnitude 1, 3, 4, or 5 tornadoes. This is likely because the historical data for tornadoes of these magnitudes shows very consistent numbers from year to year, making It difficult to predict their future with the global warming factors employed in this project that show a steady increase over time. This indicates tornadoes of these magnitudes are not reliant on the traditional indicators of global warming. The inputs for the models that were created, as well as their testing scores can be seen below. 
- Total tornadoes:
    - Inputs: historical gas fuel emissions, cement emissions, global temperature, population, CO2 emissions, and sea level changes
    - Testing score: 0.69
- Magnitude 0 tornadoes: 
    - Inputs: historical gas fuel emissions, liquid fuel emissions, cement emissions, global temperature, population, and CO2 emissions
    - Testing score: 0.82
- Magnitude 2 tornadoes:
    - Inputs: historical gas fuel emissions, liquid fuel emissions, cement emissions, global temperature, population and sea temperature changes 
    - Testing score: 0.74

### Public Sentiment
_How does the public feel about climate change? Can we replicate online opinions with deep learning?_

In the U.S., the existence of climate change and the role of CO2 emissions have become a highly partisan topic. The U.S. ranked in the lower-half of percent of respondents who consider climate change to be a "major threat", and had the fourth-highest percentage of respondents stating that climate change is "not a threat".

twitter model

### Awareness
_What parts of our behavior could we change? What is the cost/effectiveness of renewable energy? And how are we directly impacting the CO2 concentration levels?_
* CO2 - The features of this model are related to different fossil fuel emission concentrations in the atmosphere and variations in global temperature. As a multivariate regression, correlation between these datapoints is proved to be linear. One of the major contributors to these emmisions is the agricultural supply chain that serves the World's population. Changing land use to meet the demand of most current diets and consuming farm sourced animal products has created a major problem of how we interact with the environment. This results in our rate of polution pairing with population growth to a degree that is dangerous for our future.

We trained our models to predict and validate indicators of the effects of climate change to answer the following questions:

---


How have the worlds oceans been affected?

This is consistent with rising global temperatures, both atmospheric and oceanic. This also directly contributes to rising sea levels, which in turn leads to flooding and higher likelihood of hurricane formation.


Should we expect more extreme weather systems?

What parts of our behavior could we change?

Opportunities to slow down the consumption of farmed animals which also would decrease the rate in which land is changed for housing livestock.


What is the cost/reward of renewable energy?

How are we directly impacting the CO2 concentration levels?

Changing landscape for agricultural purposes often leads to an unstable phosphate level in surrounding waterways. Land use change & animal waste accounts for 83% of greenhouse gas emissions from agriculture.

**Data sources:**
* [Our World in Data](https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions) for historical C02 levels & emissions
* [Datahub.io](https://datahub.io/core/co2-fossil-global) for fossil fuel emissions
* [Our World in Data](https://ourworldindata.org/environmental-impacts-of-food) for agricultural data

**Libraries:**
* [Scikit.Learn](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html) for Multivariate Regression

**Tools & languages:** JavaScript, HTML, CSS, Python, Jupyter Notebook

