export default function Home() {
  return (
  <main className="container max-w-2xl px-4 mx-auto">
    <section className="py-3">
      <small className="text-gray-300 text-md">Available Balance</small>

      <h2 className="text-2xl font-bold text-white">$100 000.00</h2>
    </section>

    <section className="flex item-center gap-2 py-3">
      <button  className="btn btn-primary">+ Income</button>
      <button  className="btn btn-primary-outline">+ Expenses</button>
    </section>

  </main>
  );   
}
