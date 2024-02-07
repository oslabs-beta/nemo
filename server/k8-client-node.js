// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// const k8sApiMetrics = kc.makeApiClient(k8s.CustomObjectsApi);

// const getPodMetrics = async () => {
//   try {
//     const res = await k8sApiMetrics.listClusterCustomObject(
//       'metrics.k8s.io',
//       'v1beta1',
//       'pods'
//     );
//     const metrics = () => {
//       const allMetrics = res.body.items;
//       allMetrics.map((x) => {
//         console.log(
//           `Pod name: ${x.metadata.name}, \nCPU: ${x.containers[0].usage.cpu}, \nMemory: ${x.containers[0].usage.memory}, \n`
//         );
//       });
//     };
//     metrics();
//   } catch (err) {
//     console.error('Error fetching pod metrics:', err);
//   }
// };

// getPodMetrics();

// const main = async () => {
//   try {
//     //console.log(k8sApi);
//     const podsRes = await k8sApi.listNamespace();
//     console.log('pods: ', podsRes.body.items[0].metadata);
//   } catch (err) {
//     console.error(err);
//   }
// };

// main();
