// Maps the "ID" Gemini uses to the actual file in your public/assets folder
export const ASSET_MAP: Record<string, string> = {
  desk: '/assets/sample/desk.glb',
  chair: '/assets/sample/chair.glb',
  lamp: '/assets/sample/lampRoundFloor.glb',
  bed: '/assets/sample/bedSingle.glb',
  plant: '/assets/sample/pottedPlant.glb',
  rug: '/assets/sample/rugRound.glb',
  // Add a default to prevent crashing if AI hallucinates an ID
  default: '/assets/plant.glb', 
};

// Types for the data coming from your future Backend
export interface AssetData {
  asset_id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
}