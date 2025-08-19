import { type GameItem } from '../schema';

export async function getGameItems(): Promise<GameItem[]> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is to fetch all available game items that can be collected,
    // including their types, point values, rarity, and sprite URLs for the pixel art.
    return Promise.resolve([
        {
            id: 1,
            item_type: 'coin' as const,
            point_value: 10,
            rarity: 'common' as const,
            sprite_url: '/sprites/coin.png',
            created_at: new Date()
        },
        {
            id: 2,
            item_type: 'gem' as const,
            point_value: 50,
            rarity: 'rare' as const,
            sprite_url: '/sprites/gem.png',
            created_at: new Date()
        }
    ] as GameItem[]);
}