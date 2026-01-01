import json

def handler(event, context):
    """
    Python Lambda function handler for say-hello demonstration.

    This function demonstrates a simple Python Lambda function
    that returns a greeting message.
    """
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Hello World from Python!",
            "language": "Python",
            "runtime": "Python 3.9"
        }),
    }