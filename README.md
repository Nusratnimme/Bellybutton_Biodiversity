# Prime "belly button" beef
## Overview
Improbable Beef, a synthetic beef producer is in search of micro organisms that can create the perfect taste of beef. Roza is a biological reasercher in their microbiology lab. She has a hypothesis that the answer lies in our belly button, i.e., bacteria found in human belly button can emulate that coveted flavour.

For this purpose, Roza has collected samples from a large number of people across US and analyzed the bacteria population in their belly buttons. She needs to create a webpage with visualization of the findings that both the researchers and the volunteers can use. The users need to be able to filter the charts by volunteers' IDs to look at diversity and population of bacteria in an individual participant's belly button.

### Resources

- Data Sources: samples.json
- Softwares: VS Code, Javascript, Plotly, Bootstrap, d3, HTML

### Purpose

The main objective of this project is to create a dashboard using Javascript, Plotly and HTML to display data on bacterial sample from all test subjects' belly buttons. The dashboard has to be interactive where the user could select a test subject's ID and the dashboard would display the following for that specific subject:

- Demographic Information;
- Bar chart of the top 10 bacteria cultures found;
- Gauge chart of belly button washing frequency per week;
- Bubble chart of bacteria cultures per sample.

## Results

The belly button biodiversity dashboard can be found at https://nusratnimme.github.io/Bellybutton_Biodiversity/ .

- To create the initial dashboard, an HTML page was created  containing a jumbotron for the title, a drop down list for test subject IDs, a panel for subject's demographic information, and three panels for charts to display the data. Bootstrap was used as a stylesheet and d3, plotly and samples.json were included as script tags to read the data.

- Next, Javascript functions we defined to build the contents. The functions are as below:

1. The function **selector** takes as input the selected ID which is then used to filter the other contents.

2. The function **optionChanged()** uses the selected ID to update the data and charts accordingly.

3. The **buildMetadata** function filters demographic information for the selected ID to display in the panel.

4. The function **buildCharts** creates the following three charts using Plotly for the selected ID:

### Horizontal Bar Chart
The bar chart shows the top-10 bacteria in the selected subject's belly button by population. 

### Bubble Chart
The bubble charts shows the population of different bacteria found in the subject's belly button represented by the size of the respective bubble.

### Gauge Chart
The Guage chart shows how often does the subject wash their belly buttons in a week.

#### The customized dashboard is showing below.

![Bellybutton_Biodiversity_Dashboard](https://github.com/Nusratnimme/Bellybutton_Biodiversity/blob/main/Image/webpage.png)
