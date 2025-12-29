const { AmplifyClient, ListAppsCommand, ListJobsCommand } = require('@aws-sdk/client-amplify');
const client = new AmplifyClient({ region: 'eu-central-1' });

async function checkStatus() {
  try {
    const apps = await client.send(new ListAppsCommand({}));
    const app = apps.apps.find(a => a.name === 'my-portfolio-aws');
    if (!app) {
      console.log('❌ App not found');
      return;
    }
    console.log('📋 App ID:', app.appId);
    console.log('📊 App Status:', app.appState);

    const jobs = await client.send(new ListJobsCommand({ appId: app.appId, branchName: 'master' }));
    const latestJob = jobs.jobSummaries[0];
    if (latestJob) {
      console.log('🏗️ Latest Job Status:', latestJob.status);
      console.log('🆔 Job ID:', latestJob.jobId);
      console.log('⏰ Start Time:', latestJob.startTime);
      console.log('🏁 End Time:', latestJob.endTime || 'Still running');
    } else {
      console.log('❓ No jobs found');
    }
  } catch (e) {
    console.log('❌ Error:', e.message);
  }
}

checkStatus();