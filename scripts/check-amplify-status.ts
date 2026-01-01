import { AmplifyClient, ListAppsCommand, ListJobsCommand } from '@aws-sdk/client-amplify';

const client = new AmplifyClient({ region: 'eu-central-1' });

async function checkStatus(): Promise<void> {
  try {
    // Use the existing connected app
    const appId = 'd3gpsu0f51cpej';
    console.log('📋 App ID:', appId);

    // Get app details
    const apps = await client.send(new ListAppsCommand({}));
    const app = apps.apps?.find((a) => a.appId === appId);
    if (!app) {
      console.log('❌ App not found with ID:', appId);
      return;
    }
    console.log('📊 App Status:', app.name || 'Unknown');

    const jobs = await client.send(new ListJobsCommand({ appId: app.appId, branchName: 'master' }));
    const latestJob = jobs.jobSummaries?.[0];
    if (latestJob) {
      console.log('🏗️ Latest Job Status:', latestJob.status);
      console.log('🆔 Job ID:', latestJob.jobId);
      console.log('⏰ Start Time:', latestJob.startTime);
      console.log('🏁 End Time:', latestJob.endTime || 'Still running');
    } else {
      console.log('❓ No jobs found');
    }
  } catch (e: unknown) {
    console.log('❌ Error:', (e as Error).message);
  }
}

checkStatus();
