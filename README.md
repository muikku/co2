# co2 emission app
Preliminary assignment for Reaktor summer job application.
My first web app project after Helsinki university full stack course.
I started this project January 13. 2019, and used as much time as I could between family, fulltime work and Helsinki university Ohjelmoinnin MOOC 2019 -course.

react, node 

frontend working @ https://muikkuco2.herokuapp.com/
api @ https://muikkuco2api.herokuapp.com/

todo:

start using google charts, refactor transformer.js for that

make charts work properly when giving bad year, pie chart year 1960 not working properly, so is any year?

change labels more consistent

check method/function names 

//////////////////////////////////

The assingment:

Climate change and carbon dioxide emissions are one of the biggest challenges for the future of humanity. As the population of the world increases, so do emissions. According to a report by the IPCC, we need to make vast changes quickly. Before 2030, man-made carbon dioxide emissions need to be reduced by about 45 percent from 2010 levels. Before 2050, the carbon footprint of the entire world’s population should be neutral.

Your task is to implement an application that lets the user search carbon dioxide emissions by location.

Data for the assignment
The World Bank provides data on population and carbon dioxide emissions, among other things. Use the following data sources in your application:

Population
CSV: http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv

or XML: http://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=xml

Carbon dioxide emissions
CSV: http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=csv

or XML: http://api.worldbank.org/v2/en/indicator/EN.ATM.CO2E.KT?downloadformat=xml

A word from the product owner
The following should be taken into account when implementing the application:

Our end-users usually have both a mobile device and a laptop, and they need to be able to use the application with one of them.
It is essential that we can implement different kinds of user interfaces in the future. To make this possible, the application should have an API for querying the data.
It is of utmost importance that the application requires as little maintenance as possible. For example, the data must always be up to date – even after a long period of time.
Notes from our user research
We carried out small-scale user research during the concept phase of the application development and the following points should be taken into consideration:

It would be very interesting to examine the relationship between a country’s carbon dioxide emissions and its population. In particular, which countries are the largest emitters relatively speaking.
I would like to understand the carbon emissions near where I live. It would be interesting to know how the situation has changed during my lifetime.
I wonder how big of a role the world’s superpowers have in global carbon emissions? I would like to compare those to the emissions of other countries.
The user interface designer’s first draft


The user interface designer involved in the project has created a first draft of the upcoming user interface for the application. According to the designer, the most important elements in the user interface could be search, results, and a possibility to show the emissions relative to a country’s population.

The draft is more of a reference and it’s quite possible that there is a better solution. You can either base your implementation on the given design, or create your own draft and base the implementation on top of that – whichever you prefer.

Guidance for the task
The solution of the project should be a display of your coding skills and not only how well you fulfill requirements. You should concentrate on the parts where you think your skills will shine.
You are free to assume that the user’s phone and computer both have a modern web browser.
When solving the problem, make sure that your code is split into sensible units and that they are easy to read and understand.
Additionally, your application should be testable – you could use a service like Heroku to deploy your completed application.
