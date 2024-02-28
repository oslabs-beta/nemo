import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

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

metricServerController.getTopPods = async (req, res, next) => {
  try {
    console.log('entered top pods middleware');
    const data = await k8s.topPods(k8sApi, metricsClient, '');
    console.log(data);
    const totalUsage = data.reduce(
      (acc, pod) => {
        acc.totalCpu += parseFloat(pod.CPU.CurrentUsage);
        acc.totalMemory += parseFloat(Number(pod.Memory.CurrentUsage));
        return acc;
      },
      { totalCpu: 0, totalMemory: 0 }
    );
    const topPods = data.map((pod) => {
      return {
        NODE_NAME: pod.Pod.spec.nodeName,
        POD_NAME: pod.Pod.metadata.name,
        UID: pod.Pod.metadata.uid,
        CREATED_AT: pod.Pod.metadata.creationTimestamp,
        CPU_USAGE_CORES: pod.CPU.CurrentUsage,
        CPU_PERCENTAGE: (
          (parseFloat(pod.CPU.CurrentUsage) / totalUsage.totalCpu) *
          100
        ).toFixed(3),
        // number is provided as bigInt by api
        MEMORY_USAGE_BYTES: Number(pod.Memory.CurrentUsage),
        MEMORY_PERCENTAGE: (
          (parseFloat(Number(pod.Memory.CurrentUsage)) /
            totalUsage.totalMemory) *
          100
        ).toFixed(3),
        CONTAINER_COUNT: pod.Containers.length,
        CONDITIONS: pod.Pod.status.conditions,
      };
    });
    res.locals.topPods = topPods;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getTopPods: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getTopPods. Check server logs.',
      },
    });
  }
};

metricServerController.getContainers = async (req, res, next) => {
  try {
    const data = await k8s.topPods(k8sApi, metricsClient, '');
    //console.log(data[2].Containers);
    const containers = data.flatMap((pod) => {
      return pod.Containers.map((container) => {
        return {
          NODE_NAME: pod.Pod.spec.nodeName,
          POD_NAME: pod.Pod.metadata.name,
          CONTAINER_NAME: container.Container,
          CPU_CURR_USAGE_CORES: container.CPUUsage.CurrentUsage,
          CPU_REQUEST_CORES: container.CPUUsage.RequestTotal,
          CPU_CORES_LIMIT: container.CPUUsage.LimitTotal,
          MEMORY_USAGE_BYTES: Number(container.MemoryUsage.CurrentUsage),
          MEMORY_REQUEST_BYTES: Number(container.MemoryUsage.RequestTotal),
          MEMORY_BYTES_LIMIT: Number(container.MemoryUsage.LimitTotal),
        };
      });
    });
    //console.table(containers);
    // console.log(containers);
    res.locals.containers = containers;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getContainers: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getContainers. Check server logs.',
      },
    });
  }
};

metricServerController.getTopNodes = async (req, res, next) => {
  try {
    console.log('entered top nodes middleware');
    const data = await k8s.topNodes(k8sApi);
    console.log(data);
    const topNodes = data.map((node) => {
      return {
        NODE_NAME: node.Node.metadata.name,
        UID: node.Node.metadata.uid,
        CREATED_AT: node.Node.metadata.creationTimestamp,
        IP_ADDRESSES: node.Node.status.addresses,
        RESOURCE_CAPACITY: node.Node.status.capacity,
        ALLOCATABLE_RESOURCES: node.Node.status.allocatable,
        NODE_INFO: node.Node.status.nodeInfo,
        CONDITIONS: node.Node.status.conditions,
        CPU_CAPACITY: node.CPU.Capacity,
        CPU_REQUEST_TOTAL: node.CPU.RequestTotal,
        CPU_LIMIT_TOTAL: node.CPU.LimitTotal,
        MEMORY_CAPACITY: Number(node.Memory.Capacity),
        MEMORY_REQUEST_TOTAL: Number(node.Memory.RequestTotal),
        MEMORY_LIMIT_TOTAL: Number(node.Memory.LimitTotal),
      };
    });
    res.locals.topNodes = topNodes;
    return next();
  } catch (err) {
    return next({
      log: `metricServerController.getTopNodes: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in metricServerController.getTopNodes. Check server logs.',
      },
    });
  }
};

export default metricServerController;
