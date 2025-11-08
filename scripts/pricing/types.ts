export interface PricingDimension {
  unit: string;
  pricePerUnit: {
    USD: string;
  };
  beginRange?: string;
  endRange?: string;
  description?: string;
}

export interface PricingTerm {
  offerTermCode: string;
  sku: string;
  effectiveDate: string;
  priceDimensions: Record<string, PricingDimension>;
  termAttributes: Record<string, string>;
}

export interface Product {
  sku: string;
  productFamily: string;
  attributes: Record<string, string>;
}

export interface S3PricingData {
  formatVersion?: string;
  disclaimer?: string;
  lastUpdated?: string;
  product: Product;
  serviceCode: string;
  terms: {
    OnDemand: Record<string, Record<string, PricingTerm>>;
  };
}

export interface RDSPricingData {
  formatVersion?: string;
  disclaimer?: string;
  lastUpdated?: string;
  product: Product;
  serviceCode: string;
  terms: {
    OnDemand: Record<string, Record<string, PricingTerm>>;
    Reserved?: Record<string, Record<string, PricingTerm>>;
  };
}

export interface SimplifiedPricing {
  service: string;
  region: string;
  productFamily: string;
  description: string;
  pricePerUnit: string;
  unit: string;
  currency: string;
  attributes: Record<string, string>;
  lastUpdated: string;
}

export interface PricingDataSet {
  metadata: {
    lastUpdated: string;
    services: string[];
    regions: string[];
  };
  s3: SimplifiedPricing[];
  rds: SimplifiedPricing[];
}
