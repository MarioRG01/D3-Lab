// Building challenge example
d3.json('data/buildings.json').then((data) => {
    data.forEach(element => {
        element.height = +element.height;
    });
    var buildings = data.map((d) => {return d.name});

    const margin = {left : 100, right : 10, top : 10, bottom : 150};

    const width = 600;
    const height = 400;

    const x = d3.scaleBand()
                    .domain(buildings)
                    .range([0, width])
                    .paddingInner(0.3)
                    .paddingOuter(0.3);

    const y = d3.scaleLinear().domain([0, 828]).range([height, 0]);

    const color = d3.scaleOrdinal()
                    .domain(buildings)
                    .range(d3.schemeSet3)
                    .unknown(null);


    var g = d3.select("#chart-area")
                .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                .append("g")
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    g.append("g")
        .attr('class', "bottom axis")
        .attr('transform', 'translate(0, ' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr('text-anchor', 'end')
        .attr('font-size', '10px')
        .attr('transform', `rotate(-40) translate(-5, 10)`);
    g.append("text")
        .attr('class', 'y axis-label')
        .attr('x', (width) / 2)
        .attr('y', height + margin.bottom - margin.top)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .style('fill', 'black')
        .text("The World Tallest Buildings ");
    g.append("g")
        .attr('class', 'left axis')
        .call(d3.axisLeft(y).ticks(5).tickFormat((d) => {return d + "m";}));
    g.append("text")
        .attr('class', 'x axis-label')
        .attr('x', -(height / 2))
        .attr('y', -50)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .style('fill', 'black')
        .text("Height (m)");

    var rectangles = g.selectAll("rect").data(data);

    

    rectangles.enter().append("rect")
        .attr('x', (d) => {return x(d.name)})
        .attr('y', (d) => {return y(d.height)})
        .attr('width', x.bandwidth())
        .attr('height', (d) => {return height - y(d.height)})
        .attr('fill', (d) => {return color(d.name)});

}).catch((error) => {
    console.error(error);
})