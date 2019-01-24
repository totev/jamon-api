import { APIGatewayProxyHandler } from 'aws-lambda';
const descriptions = {
  netlify: 'Blah blah blah netlify blah blah blah',
  aws: 'Blah blah blah AWS blah blah',
  notSupported: 'This platform is not supported. Have you been cheating?',
};
export const description: APIGatewayProxyHandler = async event => {
  const platform = event.queryStringParameters['platform'] || 'notSupported';
  const description = descriptions[platform] || descriptions.notSupported;

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      description,
      originalInput: event,
    }),
  };
};
