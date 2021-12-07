export class ItemMeasures {
    public constructor(private readonly heigth: number, private readonly width: number, private readonly depth: number, private readonly weight: number) {}
   
    getVolume(): number {
        return this.heigth * this.width * this.depth;
    }
   
    getDensity(): number {
        return this.weight / this.getVolume();
    }
}