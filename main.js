//Define data
const listing = d3.csv("listings.csv");

listing.then(function(data) {
           // Extract ratings from the dataset
           const ratings = data.map(d => d.review_scores_value);
           const bin = 50;

           // Define dimensions for the chart
           const margin = { top: 30, right: 30, bottom: 50, left: 50 };
           const width = 800 - margin.left - margin.right;
           const height = 400 - margin.top - margin.bottom;
   
           // Create SVG element
           const svg = d3.select("#plot")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
               .attr("transform", `translate(${margin.left},${margin.top})`);
   
           // Create scales
           const x = d3.scaleLinear()
               .domain([1, 5]) // Assuming ratings range from 1 to 5
               .range([0, width]);
   
           const bins = d3.histogram()
               .domain(x.domain())
               .thresholds(x.ticks(bin))
               (ratings);
   
           const y = d3.scaleLinear()
               .domain([0, d3.max(bins, d => d.length)])
               .range([height, 0]);
   
           // Create bars
           svg.selectAll(".bar")
               .data(bins)
               .enter().append("rect")
               .attr("class", "bar")
               .attr("x", d => x(d.x0) + 1)
               .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
               .attr("y", d => y(d.length))
               .attr("height", d => y(0) - y(d.length));
   
           // Create x-axis
           svg.append("g")
               .attr("class", "axis")
               .attr("transform", `translate(0,${height})`)
               .call(d3.axisBottom(x));
   
           // Create y-axis
           svg.append("g")
               .attr("class", "axis")
               .call(d3.axisLeft(y));
   
           // Add x-axis label
           svg.append("text")
               .attr("class", "axis-label")
               .attr("transform", `translate(${width / 2},${height + 1.5*margin.bottom / 2})`)
               .style("text-anchor", "middle")
               .text("Rating");
   
           // Add y-axis label
           svg.append("text")
               .attr("class", "axis-label")
               .attr("transform", "rotate(-90)")
               .attr("y", 0 - margin.left)
               .attr("x", 0 - height / 2)
               .attr("dy", "1em")
               .style("text-anchor", "middle")
               .text("Frequency");
   
           // Add title
           svg.append("text")
               .attr("class", "title")
               .attr("x", width / 2)
               .attr("y", 0 - (margin.top / 2))
               .attr("text-anchor", "middle")
               .text("Airbnb Ratings Distribution in Boston");

});

