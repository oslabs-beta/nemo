import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiMetrics = kc.makeApiClient(k8s.CustomObjectsApi);

const metricServerController = {};

metricServerController.getPods = async (req, res, next) => {
  try {
    //need to work to make 'kube-system' dynamic to work with any users contexts/namespaces
    const data = await k8sApi.listNamespacedPod('kube-system');
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
    //need to work to make 'kube-system' dynamic to work with any users contexts/namespaces
    const data = await k8sApi.listNode('kube-system');
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

export default metricServerController;
