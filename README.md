# Economic Dashboard

## Previews
Demo https://desupervised-economic-dashboard.netlify.app/

Repository https://github.com/nayakayp/economic-dashboard
![image](https://user-images.githubusercontent.com/24706517/191879063-ca581013-159b-4af9-929a-5f24c3364154.png)
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Summary
### Technology Planning
* This app using pure Reactjs as a main framework. I also using TailwindCSS/TailwindUI components for styling because I don't want spent too much time in designing when my code functionality isn't correct.
* Absolutely I'm using Rechart as suggested in description for visualizing chart. The library documentation is simple and the example already provided. I don't need to research other library.
* I don't use pre-made table components to visualize table. Instead, I'm using react-table because of the feature Headless UI the library provided so I can customize as the problem needs to solve.
* I don't use Typescript but for type safe purpose, I'm using PropTypes packages so I can safely type my code.
* I also use eslint and prettier to make my code isn't look bad, following good practice, and good enough for others to read. 
* Then if other devs want to contribute to my code, I already setting husky with pre-commit command to make sure our code style is the same before push to github. Even when we work in different local environment.
### Data Analayzing
* I was given 3 different datas. But as I analyze, it actually only Sales.csv data is different from Brand.csv and Media.csv. 
* But still this step is actually the most time consuming for me. I thought the data is already clean but it's not. I have to cleaning the data and grouping one column to other for sorting and filtering filtering purpose so I can tell to visitor what information inside the .csv file.
* The cleaning step is quite simple. I only need to remove unnecessary column likes Grouping and Region colum in Brand.csv file and sort ascending all of the rows by Date column. All done by using csvtojson packages. 
* The most consuming time is how I finally decide the column grouping. For example, in Brand.csv. I have to group *Brand* column to summarize what unique data that *Brand's* column have. Then, I have to make a group again between *Brand's* column that already grouped with *Metric's* column. After this process I can read what information that Brand.csv has.
### Data Visualization
* I try to split to 3 tabs corresponding with the amount of file that I have. Which is Brand, Media, and Sales tab.
* Inside the tab, I try to extract the information to Line Chart, PieChart and Tables. The web visitor can:
    * Scroll through the dates by using Line Chart.
    * See all time summary by using Pie Chart.
    * Sort the data each column by using the Tables.
### Final Thought
The estimation time that you predict (3 hours) is really realistic. But for me, It's after I know how to extract the information in the datas. When the first time I receive the assignment from you, I immediately did what Frontend engineer usually did. See the design then slicing the design. After several days later I endup realized that my data visualization is wrong. I miss some steps like cleaning and grouping the data. And eventually redo it again to make it correct and easy to read by visitors. 

I realize when I finished this project that I can analyze data easier & faster if from the start I'm using SQL.

But. This assignment challenged me and gave me a lot of experience in visualizing data. At the same time makes me interested in exploring more about SQL.

Thank You.
