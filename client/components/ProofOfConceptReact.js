// import React from 'react'
// import fs from 'fs'
// import { geoAlbersUsa, geoPath } from "d3-geo"
// import { feature } from "topojson-client"
// import axios from 'axios'
// import Canvas from 'canvas'

// export class ProofOfConcept extends React.Component {
//   constructor() {
//     super()
//     this.myRef = React.createRef()
//     this.state = {
//       states: [
//         {origin: 'Alabama', blahblah: 'Montgomery', latitude: 32.361538, longitude: -86.279118},
//         {origin: 'Alaska', blahblah: 'Juneau', latitude: 58.301935, longitude: -134.419740},
//         {origin: 'Arizona', blahblah: 'Phoenix', latitude: 33.448143, longitude:-112.096962}
//       ],
//       geographies: []
//     }
//   }

//   async componentDidMount() {
//     try {
//       const {data} = await axios.get('https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json')
//       const us = data.objects.states
//       // this.setState({
//       //   geographies: feature(data, data.objects.states).features
//       // })

//       var canvas = new Canvas(960, 600),
//       context = canvas.getContext("2d"),
//       path = geoPath().context(context);

//       context.beginPath();
//       path(topojson.mesh(us));
//       context.stroke();

//       canvas.pngStream().pipe(fs.createWriteStream("preview.png"));
//     } catch(err) {
//       console.error(err)
//     }
//   }

//   render() {
//     // const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])

//     return (
//       <img src="preview.png" width="960" height="600"></img>
//       // <div ref={this.myRef}></div>
//       // <svg width={ 975 } height={ 610 } viewBox="0 0 975 610">
//       //   <g className="states">
//       //     {
//       //       this.state.geographies.map((d,i) => {
//       //         console.log('d:', d)
//       //         const d2 = geoPath().projection(projection)(d)
//       //         //console.log('d2:', d2)
//       //         return (
//       //           <path
//       //             key={ `path-${ i }` }
//       //             d={ d2 }
//       //             className="state"
//       //             fill='#444'
//       //             //fill={ `rgba(38,50,56,${ 1 / this.state.geographies.length * i})` }
//       //             stroke="#FFFFFF"
//       //             strokeWidth={ 0.5 }
//       //           />
//       //       )})
//       //     }
//       //   </g>
//       //   {/* <g className="markers">
//       //     <circle
//       //       cx={ this.projection()([8,48])[0] }
//       //       cy={ this.projection()([8,48])[1] }
//       //       r={ 10 }
//       //       fill="#E91E63"
//       //       className="marker"
//       //     />
//       //   </g> */}
//       // </svg>
//     )
//   }
// }
