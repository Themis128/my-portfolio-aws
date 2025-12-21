#!/usr/bin/env node

import { execSync } from "node:child_process";

console.log("🗑️ Starting AWS resource deletion...\n");

const AWS_REGION = process.env.AWS_REGION || "eu-central-1";

/**
 * Execute AWS CLI command and return result
 */
function awsCli(command, options = {}) {
  try {
    const result = execSync(`aws ${command}`, {
      encoding: "utf8",
      stdio: options.silent ? "pipe" : "inherit",
      ...options,
    });
    return result ? result.trim() : "";
  } catch (error) {
    if (options.ignoreError) {
      return "";
    }
    console.error(`AWS CLI Error: ${error.message}`);
    throw error;
  }
}

/**
 * Delete API Gateway
 */
function deleteApiGateway() {
  console.log("🌐 Deleting API Gateway...");

  // Get API Gateway ID
  const apiId = awsCli(
    "apigateway get-rest-apis --query \"items[?name=='portfolio-backend'].id\" --output text",
    { silent: true, ignoreError: true },
  );

  if (apiId && apiId !== "None") {
    console.log(`  → Deleting API Gateway: ${apiId}`);
    awsCli(`apigateway delete-rest-api --rest-api-id ${apiId}`, {
      ignoreError: true,
    });
    console.log("  ✅ API Gateway deleted");
  } else {
    console.log("  → No API Gateway found to delete");
  }
}

/**
 * Delete Lambda functions
 */
function deleteLambdaFunctions() {
  console.log("⚡ Deleting Lambda functions...");

  const functions = [
    "portfolio-backend-prod-contact",
    "portfolio-backend-prod-analytics",
  ];

  for (const func of functions) {
    try {
      console.log(`  → Deleting Lambda function: ${func}`);
      awsCli(`lambda delete-function --function-name ${func}`, {
        ignoreError: true,
      });
      console.log(`  ✅ Lambda function ${func} deleted`);
    } catch (error) {
      console.log(`  → Lambda function ${func} not found or already deleted`);
    }
  }
}

/**
 * Delete IAM role
 */
function deleteIamRole() {
  console.log("🔐 Deleting IAM role...");

  const roleName = "portfolio-backend-prod-eu-central-1-lambdaRole";

  try {
    // Detach policies first
    console.log(`  → Detaching policies from role: ${roleName}`);
    awsCli(
      `iam detach-role-policy --role-name ${roleName} --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole`,
      { ignoreError: true },
    );
    awsCli(
      `iam detach-role-policy --role-name ${roleName} --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess`,
      { ignoreError: true },
    );
    awsCli(
      `iam detach-role-policy --role-name ${roleName} --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess`,
      { ignoreError: true },
    );

    // Delete role
    console.log(`  → Deleting IAM role: ${roleName}`);
    awsCli(`iam delete-role --role-name ${roleName}`, { ignoreError: true });
    console.log("  ✅ IAM role deleted");
  } catch (error) {
    console.log(`  → IAM role ${roleName} not found or already deleted`);
  }
}

/**
 * Delete DynamoDB tables
 */
function deleteDynamoDBTables() {
  console.log("🗄️ Deleting DynamoDB tables...");

  const tables = ["portfolio-contacts", "portfolio-analytics"];

  for (const table of tables) {
    try {
      console.log(`  → Deleting DynamoDB table: ${table}`);
      awsCli(`dynamodb delete-table --table-name ${table}`, {
        ignoreError: true,
      });

      // Wait for table to be deleted
      console.log(`  → Waiting for table ${table} to be deleted...`);
      awsCli(`dynamodb wait table-not-exists --table-name ${table}`, {
        ignoreError: true,
      });
      console.log(`  ✅ DynamoDB table ${table} deleted`);
    } catch (error) {
      console.log(`  → DynamoDB table ${table} not found or already deleted`);
    }
  }
}

/**
 * Clear S3 bucket
 */
function clearS3Bucket() {
  console.log("📦 Clearing S3 bucket...");

  const bucketName = process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    console.log(
      "  → No S3_BUCKET_NAME environment variable set, skipping S3 cleanup",
    );
    return;
  }

  try {
    console.log(`  → Clearing S3 bucket: ${bucketName}`);
    awsCli(`s3 rm s3://${bucketName} --recursive --exclude "" --include "*"`, {
      ignoreError: true,
    });
    console.log("  ✅ S3 bucket cleared");
  } catch (error) {
    console.log(`  → Error clearing S3 bucket: ${error.message}`);
  }
}

