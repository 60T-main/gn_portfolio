/// <reference types="node" />
declare module "gltf-pipeline" {
  export interface DracoOptions {
    compressionLevel?: number;
    quantizePositionBits?: number;
    quantizeNormalBits?: number;
    quantizeTexcoordBits?: number;
    quantizeColorBits?: number;
    quantizeGenericBits?: number;
  }

  export interface ProcessOptions {
    dracoOptions?: DracoOptions;
  }

  export function processGlb(
    glb: Buffer,
    options?: ProcessOptions
  ): Promise<{ glb: Buffer }>;

  export function processGltf(
    gltf: any,
    options?: ProcessOptions
  ): Promise<{ gltf: any }>;
}