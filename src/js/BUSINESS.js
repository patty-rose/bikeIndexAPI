export default class BikeIndex {
  static async getBikes(zipCode) {
    try {
      const reply = await fetch(`https://bikeindex.org/api/v3/search?location=${zipCode}&distance=10&stolenness=proximity`);
      if(!reply.ok) {
        throw Error(reply.error);
      } return reply.json();
    } catch(error) {
      return error.message;
    }
  }
}


//     return new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       const url = `https://bikeindex.org/api/v3/search?location=${zipCode}&distance=10&stolenness=proximity`;
//       request.onload = function() {
//         if (this.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(request.response);
//         }
//       }
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }