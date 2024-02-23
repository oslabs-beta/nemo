const dbFuncs = {};

dbFuncs.postData = async function () {
  // HELPER FUNC
  // fetch (get) request to get data
  // const dbObj = {};
  // functionality for timestamp

  // dbObj.cpu1 = await fetch;
  const intervalFunc = async () => {
    console.log('inside interval func');
    await fetch('/database')
      .then((data) => data.json())
      .then((data) => {
        console.log('Sent fetch to database');
      });
  };
  // fetch (post)
  //fetch database/post
  // server.js
  // router
  // controller - > MongoDB

  // fetch request to pull metric server data
  // router for metric server
  // controller for metric server

  // fetch request to post data to db
  // router for db
  // controller for db

  //interval 5000
  // fetch request for database
  // router
  // controller metric server, res locals
  // controller database
  // sends to Mongo

  setInterval(intervalFunc, 1000);
};

export default dbFuncs;
