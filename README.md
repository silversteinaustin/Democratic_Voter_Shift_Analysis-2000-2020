# Analysis of Voter Registration Trends in Relation to Marriage and Divorce Rates by State in 2020 vs 2000

## Project Overview

This project explores the potential correlations between voter registration trends and marital status dynamics across different states in the United States. By analyzing marriage rates, divorce rates, and voter registration figures, this study aims to uncover the impact of marital status on civic participation. The project seeks to answer key questions about the relationship between marital status and voter registration patterns, variations across states, and the factors driving these trends.

## Purpose

The primary objective is to identify if marital status significantly influences voter registration, thereby contributing to a deeper understanding of civic engagement across the United States. This analysis provides insights into how demographic factors like marriage and divorce rates may affect political participation.

## Tools and Technologies Used

- **Languages:** Python (for data analysis and visualization), JavaScript (for interactive web visualizations)
- **Libraries and Frameworks:** GeoPandas (for converting datasets to GeoJSON format), Plotly and Leaflet (for data visualization), Flask (for backend interaction and serving plots)
- **Data Management:** PostgreSQL (database for storing datasets)
- **Other Tools:** Jupyter Notebook (for Python commands and analysis), HTML/CSS (for presentation and styling of web pages)

## Repository Navigation

- **Main Branch:**
  - **Presentation:** Slide show presentation of the project findings.
  - **Read.me:** Overview and guide to the repository.
  - **.gitignore:** List of files and directories ignored in Git.
  - **Config.js:** Stores API Key (ensure security practices).
  - **Data Files:** GeoJSON and CSV datasets for marriage rates, divorce rates, and voter registration.
  - **GeoPandas.ipynb:** Python notebook for data processing and conversion to GeoJSON.
  - **static/:** Contains HTML, JS, and CSS files for web presentation.
    - **Index.html:** Entry point for project's web visualization.
    - **logic.js:** JavaScript for interactive visualizations.
    - **style.css:** Stylesheet for web presentation.
  - **Legal and Ethical considerations.docx:** Document outlining legal and ethical considerations of the project.

## Conclusion/Findings

- **Marriage and Divorce Trends:** Both marriage and divorce rates have shown significant changes since 2000, with a general increase in both metrics.
- **Voter Registration:** A notable shift towards Democratic party affiliation in most states was observed, suggesting a possible correlation with changes in marital status.
- **Ethical Considerations:** Careful evaluation ensured no exclusion or bias in data collection and analysis. Legal and ethical standards were maintained throughout the project.

## Instructions for Interaction

The project includes various interactive elements to enhance user engagement:
- **Visualizations:** Accessible through the Index.html file, presenting data through interactive maps and charts.
- **Data Exploration:** Users can explore datasets via the Flask backend or directly through JavaScript-powered HTML elements.
- **Filtering:** Options to filter data based on specific criteria, enabling personalized data visualization experiences.

## Data Sources

This project utilized authoritative and reliable data sources to ensure the accuracy and relevance of the analysis on voter registration trends in relation to marriage and divorce rates across different states in the United States for the years 2000 and 2020. Below are the specific sources of our data:

- **Voter Registration Data:**
  - Federal Election Commission (FEC): Provides comprehensive information on election results and voting, including detailed data for the federal elections of 2020. This data was instrumental in analyzing voter registration trends across states.
    - [Election Results and Voting Information - Federal Elections 2020](https://www.fec.gov/introduction-campaign-finance/election-results-and-voting-information/federal-elections-2020/)
- **Marriage Rates Data:**
  - Centers for Disease Control and Prevention (CDC): Offers detailed statistics on marriage rates by state, capturing the dynamics of marital status from 1990 to 2020. This longitudinal data provided a basis for examining changes in marriage rates over time.
    - [State Marriage Rates 90-95-99-20 (PDF)](https://www.cdc.gov/nchs/data/dvs/state-marriage-rates-90-95-99-20.pdf)
- **Divorce Rates Data:**
  - Centers for Disease Control and Prevention (CDC): Similarly, provides detailed statistics on divorce rates by state, allowing for a comparative analysis with marriage rates and voter registration trends.
    - [State Divorce Rates 90-95-99-20 (PDF)](https://www.cdc.gov/nchs/data/dvs/state-divorce-rates-90-95-99-20.pdf)

These sources were critical in conducting a comprehensive analysis of the interplay between marriage, divorce, and voter registration trends. By leveraging data from the FEC and CDC, this project ensures a high level of reliability and relevance in its findings.

## Ethical Considerations

Our project emphasizes ethical research practices, ensuring data privacy, avoiding discrimination, and maintaining transparency in data collection and analysis. We engaged in thorough discussions on potential biases and ethical implications to uphold the integrity of our findings.

Our datasets are under the Creative Commons Public Domain Dedication (CC0 1.0), promoting open access and use of the data for both academic and commercial purposes without the need for attribution, though it is appreciated.

[Creative Commons Public Domain Dedication (CC0 1.0 Universal)](https://creativecommons.org/publicdomain/zero/1.0/)
