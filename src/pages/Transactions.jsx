import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyCircleDollar,
  CurrencyDollar,
} from "phosphor-react";
import CardTransaction from "../components/Button/CardTransaction/CardTransaction";
import ModalNewTransaction from "../components/Button/ModalNewTransaction/ModalNewTransaction";
import axios from "axios";
import { useEffect, useState } from "react";

function TransactionsPage() {
  const [open, setOpen] = useState(false);

  function handleModal() {
    setOpen(true);
  }

  const [allTransactions, setAllTransactions] = useState([]);

  async function fetchTransactions() {
    const transactions = await axios.get("http://localhost:3000/transactions");

    setAllTransactions(transactions.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  //fetchTransactions();

  console.log(allTransactions);

  async function deleteTransaction(index) {
    await axios.delete(`http://localhost:3000/transactions/${index}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-pink-700 py-6 pb-32 px-4 md:px-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl md:text-2xl font-bold">
            digital money
          </h1>
          <button
            onClick={handleModal}
            className="bg-white/20 px-12 rounded py-2 hover:bg-white/30 text-white border-0"
          >
            Nova transação
          </button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-24">
          <CardTransaction
            title="Entrada"
            background="bg-green-100"
            icon={<ArrowCircleUp className="text-green-500" size={32} />}
          />
          <CardTransaction
            title="Saída"
            background="bg-red-100"
            icon={<ArrowCircleDown className="text-red-500" size={32} />}
          />
          <CardTransaction
            title="Total"
            background="bg-green-900"
            textColor="text-white"
            icon={<CurrencyDollar size={32} />}
          />
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3 pb-4 font-medium">Título</th>
                <th className="px-6 py-3 pb-4 font-medium">Valor</th>
                <th className="px-6 py-3 pb-4 font-medium">Categoria</th>
                <th className="px-6 py-3 pb-4 font-medium">Data</th>
                <th className="px-6 py-3 pb-4 font-medium">Opções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allTransactions.map((transactions, index) => {
                return (
                  <tr className="hover:bg-gray-50 bg-white" key={index}>
                    <td className="px-6 py-4">{transactions.title}</td>
                    <td className="px-6 py-4 text-green-500 font-medium">
                      {transactions.price}
                    </td>
                    <td className="px-6 py-4">{transactions.category}</td>
                    <td className="px-6 py-4">{transactions.date}</td>
                    <td className="px-6 py-4 flex flex-row gap-3">
                      <button
                        onClick={() => deleteTransaction(transactions.id)}
                        className="py-2 px-3 font-medium bg-red-100 text-red-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Excluir
                      </button>
                      <button className="py-2 px-3 font-medium bg-yellow-100 text-amber-900 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ModalNewTransaction open={open} setOpen={setOpen} />
      </main>
    </div>
  );
}

export default TransactionsPage;
