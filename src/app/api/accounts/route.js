export async function GET() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const accounts = [
        { id: 1, name: 'Wema Bank', balance: 150000, connected: true },
        { id: 2, name: 'GTBank', balance: 250000, connected: true },
        { id: 3, name: 'OPay', balance: 50000, connected: false },
        { id: 4, name: 'Kuda', balance: 30500, connected: false }
    ]

    return Response.json(accounts)
}