import { Prisma } from '@prisma/client'

export type Recipe = {
    shape: Prisma.JsonValue;
    result_item: {
        id: number;
        display_name: string;
        textures: {
            url: string;
        }[];
    };
}
