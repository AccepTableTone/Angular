import {Drink} from './drink';

export class ApiResponse{
    id: number;
    Content: Drink[];
    ErrorMessage: string;
    StatusCode: number;
    Timestamp: string;
    Version:string;
}