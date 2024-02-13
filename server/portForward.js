import { spawn } from 'child_process';

const portObj = {};

portObj.pForward = function () {
  // run kubectl using spawn command

  const pod = 'node-exporter-7b4bd85d99-9dwm2';
  const ports = '9100:9100';
  const options = { shell: true };
  const com = spawn('kubectl port-forward', [pod, ports], options);

  // console log data to terminal
  com.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  // console.log errors to terminal
  com.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // this is probably not currently funtional as port forwarding currently
  // terminates when user stops server with ctrl + c
  com.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

export default portObj;
