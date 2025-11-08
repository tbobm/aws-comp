import { PricingClient, GetProductsCommand } from '@aws-sdk/client-pricing';
import { writeFileSync } from 'fs';
import { join } from 'path';
import type {
  S3PricingData,
  RDSPricingData,
  SimplifiedPricing,
  PricingDataSet,
} from './types.js';

const client = new PricingClient({
  region: 'us-east-1',
});

async function fetchS3Pricing(): Promise<SimplifiedPricing[]> {
  console.log('Fetching S3 pricing data...');

  try {
    const command = new GetProductsCommand({
      ServiceCode: 'AmazonS3',
      Filters: [
        {
          Type: 'TERM_MATCH',
          Field: 'location',
          Value: 'EU (Ireland)',
        },
      ],
      MaxResults: 100,
    });

    const response = await client.send(command);
    console.log(`API returned ${response.PriceList?.length || 0} items`);

    const simplified: SimplifiedPricing[] = [];

    for (const priceItem of response.PriceList || []) {
      const data = JSON.parse(priceItem) as S3PricingData;
      const product = data.product;
      const sku = product.sku;

      const onDemandTerms = data.terms?.OnDemand;
      if (!onDemandTerms) continue;

      for (const term of Object.values(onDemandTerms)) {
        for (const dimension of Object.values(term.priceDimensions)) {
          simplified.push({
            service: 'S3',
            region: product.attributes.location || 'Unknown',
            productFamily: product.productFamily,
            description: dimension.description || product.attributes.usagetype || '',
            pricePerUnit: dimension.pricePerUnit.USD,
            unit: dimension.unit,
            currency: 'USD',
            attributes: product.attributes,
            lastUpdated: new Date().toISOString(),
          });
        }
      }
    }

    console.log(`Fetched ${simplified.length} S3 pricing items`);
    return simplified;
  } catch (error) {
    console.error('Error fetching S3 pricing:', error);
    throw error;
  }
}

async function fetchRDSPricing(): Promise<SimplifiedPricing[]> {
  console.log('Fetching RDS Aurora pricing data...');

  try {
    const command = new GetProductsCommand({
      ServiceCode: 'AmazonRDS',
      Filters: [
        {
          Type: 'TERM_MATCH',
          Field: 'location',
          Value: 'EU (Ireland)',
        },
        {
          Type: 'TERM_MATCH',
          Field: 'databaseEngine',
          Value: 'Aurora MySQL',
        },
      ],
      MaxResults: 100,
    });

    const response = await client.send(command);
    console.log(`API returned ${response.PriceList?.length || 0} items`);

    const simplified: SimplifiedPricing[] = [];

    for (const priceItem of response.PriceList || []) {
      const data = JSON.parse(priceItem) as RDSPricingData;
      const product = data.product;

      const onDemandTerms = data.terms?.OnDemand;
      if (!onDemandTerms) continue;

      for (const term of Object.values(onDemandTerms)) {
        for (const dimension of Object.values(term.priceDimensions)) {
          simplified.push({
            service: 'RDS Aurora',
            region: product.attributes.location || 'Unknown',
            productFamily: product.productFamily,
            description: dimension.description || product.attributes.instanceType || '',
            pricePerUnit: dimension.pricePerUnit.USD,
            unit: dimension.unit,
            currency: 'USD',
            attributes: product.attributes,
            lastUpdated: new Date().toISOString(),
          });
        }
      }
    }

    console.log(`Fetched ${simplified.length} RDS Aurora pricing items`);
    return simplified;
  } catch (error) {
    console.error('Error fetching RDS Aurora pricing:', error);
    throw error;
  }
}

async function main() {
  try {
    const [s3Pricing, rdsPricing] = await Promise.all([
      fetchS3Pricing(),
      fetchRDSPricing(),
    ]);

    const regions = new Set<string>();
    [...s3Pricing, ...rdsPricing].forEach((item) => regions.add(item.region));

    const dataSet: PricingDataSet = {
      metadata: {
        lastUpdated: new Date().toISOString(),
        services: ['S3', 'RDS Aurora'],
        regions: Array.from(regions).sort(),
      },
      s3: s3Pricing,
      rds: rdsPricing,
    };

    const outputPath = join(process.cwd(), 'data', 'pricing', 'aws-pricing.json');
    writeFileSync(outputPath, JSON.stringify(dataSet, null, 2));
    console.log(`\nPricing data saved to ${outputPath}`);
    console.log(`Total items: ${s3Pricing.length + rdsPricing.length}`);
  } catch (error) {
    console.error('Failed to fetch pricing data:', error);
    process.exit(1);
  }
}

main();
