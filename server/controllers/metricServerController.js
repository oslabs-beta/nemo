import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sNetworkingApi = kc.makeApiClient(k8s.NetworkingV1Api);
//const k8sApiMetrics = kc.makeApiClient(k8s.CustomObjectsApi);

const metricServerController = {};

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

//listNamespacedIngress
//listNamespacedDeployment

//config maps? --- listNamespacedConfigMap
//persistent volume? --- listPersistentVolume, listNamespacedPersistentVolumeClaim

//jobs cronjobs --- listNamespacedJob, listNamespacedCronJob
//secrets --- listNamespacedSecret
//roles and role binding --- listNamespacedRole, listNamespacedRoleBinding

export default metricServerController;
