
export declare namespace GeoJSON {
    export interface GeoJSONObject {
        type: string;
    }

    export interface Feature extends GeoJSONObject {
        id?: string;
        geometry: Geometry;
        properties: any; // TODO: type this
    }

    export interface FeatureCollection extends GeoJSONObject {
        features: Feature[];
    }

    export interface Geometry extends GeoJSONObject {
        coordinates: Coordinate | Coordinate[] | Coordinate[][];
    }

    export interface GeometryCollection extends GeoJSONObject {
        geometries: Geometry[];
    }

    export type Coordinate2d = [number, number];
    export type Coordinate3d = [number, number, number];
    export type Coordinate = Coordinate2d | Coordinate3d;
}

export interface DataPoint {
    x: number
    y: number
    data: object
}