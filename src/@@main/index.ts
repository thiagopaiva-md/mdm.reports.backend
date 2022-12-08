import 'reflect-metadata';
import { config as dotEnvConfig } from 'dotenv';

import ContainerRegister from '@modules/@container/ContainerRegister';
import APIServer from '@api/server';

dotEnvConfig();

ContainerRegister.registerAll();

const apiServer = new APIServer();
apiServer.listen();
