/*
*    main.js
*/

var gap = 30;
var w = 40;

var svg = d3.select( '#chart-area' ).append( 'svg' )
    .attr( 'width', 1000 )
    .attr( 'height', 1000 );

d3.json( 'data/buildings.json' ).then( ( data ) => {
    var rect = svg.selectAll( 'rect' ).data( data ); 
    console.log( data );

    var heights = [];

    data.forEach( ( d ) => {
        d.height = +d.height
        heights.push( d.height );
    });

    var maxHeight = Math.max.apply( Math, heights );

    var rect = svg.selectAll( 'rect' )
        .data(data);

    rect.enter().append( 'rect' )
        .attr( 'x', ( d, i ) => { return w * i + w * i * 0.5 + gap } )
        .attr( 'y', ( d ) => { return (maxHeight) - d.height } )
        .attr( 'width', w )
        .attr( 'height', ( d ) => { return d.height } )
        .attr( 'fill', 'blue' );
});