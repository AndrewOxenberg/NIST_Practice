import * as path from "path";





export function setDescription(label: string): string {

    if (label.endsWith('.ts')) {
        return 'TypeScript';
    } else if (label.endsWith('.js')) {
        return 'JavaScript';
    } else {
        return path.basename(label);
    }
    
}
