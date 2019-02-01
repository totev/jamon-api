import { APIGatewayProxyHandler } from 'aws-lambda';
import { countries } from 'country-data';

const descriptions = {
  netlify: 'This site is deployed on netlify. \nCheckout the details under https://github.com/totev/jamon',
  github: 'This site is deployed on GitHub Pages. \nCheckout the details under https://github.com/totev/jamon',
  aws: 'This site is deployed on AWS via CloudFront and a S3 bucket. \nCheckout the details under https://github.com/totev/jamon',
  notSupported: 'This platform is not supported. Have you been cheating? \nFor a list of supported platforms check https://github.com/totev/jamon',
};
export const description: APIGatewayProxyHandler = async event => {
  const platform = event.queryStringParameters['platform'] || 'notSupported';
  const maybeDescription = Object.keys(descriptions).find(
    it => platform.indexOf(it) >= 0
  );
  const description = descriptions[maybeDescription] || descriptions.notSupported;
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      description,
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
