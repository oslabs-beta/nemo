const dbFuncs = {};

// This function initiates a call to /database endpoint which
// begins fetching data, and starts posting to MongoDB throug
// middleware. setInterval will continue the process at a given
// interval in ms.
dbFuncs.postData = async function () {
  const intervalFunc = async () => {
    await fetch('http://localhost:3000/database').then(
      console.log('Data posted to DB')
    );
  };

  setInterval(intervalFunc, 5000);
};

export default dbFuncs;
