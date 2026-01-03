import { defineFunction } from "@aws-amplify/backend";
import { Duration } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
export const sayHelloPythonFunction = defineFunction((scope) => new Function(scope, "say-hello-python", {
    handler: "index.handler",
    runtime: Runtime.PYTHON_3_9,
    code: Code.fromAsset("./", {
        exclude: ["**", "!index.py"]
    }),
    timeout: Duration.seconds(30),
    memorySize: 256,
}));
