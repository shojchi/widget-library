import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Where is your GraphQL schema?
  schema: './mocks/schema.graphql',
  
  // Where are your GraphQL operations (queries, mutations)?
  documents: ['src/**/*.ts'],
  
  // What should we generate?
  generates: {
    // Output path for generated types
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',                    // Generate base types from schema
        'typescript-operations',         // Generate types for operations
        'typed-document-node'            // Generate typed DocumentNodes
      ],
      config: {
        // Make generated types match your existing types
        skipTypename: false,             // Include __typename
        enumsAsTypes: true,              // Enums as union types
        futureProofEnums: true,          // Handle unknown enum values
        avoidOptionals: false            // Keep optional fields optional
      }
    }
  }
};

export default config;