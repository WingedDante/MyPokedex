export class Pokemon {
    name: string;
    types: string[];
    image_url: string;
    stats: {
        total: number,
        hp: number,
        attack: number,
        defense: number,
        spAttack: number,
        spDefense: number, 
        speed: number
    }
    
}