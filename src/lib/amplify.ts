import { Amplify } from 'aws-amplify';
import config from '../../amplifyconfiguration.json';

// Configure Amplify with your AWS resources
Amplify.configure(config);

export { Amplify };
