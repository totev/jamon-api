import { APIGatewayProxyHandler } from 'aws-lambda';
import { countries } from 'country-data';

const descriptions = {
  netlify: 'Blah blah blah netlify blah blah blah',
  aws: 'Blah blah blah AWS blah blah',
  notSupported: 'This platform is not supported. Have you been cheating?',
};
export const description: APIGatewayProxyHandler = async event => {
  const platform = event.queryStringParameters['platform'] || 'notSupported';
  const description = descriptions[platform] || descriptions.notSupported;
  const countryAlpha2 = event.headers['CloudFront-Viewer-Country'];
  const userCountry = countries[countryAlpha2];
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      description,
      userCountry,
      originalInput: event,
    }),
  };
};

export const ipToGeoCountry: APIGatewayProxyHandler = async event => {
  const countryAlpha2 = event.headers['CloudFront-Viewer-Country'];
  const userCountry = countries[countryAlpha2];
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      userCountry,
    }),
  };
};