/**
 * Delete CloudFront invalidations (optional, as invalidations expire)
 */
function deleteCloudFrontInvalidations() {
  console.log("🔄 Deleting CloudFront invalidations...");

  const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;
  if (!distributionId) {
    console.log(
      "  → No CLOUDFRONT_DISTRIBUTION_ID environment variable set, skipping CloudFront cleanup",
    );
    return;
  }

  try {
    console.log(
      `  → Listing invalidations for distribution: ${distributionId}`,
    );
    const invalidations = awsCli(
      `cloudfront list-invalidations --distribution-id ${distributionId} --query "InvalidationList.Items[].Id" --output text`,
      { silent: true, ignoreError: true },
    );

    if (invalidations && invalidations !== "None") {
      const invalidationIds = invalidations.split("\t").filter((id) => id);
      console.log(`  → Found ${invalidationIds.length} invalidations`);

      // Note: AWS doesn't provide a direct way to delete invalidations,
      // they expire naturally. We'll just log this.
      console.log(
        "  → CloudFront invalidations will expire naturally (no action needed)",
      );
    } else {
      console.log("  → No CloudFront invalidations found");
    }
  } catch (error) {
    console.log(
      `  → Error checking CloudFront invalidations: ${error.message}`,
    );
  }
}

/**
 * Delete SSM Parameter Store values
 */
function deleteParameterStore() {
  console.log("💾 Deleting Parameter Store values...");

  try {
    console.log(`  → Deleting parameter: /portfolio/api-gateway-url`);
    awsCli(`ssm delete-parameter --name "/portfolio/api-gateway-url"`, {
      ignoreError: true,
    });
    console.log("  ✅ Parameter Store value deleted");
  } catch (error) {
    console.log(`  → Parameter Store value not found or already deleted`);
  }
}

/**
 * Main deletion function
 */
async function main() {
  try {
    console.log(
      "🚨 WARNING: This will delete all AWS resources for the portfolio application!",
    );
    console.log("Press Ctrl+C within 10 seconds to cancel...\n");

    // Wait 10 seconds to allow cancellation
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("Starting deletion process...\n");

    // Step 1: Check AWS credentials
    console.log("Step 1: Checking AWS credentials...");
    awsCli("sts get-caller-identity", { silent: true });
    console.log("✅ AWS credentials verified\n");

    // Step 2: Delete API Gateway (must be done before Lambda functions)
    console.log("Step 2: Deleting API Gateway...");
    deleteApiGateway();
    console.log("✅ API Gateway deletion completed\n");

    // Step 3: Delete Lambda functions
    console.log("Step 3: Deleting Lambda functions...");
    deleteLambdaFunctions();
    console.log("✅ Lambda functions deletion completed\n");

    // Step 4: Delete IAM role
    console.log("Step 4: Deleting IAM role...");
    deleteIamRole();
    console.log("✅ IAM role deletion completed\n");

    // Step 5: Delete DynamoDB tables
    console.log("Step 5: Deleting DynamoDB tables...");
    deleteDynamoDBTables();
    console.log("✅ DynamoDB tables deletion completed\n");

    // Step 6: Clear S3 bucket
    console.log("Step 6: Clearing S3 bucket...");
    clearS3Bucket();
    console.log("✅ S3 bucket clearing completed\n");

    // Step 7: Delete Parameter Store values
    console.log("Step 7: Deleting Parameter Store values...");
    deleteParameterStore();
    console.log("✅ Parameter Store deletion completed\n");

    // Step 8: Check CloudFront (optional)
    console.log("Step 8: Checking CloudFront invalidations...");
    deleteCloudFrontInvalidations();
    console.log("✅ CloudFront check completed\n");

    console.log("🎉 All AWS resources have been deleted successfully!");
    console.log(
      "You can now run the deployment script to redeploy from scratch.",
    );
  } catch (error) {
    console.error("❌ Deletion failed:", error.message);
    process.exit(1);
  }
}

// Run deletion
console.log("About to start deletion process...");
main().catch(console.error);
