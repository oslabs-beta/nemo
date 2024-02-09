import k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApiMetrics = kc.makeApiClient(k8s.CustomObjectsApi);

const k8MetricController = {};

k8MetricController.getPods = async (req, res, next) => {
  try {
    //need to work to make 'kube-system' dynamic to work with any users contexts/namespaces
    const data = await k8sApi.listNamespacedPod('kube-system');
    console.log(data.body.items);
    res.locals.pods = data.body.items;
    return next();
  } catch (err) {
    return next({
      log: `k8MetricController.getPods: ERROR ${err}`,
      status: 500,
      message: {
        err: 'Error occured in k8MetricController.getPods. Check server logs.',
      },
    });
  }
};

export default k8MetricController;
