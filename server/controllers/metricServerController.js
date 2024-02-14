import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sNetworkingApi = kc.makeApiClient(k8s.NetworkingV1Api);
const k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api);
//const k8sApiMetrics = kc.makeApiClient(k8s.CustomObjectsApi);

const metricServerController = {};

const metricsClient = new k8s.Metrics(kc);

metricServerController.getPods = async (req, res, next) => {
  try {
    const data = await k8sApi.listPodForAllNamespaces();
    res.locals.pods = data.body.items;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getPods: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getPods. Check server logs.',
      },
    });
  }
};

metricServerController.getNodes = async (req, res, next) => {
  try {
    const data = await k8sApi.listNode();
    res.locals.nodes = data.body.items;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getNodes: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getNodes. Check server logs.',
      },
    });
  }
};

metricServerController.getNamespaces = async (req, res, next) => {
  try {
    const data = await k8sApi.listNamespace();
    res.locals.namespaces = data.body.items;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getNamespaces: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getNamespaces. Check server logs.',
      },
    });
  }
};

metricServerController.getServices = async (req, res, next) => {
  try {
    const data = await k8sApi.listServiceForAllNamespaces();
    res.locals.services = data.body.items;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getServices: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getServices. Check server logs.',
      },
    });
  }
};

metricServerController.getIngresses = async (req, res, next) => {
  try {
    const data = await k8sNetworkingApi.listIngressForAllNamespaces();
    res.locals.ingresses = data.body.items;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getIngresses: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getIngresses. Check server logs.',
      },
    });
  }
};

metricServerController.getDeployments = async (req, res, next) => {
  try {
    const data = await k8sAppsApi.listDeploymentForAllNamespaces();
    res.locals.deployments = data.body.items;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getDeployments: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getDeployments. Check server logs.',
      },
    });
  }
};

metricServerController.getPodMem = async (req, res, next) => {
  try {
    const data = await k8s.topPods(k8sApi, metricsClient, '');
    const podsColumns = data.map((pod) => {
      return {
        POD: pod.Pod.metadata.name,
        'CPU(cores)': pod.CPU.CurrentUsage,
        // number is provided as bigInt by api
        'MEMORY(bytes)': Number(pod.Memory.CurrentUsage),
      };
    });
    res.locals.podMem = podsColumns;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getPodMem: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getPodMem. Check server logs.',
      },
    });
  }
};

// metricServerController.getContainers = async (req, res, next) => {
//   try {
//     const data = await k8s.topPods(k8sApi, metricsClient, '');
//     const podsAndContainersColumns = data.flatMap((pod) => {
//       return pod.Containers.map((containerUsage) => {
//         return {
//           POD: pod.Pod.metadata.name,
//           NAME: containerUsage.Container,
//           'CPU(cores)': containerUsage.CPUUsage.CurrentUsage,
//           'MEMORY(bytes)': containerUsage.MemoryUsage.CurrentUsage,
//         };
//       });
//     });
//     console.table(podsAndContainersColumns);
//     res.locals.containers = podsAndContainersColumns;
//   } catch (err) {
//     return next({
//       log: `metricServerController.getContainers: ERROR ${err}`,
//       status: 500,
//       message: {
//         err: 'Error occured in metricServerController.getContainers. Check server logs.',
//       },
//     });
//   }
// };

export default metricServerController;
