export async function POST(request) {
    try {
        const { transactions } = await request.json()

        await new Promise(resolve => setTimeout(resolve, 300))

        // Simple personality detection
        const totalSpent = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
        const savingsCount = transactions.filter(t => t.description.includes('Salary') || t.amount > 100000).length

        let personality = 'Balancer ⚖️'
        if (savingsCount > 1) personality = 'Planner 🎯'
        if (totalSpent > 50000) personality = 'Spender 💫'

        return Response.json({ personality })
    } catch (error) {
        return Response.json({ personality: 'Balancer ⚖️' })
    }
}