import matplotlib.pyplot as plt
import numpy as np
import plotly.express as px
import pandas as pd
import seaborn as sns



LISTINGS = 'listings.csv'
NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


def main():

    listings = pd.read_csv(LISTINGS)

    listings['bathrooms'] = listings['bathrooms_text'].apply(lambda x: x.split(" ")[0] if type(x) == str else 0)
    listings['bathrooms'] = listings['bathrooms'].apply(lambda x: float(x) if str(x)[0] in NUMBERS else np.nan)
    listings['bathrooms'] = listings['bathrooms'].dropna()

    fig = px.scatter(listings, x='bathrooms', y='review_scores_value')
    fig.show()

    fig = px.histogram(listings, color='bathrooms', x='review_scores_value', barmode='group', histnorm="percent")
    fig.show()

    sns.kdeplot(listings, x='bathrooms', y='review_scores_value')
    plt.show()

if __name__ == "__main__":
    main()