// export const sortData = (data) => {
//   const sortedData = [...data];
//   sortedData.sort((a, b) => {
//     if (a.cases > b.cases) {
//       return -1;
//     } else {
//       return 1;
//     }
//   });
//   return sortedData;
// };


export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      return a.cases > b.cases?-1:1
    });
    return sortedData;
  };
