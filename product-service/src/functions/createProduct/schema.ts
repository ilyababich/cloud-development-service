export default {
    type: "object",
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'integer' }
    },
    required: ['title', 'description', 'price']
} as const;